import { HorarioJson } from "../../types/horarioJson";


export interface IDataTeam{
    id?: string;
    name?: string;
    horarioJson?: HorarioJson[];
    instructorId?: string;
    groupId?: string;
}