import { TasksModule } from '../tasks/tasks.module';
import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { Seeder } from './seeder';
import { TasksSeederService } from './tasks/tasks.seeder.service';

@Module({
  imports: [TasksModule, DatabaseModule],
  providers: [Logger, Seeder, TasksSeederService],
})
export class SeederModule {}
