import { PartialType } from "@nestjs/mapped-types";
import { CreatePromotionDto } from "./createPromotion";

export class UpdatePromotionDto extends PartialType(CreatePromotionDto){
}
