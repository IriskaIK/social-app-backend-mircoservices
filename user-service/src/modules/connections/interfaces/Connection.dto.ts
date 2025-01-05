interface ConnectionDTO {
    id: string;
    status : "pending" | "accepted" | "rejected" | "blocked";
    user_to_connect_id : string;
    user_owner_id : string;
}
