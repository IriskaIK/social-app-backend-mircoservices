import { ApiProperty } from '@nestjs/swagger';

export class RegisterCredentialsDto{
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;
}