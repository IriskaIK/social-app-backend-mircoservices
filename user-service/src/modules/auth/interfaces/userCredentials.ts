export interface UserCredentials {
    email: string;
    password: string;
    first_name: string;
    last_name : string;
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