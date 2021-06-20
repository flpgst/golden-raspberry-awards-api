import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  year: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  studios: string;

  @ApiProperty()
  producers: string;

  @ApiProperty()
  winner: boolean;
}
