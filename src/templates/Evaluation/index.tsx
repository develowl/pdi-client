import { Avatar, Card, Group, Text, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import ContentBase from 'components/ContentBase'
import EvaluationItem from 'components/EvaluationItem'
import PerformedFeedback from 'components/Performed/Feedback'
import PerformedGoal from 'components/Performed/Goal'
import PerformedQuestion from 'components/Performed/Question'
import PerformedSkill from 'components/Performed/Skill'
import { StepperProgress } from 'components/StepperProgress'
import { FALLBACK_USER_PICTURE } from 'components/UserPicture'
import { CommonConstants } from 'constants/common'
import { EvaluationConstants, EvaluationPeriod } from 'constants/evaluation'
import { GoalsMessages } from 'constants/goals'
import { useEvaluation } from 'contexts/EvaluationProvider'
import { useLocale } from 'contexts/LocaleProvider'
import React, { useEffect, useState } from 'react'
import { EvaluationGoalType } from 'types/collection/EvaluationGoal'
import { FeedbackType } from 'types/collection/Feedback'
import { SkillType } from 'types/collection/Skill'

export type EvaluationTemplateProps = {
  type: 'user' | 'manager'
}

const EvaluationTemplate = ({ type }: EvaluationTemplateProps) => {
  const theme = useMantineTheme()
  const { locale } = useLocale()
  const { evaluationModel, appraisee, periodMode } = useEvaluation()
  const [questions, setQuestions] = useState<SkillType[]>()
  const [skills, setSkills] = useState<SkillType[]>()
  const [goals, setGoals] = useState<EvaluationGoalType[]>()
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>()
  const match = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`, false)

  const sortSkill = (a: SkillType, b: SkillType) => {
    const a_id = Number(a.id)
    const b_id = Number(b.id)

    return a_id > b_id ? 1 : a_id < b_id ? -1 : 0
  }

  useEffect(() => {
    const arrayQuestions: SkillType[] = []
    evaluationModel?.sections?.map(
      (section) =>
        section.type === 'question' && section?.skills && arrayQuestions.push(...section.skills)
    )
    setQuestions(arrayQuestions.sort(sortSkill))

    const arraySkill: SkillType[] = []
    evaluationModel?.sections?.map(
      (section) => section.type === 'skill' && section?.skills && arraySkill.push(...section.skills)
    )
    setSkills(arraySkill.sort(sortSkill))

    setGoals(evaluationModel.goals)
    setFeedbacks(evaluationModel.feedbacks)
  }, [evaluationModel])

  if (!evaluationModel || !skills || !goals || !feedbacks) {
    return null
  }

  return (
    <ContentBase
      title={
        <Group sx={{ justifyContent: 'space-between' }}>
          <Title p={20} order={!match ? 3 : 6}>
            {`${EvaluationConstants.contentTitle.my[locale]} - ${evaluationModel.year}`}
          </Title>
          <Group mr={25}>
            <Avatar
              size={!match ? 'sm' : 'xs'}
              src={
                !appraisee?.picture
                  ? FALLBACK_USER_PICTURE
                  : `${process.env.NEXT_PUBLIC_API_URL}${appraisee.picture.url}`
              }
            />
            <Text size={!match ? 'md' : 'xs'}>
              {appraisee.info.name} {appraisee.info.lastname}
            </Text>
          </Group>
        </Group>
      }
    >
      <Card p={!match ? 30 : 15}>
        <StepperProgress
          allowStepSelect
          radius={'md'}
          nextBtnLabel={CommonConstants.next[locale]}
          prevBtnLabel={CommonConstants.previous[locale]}
          finishBtnLabel={CommonConstants.finish[locale]}
        >
          {(type === 'manager' || periodMode !== EvaluationPeriod.midYear) && (
            <StepperProgress.Step
              label={EvaluationConstants.steps.questions[locale]}
              description={'teste'}
            >
              {questions?.map((question) => (
                <React.Fragment key={`${question.id}-${question.title}`}>
                  <EvaluationItem
                    sectionTitle={question.title}
                    sectionColor={'orange'}
                    title={question.description}
                  />
                  <PerformedQuestion item={question} />
                </React.Fragment>
              ))}
            </StepperProgress.Step>
          )}
          {(type === 'manager' || periodMode !== EvaluationPeriod.midYear) && (
            <StepperProgress.Step label={EvaluationConstants.steps.skills[locale]}>
              {skills?.map((skill) => (
                <React.Fragment key={`${skill.id}-${skill.title}`}>
                  <EvaluationItem
                    sectionTitle={skill.title}
                    sectionColor={'grape'}
                    title={skill.description}
                  />
                  <PerformedSkill item={skill} />
                </React.Fragment>
              ))}
            </StepperProgress.Step>
          )}
          <StepperProgress.Step label={EvaluationConstants.steps.goals[locale]}>
            {goals.length === 0 ? (
              <div key={'no-one-goal'}>
                <Text size={'md'} color={'gray'}>
                  {GoalsMessages.empty[locale]}
                </Text>
              </div>
            ) : (
              goals?.map(({ goal }) => (
                <React.Fragment key={`${goal.id}-${goal.name}`}>
                  <EvaluationItem
                    sectionTitle={EvaluationConstants.steps.goals[locale]}
                    sectionColor={'green'}
                    title={goal.name}
                  />
                  <PerformedGoal item={goal} />
                </React.Fragment>
              ))
            )}
          </StepperProgress.Step>
          {(type === 'manager' || periodMode !== EvaluationPeriod.midYear) && (
            <StepperProgress.Step label={EvaluationConstants.steps.feedbacks[locale]}>
              {feedbacks?.map((feedback) => (
                <React.Fragment key={`${feedback.id}-${feedback.question}`}>
                  <EvaluationItem
                    sectionTitle={EvaluationConstants.steps.feedbacks[locale]}
                    sectionColor={'blue'}
                    title={feedback.question}
                  />
                  <PerformedFeedback item={feedback} />
                </React.Fragment>
              ))}
            </StepperProgress.Step>
          )}
          {(type === 'manager' || evaluationModel.finished) && (
            <StepperProgress.Step label={EvaluationConstants.steps.pdi[locale]}>
              <Text size={'xl'}>PDI SECTION</Text>
            </StepperProgress.Step>
          )}
          <StepperProgress.Completed>Avaliação finalizada</StepperProgress.Completed>
        </StepperProgress>
      </Card>
    </ContentBase>
  )
}

export default EvaluationTemplate
