// General
interface SuccessfulResponse {
    message : string,
}

interface UserShortResponse{
    id: string,
    first_name : string,
    last_name : string,
    image_url : string | null,
    created_at : string,
}

interface UserDetailedResponse extends UserShortResponse{
    birthdate : string | null,
    email : string
}

//Auth module dto
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

//Users module dto
interface UserUpdateDTO{
    first_name : string,
    last_name : string,
    email : string,
    birth_date : string | null
}

interface UserCreateDTO extends UserUpdateDTO {
    password: string
}



