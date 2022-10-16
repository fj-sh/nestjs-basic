import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { FindTaskDto } from './dto/find-task.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @UseInterceptors(TransformInterceptor)
  findOne(@Body() findTaskDto: FindTaskDto) {
    return this.tasksService.findOne(findTaskDto.id);
  }

  @Patch()
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto);
  }

  @Delete()
  remove(@Body() deleteTaskDto: DeleteTaskDto) {
    return this.tasksService.remove(deleteTaskDto.id);
  }
}
