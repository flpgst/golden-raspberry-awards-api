import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { AwardsModule } from './awards/awards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'golden-raspberry-awards',
      entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
      synchronize: true,
    }),
    MoviesModule,
    AwardsModule,
  ],
})
export class AppModule {}
