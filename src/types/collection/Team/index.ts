import { AccessRoleType } from 'types/auth'

export type TeamMember = {
  id: string
  username: string
  department: {
    key: string
    name: string
  }
  info?: {
    name: string
    lastname: string
    access_role: AccessRoleType
  }
  picture?: {
    url: string
  }
}

export type GetTeamMembers = {
  team: TeamMember[]
}