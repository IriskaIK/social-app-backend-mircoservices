export interface AuthVerificationResponseDTO{
    valid : boolean;
    payload: IUser;
}

export interface IUser {
    email: string,
    first_name: string,
    last_name: string,
    image_id: number | null,
    birthday: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,

}