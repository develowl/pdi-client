import { BaseType } from 'types/common'
import { KpiType } from 'types/collection/Kpi'
import { EvaluationGoalType } from 'types/collection/EvaluationGoal'

export interface EvaluationGoalKpiType extends BaseType {
  kpi: KpiType
  target: string
  weight: number
  evaluation_goals: EvaluationGoalType[]
}