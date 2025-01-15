import {ApiProperty} from "@nestjs/swagger";

export class UserShortProfileInfoDto{

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty({nullable: true})
    image_id : string | null;

    @ApiProperty()
    id: string;
}