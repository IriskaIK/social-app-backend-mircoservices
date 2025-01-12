export interface UserUpdateProfileDto{
    id : string,
    userData:{
        first_name : string,
        last_name : string,
        email : string,
        birthday : string | null,
    }

}