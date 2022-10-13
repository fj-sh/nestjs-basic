import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository
      .save({ name: createTaskDto.name })
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(
        `${id}に一致するデータが見つかりませんでした。`,
      );
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository
      .update(id, { name: updateTaskDto.name })
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
    const updatedPost = await this.taskRepository.findOneBy({ id });
    if (updatedPost) {
      return updatedPost;
    }

    throw new NotFoundException(
      `${id}に一致するデータが見つかりませんでした。`,
    );
  }

  async remove(id: number): Promise<DeleteResult> {
    const response = await this.taskRepository.delete(id).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });

    if (!response.affected) {
      throw new NotFoundException(
        `${id} に一致するデータが見つかりませんでした`,
      );
    }

    return response;
  }
}
