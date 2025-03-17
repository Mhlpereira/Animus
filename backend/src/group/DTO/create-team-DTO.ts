import { HorarioJson } from '../../types/horarioJson'

export class CreateTeamDTO {
    name: string
    horarioJson?: HorarioJson[]
    instructorId?: string
    groupId: string
}
