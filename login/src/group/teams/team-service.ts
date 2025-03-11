import { inject, injectable } from "inversify";
import { ITeamRepository, ITeamService } from "./team-interface";
import { TeamModel } from "./team-model";
import { CreateTeamDTO } from "../DTO/create-team-DTO";
import { UserModel } from "../../user/user-model";

@injectable()
export class TeamService implements ITeamService{
    
    constructor(@inject('ITeamRepository') private teamRepository: ITeamRepository){}
    

    async createTeam(data: CreateTeamDTO): Promise<TeamModel>{

        const team = await this.teamRepository.createTeam(data);

        if(!team){
            throw new Error('Error creating team');
        }

        return team;
    }

    async getUserByName(teamId: string, name: string): Promise<UserModel>{

        const users = await this.teamRepository.getUserByName(teamId, name);

        if(!users){
            throw new Error('Error fetching users');
        }

        return users;
    }
}