import {IsString, IsOptional} from 'class-validator';

export class UpdateInfoDTO{
    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    avatarUrl?: string;
}