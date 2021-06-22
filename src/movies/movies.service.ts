import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

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
    return await this.movieRepository.findOne(id);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return await this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: number) {
    return await this.movieRepository.delete(id);
  }

  findMovieProducers(movie: MovieEntity): Array<string> {
    return movie.producers
      .split(/( and )|(,)/)
      .filter(
        (el) => el && el?.toString() !== ',' && el?.toString() !== ' and ',
      );
  }

  groupMoviesByProducer(producers: Array<MovieEntity[]>) {
    const movies = {};

    for (const [producer, producerMovies] of Object.entries(producers) as Array<
      [string, MovieEntity[]]
    >) {
      if (producerMovies.length > 1) {
        movies[producer] = producerMovies;
      }
    }

    return movies;
  }

  findProducerIntervals(movies: Array<MovieEntity>, producer: string) {
    let min = null;
    let max = null;

    movies.reduce((prevMovie, movie) => {
      if (!min || +prevMovie.year - +movie.year > min.interval) {
        min = {
          producer,
          interval: Math.abs(+prevMovie.year - +movie.year),
          previousWin: prevMovie.year,
          followingWin: movie.year,
        };
      } else if (!max || +prevMovie.year - +movie.year < max.interval) {
        max = {
          producer,
          interval: Math.abs(+prevMovie.year - +movie.year),
          previousWin: prevMovie.year,
          followingWin: movie.year,
        };
      }
      if (!max) max = min;
      return movie;
    });

    return { min, max };
  }

  findAbsoluteIntervals(producerIntervals) {
    const min = producerIntervals.reduce((prevProducer, { min }) => {
      if (!prevProducer.length) {
        return [min];
      }

      return prevProducer[0].interval >= min.interval
        ? prevProducer[0].interval === min.interval
          ? [...prevProducer, min]
          : [min]
        : prevProducer;
    }, []);

    const max = producerIntervals.reduce((prevProducer, { max }) => {
      if (!prevProducer.length) {
        return [max];
      }

      return prevProducer[0].interval <= max.interval
        ? prevProducer[0].interval === max.interval
          ? [...prevProducer, max]
          : [max]
        : prevProducer;
    }, []);

    return { min, max };
  }

  async findIntervals(): Promise<any> {
    const movielist = await this.findAll();
    const winners = movielist.filter(({ winner }) => winner);
    const producers = winners.reduce((producers: any, movie) => {
      const movieProducers = this.findMovieProducers(movie);
      movieProducers.forEach((producer) => {
        !!~Object.keys(producers).indexOf(producer)
          ? producers[producer].push(movie)
          : (producers[producer] = [movie]);
      });

      return producers;
    }, {});

    const moviesByProducer = this.groupMoviesByProducer(producers);

    const producerIntervals = [];
    for (const producer in moviesByProducer) {
      producerIntervals.push(
        this.findProducerIntervals(moviesByProducer[producer], producer),
      );
    }

    return this.findAbsoluteIntervals([...producerIntervals]);
  }
}
