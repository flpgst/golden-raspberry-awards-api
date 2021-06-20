import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
// import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  async onApplicationBootstrap() {
    const movieList = await this.findAll();
    if (!movieList.length)
      createReadStream(`${__dirname}/../config/movielist.csv`)
        .pipe(
          csv({
            separator: ';',
          }),
        )
        .on('data', (movie) => {
          this.create(movie);
        })
        .on('end', () => console.log('Movie list updated from CSV File'));
  }

  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<MovieEntity> {
    return this.movieRepository.findOne(id);
  }

  // update(id: number, updateMovieDto: UpdateMovieDto) {
  //   return `This action updates a #${id} movie`;
  // }

  async remove(id: number) {
    // const movie = this.findOne(id);
    // if (!movie) return;
    return await this.movieRepository.delete(id);
  }
}
