

export interface IAuthPayload {
    id : string;
    tokenType : TokenType,
}

export enum TokenType {
    ACCESS_TOKEN = 'AccessToken',
    REFRESH_TOKEN = 'RefreshToken',
}

