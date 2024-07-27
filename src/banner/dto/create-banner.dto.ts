import { Transform } from "class-transformer"
import { IsBoolean, IsString } from "class-validator"

export class CreateBannerDto {
    @IsString()
    image: string

    @IsString()
    link: string

    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    publish: boolean
}
