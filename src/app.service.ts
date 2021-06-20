import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
// const movielist = require('./movielist.csv');

@Injectable()
export class AppService implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    console.log(__dirname, 'movielist.csv');
    createReadStream(`${__dirname}/movielist.csv`)
      .pipe(
        csv({
          separator: ';',
        }),
      )
      .on('data', (movie) => console.log(movie));
  }
}
