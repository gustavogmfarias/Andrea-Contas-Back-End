interface ICreateUserTokenDTO {
    user_id: string;
    expires_date: Date;
    refresh_token: string;
    token: string;
}

export { ICreateUserTokenDTO };
