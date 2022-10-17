import { TasksModule } from '../../tasks/tasks.module';
import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { Seeder } from './seeder';

@Module({
  imports: [TasksModule, DatabaseModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
