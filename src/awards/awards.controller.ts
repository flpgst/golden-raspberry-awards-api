import { Controller, Get } from '@nestjs/common';
import { MovieEntity } from 'src/movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';

@Controller('awards')
export class AwardsController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get('intervals')
  findIntervals(): Promise<MovieEntity[]> {
    return this.moviesService.findIntervals();
  }
}
