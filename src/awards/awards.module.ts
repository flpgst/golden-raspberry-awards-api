import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.service';

@Module({
  imports: [MoviesModule],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
