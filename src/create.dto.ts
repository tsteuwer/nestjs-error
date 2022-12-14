import { ApiProperty, ApiPropertyOptional, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";

export enum EntityType {
    CART = 'cart',
}

export class CartDto {
    @IsEnum(EntityType)
    @ApiProperty({
        description: 'The entity type',
    })
    type: EntityType;
}

export class CartMetaData {
    @IsString()
    @ApiProperty({
        description: 'Users session id'
    })
    sessionId: string;
}

export class CartAttributes {
    @IsString()
    @ApiProperty({
        description: 'The device type',
    })
    device: string;
}

export class CreateCartAttributes extends PickType(CartAttributes, ['device'] as const) {}
export class CreateCartMetaData extends PartialType(PickType(CartMetaData, ['sessionId'] as const)) {}
export class CreateCartData extends PickType(CartDto, ['type'] as const) {
	@ApiProperty({
        required: true,
		description: 'Required attributes',
	})
    @Type(() => CreateCartAttributes)
    @ValidateNested()
	attributes: CreateCartAttributes;
}
export class CreateCartDto {
	@ApiProperty({
		required: true,
		description: 'The data required to create a cart',
	})
    @Type(() => CreateCartData)
    @ValidateNested()
	data: CreateCartData;

	@ApiPropertyOptional({
		description: 'Optional meta data',
	})
    @Type(() => CartMetaData)
	meta?: CartMetaData;
}