import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { TasksResolver } from './tasks.resolver';
import { TasksSeederService } from '../database/seeders/tasks/tasks.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  exports: [TypeOrmModule, TasksSeederService],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, TasksResolver, TasksSeederService],
})
export class TasksModule {}
