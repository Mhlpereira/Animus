import { UpdateGroupDTO } from './DTO/update-group-DTO'
import { inject, injectable } from 'inversify'
import { IGroupRepository } from './group-interface'
import { GroupModel } from './group-model'

@injectable()
export class GroupService {
    constructor(
        @inject('IGroupRepository') private groupRepository: IGroupRepository,
    ) {}

    async createGroup(data: {
        name: string
        userId: string
        description?: string
    }): Promise<boolean> {
        const { group } = await this.groupRepository.createGroup(data)

        if (!group) {
            throw new Error('Error creating group')
        }

        return true
    }

    async deleteGroup(groupId: string, userId: string): Promise<boolean> {
        const owner_id = await this.getOwnerId(groupId)
        if (owner_id !== userId) {
            throw new Error('Unable to delete the group!')
        }

        const deleted = await this.groupRepository.deleteGroup(groupId)

        if (!deleted) {
            throw new Error('Error deleting group')
        }

        return true
    }

    async updateGroup(data: UpdateGroupDTO, userId: string): Promise<boolean> {
        const uGroup = await this.groupRepository.updateGroup(data, userId)

        if (!uGroup) {
            return false
        }

        return true
    }

    async getOwnerId(groupId: string): Promise<string> {
        const ownerId = await this.groupRepository.getOwnerId(groupId)

        if (!ownerId) {
            throw new Error('Error getting owner id')
        }

        return ownerId
    }

    async getGroupById(groupId: string): Promise<GroupModel> {
        const group = await this.groupRepository.getGroupById(groupId)

        if (!group) {
            throw new Error('Error getting group')
        }

        return group
    }

    async getGroupByName( groupName: string): Promise<GroupModel> {
        const group = await this.groupRepository.getGroupByName(groupName)

        if (!group) {
            throw new Error('Error getting group')
        }

        return group
    }

    
}
