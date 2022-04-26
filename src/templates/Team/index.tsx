import { Grid, SimpleGrid, Title } from '@mantine/core'
import ContentBase from 'components/ContentBase'
import TeamMemberCardItem from 'components/TeamMemberCardItem'
import { useSession } from 'next-auth/react'
import { TeamMember } from 'types/collection/Team'

export type TeamMembersTemplateProps = {
  [key in string]: {
    name: string
    members: TeamMember[]
  }
}

const TeamMembersTemplate = (items: TeamMembersTemplateProps) => {
  const { data: session } = useSession()
  return (
    <ContentBase>
      <Grid gutter={20} justify={'flex-start'} align={'stretch'}>
        {Object.keys(items).map((departmentKey) => (
          <>
            {session?.user.info.access_role === 'Director' && (
              <Grid.Col mt={35}>
                <Title order={4}>{items[departmentKey].name}</Title>
              </Grid.Col>
            )}
            {items[departmentKey].members.map((props) => (
              <Grid.Col
                span={6}
                xs={5}
                sm={3}
                lg={2}
                key={`${props.id}-${props.username}`}
              >
                <TeamMemberCardItem {...props} />
              </Grid.Col>
            ))}
          </>
        ))}
      </Grid>
    </ContentBase>
  )
}

export default TeamMembersTemplate