import {ApiProperty} from "@nestjs/swagger";

export class UserDetailsDto{
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty({nullable : true})
    birthday : string;

    @ApiProperty()
    created_at : string;

    @ApiProperty({nullable: true})
    image_id : string | null;
}