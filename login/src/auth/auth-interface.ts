


export interface IAuthService{
    login(data: {email: string, password: string}): Promise<{accessToken: string, refreshToken: string}>
}

export interface  IAuthRepository{
    saveRefreshToken(userID: string, refreshToken: string): Promise<void>,
    removeRefreshToken(userId: string):Promise<void>
}