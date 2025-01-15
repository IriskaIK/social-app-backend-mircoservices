import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({nullable: true})
    birthday : string | null;
}