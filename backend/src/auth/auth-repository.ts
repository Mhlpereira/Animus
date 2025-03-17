import { inject, injectable } from 'inversify'
import { IDatabase } from '../shared/interface/database-interface'
import { IAuthRepository } from './auth-interface'

@injectable()
export class AuthRepository implements IAuthRepository {
    constructor(@inject('IDatabase') private pg: IDatabase) {}

    async saveRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<void> {
        const db = await this.pg.getConnection()
        try {
            await db.query(
                `INSERT INTO refresh_tokens (user_id, refresh_token, created_at, updated_at)
                 VALUES ($1, $2, NOW(), NOW())
                 ON CONFLICT (user_id) DO UPDATE
                 SET refresh_token = EXCLUDED.refresh_token, updated_at = NOW()`,
                [userId, refreshToken],
            )
        } catch (e) {
            throw new Error(`Error refreshing token: ${e.message}`)
        } finally {
            db.release()
        }
    }

    async removeRefreshToken(userId: string): Promise<void> {
        const db = await this.pg.getConnection()
        try {
            await db.query('DELETE FROM refresh_tokens WHERE user_id = $1', [
                userId,
            ])
        } catch (e) {
            throw new Error(`Error refreshing token: ${e.message}`)
        } finally {
            db.release()
        }
    }
}
