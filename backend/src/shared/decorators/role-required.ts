import { Request, Response, NextFunction } from 'express'
import { container } from '../container/container'
import { UserGroupService } from '../../group/user-group/user-group-service'
import { LevelType } from '../enums/levels'
import { Permission } from '../enums/permission'

const roleHierarchy: Record<LevelType, LevelType[]> = {
    [LevelType.OWNER]: [LevelType.OWNER],
    [LevelType.ADMIN]: [LevelType.ADMIN, LevelType.OWNER],
    [LevelType.INSTRUCTOR]: [
        LevelType.INSTRUCTOR,
        LevelType.ADMIN,
        LevelType.OWNER,
    ],
    [LevelType.MEMBER]: [
        LevelType.MEMBER,
        LevelType.INSTRUCTOR,
        LevelType.ADMIN,
        LevelType.OWNER,
    ],
    [LevelType.GUEST]: [
        LevelType.GUEST,
        LevelType.MEMBER,
        LevelType.INSTRUCTOR,
        LevelType.ADMIN,
        LevelType.OWNER,
    ],
    [LevelType.NONE]: [],
}

export function PermissionRequired(requiredPermission: Permission) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value

        descriptor.value = async function (
            req: Request,
            res: Response,
            next: NextFunction,
        ) {
            const userId = req.user.id
            const groupId = req.params.groupId

            const userGroupService =
                container.get<UserGroupService>('UserGroupService')

            const userLevel = await userGroupService.getUserLevel(
                userId,
                groupId,
            )

            const allowedLevels = Object.keys(roleHierarchy).filter((level) =>
                roleHierarchy[level as LevelType].includes(userLevel),
            )

            const hasPermission = allowedLevels.some((level) =>
                userGroupService
                    .getPermissionsForLevel(level as LevelType)
                    .includes(requiredPermission),
            )

            if (!hasPermission) {
                return res
                    .status(403)
                    .json({ message: 'Need permission' })
            }

            return originalMethod.apply(this, [req, res, next])
        }

        return descriptor
    }
}
