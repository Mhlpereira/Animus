import { HorarioJson } from "../../types/horarioJson";
import { CreateTeamDTO } from "../DTO/create-team-DTO";
import { TeamModel } from "./team-model";


export interface IDataTeam{
    id?: string;
    name?: string;
    horarioJson?: HorarioJson[];
    instructorId?: string;
    groupId?: string;
}

export interface ITeamRepository{
    createTeam(data: CreateTeamDTO): Promise<TeamModel>;
    getUserByName(teamdId: string, name: string): Promise<{name: string; nickname: string}>;

}

export interface ITeamService{
    createTeam(data: CreateTeamDTO): Promise<TeamModel>;

}