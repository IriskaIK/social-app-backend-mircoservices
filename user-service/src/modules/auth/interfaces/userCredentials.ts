export interface LoginCredentials{
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials{
    first_name: string;
    last_name: string;
}