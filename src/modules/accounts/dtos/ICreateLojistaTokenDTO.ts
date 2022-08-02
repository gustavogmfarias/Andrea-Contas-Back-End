interface ICreateLojistaTokenDTO {
    lojistaId: string;
    expiresDate: Date;
    refreshToken: string;
    token: string;
}

export { ICreateLojistaTokenDTO };
