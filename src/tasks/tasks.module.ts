import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { TasksResolver } from './tasks.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  exports: [TypeOrmModule, TaskRepository],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, TasksResolver],
})
export class TasksModule {}
