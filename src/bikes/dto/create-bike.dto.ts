import { IsNotEmpty, IsString, IsInt, IsUUID } from 'class-validator';

export class CreateBikeDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  type: string;
}
