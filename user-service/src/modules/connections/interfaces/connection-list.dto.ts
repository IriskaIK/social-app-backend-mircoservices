interface ConnectionListDto{
    id : string,
    createdAt: Date,
    updatedAt: Date,
    following : {
        id : string,
        first_name : string,
        last_name : string,
        image_id : string | null
    }
}

interface ConnectedListDto{
    id : string,
    createdAt: Date,
    updatedAt: Date,
    user : {
        id : string,
        first_name : string,
        last_name : string,
        image_id : string | null
    }
}