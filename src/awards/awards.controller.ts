import { Controller, Get, Patch } from '@nestjs/common';
import { MovieEntity } from 'src/movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';

@Controller('awards')
export class AwardsController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get('intervals')
  findIntervals(): Promise<MovieEntity[]> {
    return this.moviesService.findIntervals();
  }
  @Patch('setFakeWinners')
  async setFakeWinners(): Promise<void> {
    const allMovies = await this.moviesService.findAll();
    const moviesUpdated = allMovies.map((movie: MovieEntity) => ({
      ...movie,
      winner: true,
    }));
    moviesUpdated.forEach(async (movie) => {
      await this.moviesService.update(movie.id, movie);
    });
  }
}
