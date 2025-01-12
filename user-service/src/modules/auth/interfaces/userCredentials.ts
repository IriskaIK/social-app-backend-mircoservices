export interface LoginCredentials{
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials{
    first_name: string;
    last_name: string;
}

interface UserRegisterDto{
    first_name:string;
    last_name:string;
    email:string;
    password:string;
}

interface UserLoginDTO{
    email : string,
    password: string
}