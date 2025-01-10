

export interface IAuthPayload {
    id : string;
    image_id : string | null;
    tokenType : TokenType,
}

export enum TokenType {
    ACCESS_TOKEN = 'AccessToken',
    REFRESH_TOKEN = 'RefreshToken',
}

