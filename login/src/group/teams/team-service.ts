import { inject, injectable } from "inversify";
import { ITeamRepository } from "./team-interface";

@injectable()
export class TeamService{
    
    constructor(@inject('ITeamRepository') private teamRepository: ITeamRepository){}
    

    async createTeam(){
        
    }
}