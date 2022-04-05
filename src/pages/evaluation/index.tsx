import { initializeApollo } from 'graphql/client'
import {
  GetAllEvaluationModel,
  GET_ALL_EVALUATION_MODEL
} from 'graphql/queries/EvaluationModel'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import EvaluationListTemplate, {
  EvaluationListTemplateProps
} from 'templates/Evaluation'

const PageEvaluationList = ({ items }: EvaluationListTemplateProps) => {
  return <EvaluationListTemplate items={items} />
}

export const getServerSideProps: GetServerSideProps<
  EvaluationListTemplateProps
> = async ({ req }) => {
  const session = await getSession({ req })
  const apolloClient = initializeApollo(null, session)

  const {
    data: { evaluationModels }
  } = await apolloClient.query<GetAllEvaluationModel>({
    query: GET_ALL_EVALUATION_MODEL,
    fetchPolicy: 'no-cache'
  })

  if (!evaluationModels) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      items: [...evaluationModels]
    }
  }
}

export default PageEvaluationList
