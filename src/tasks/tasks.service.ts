import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './task.repository';
import { DeleteResponse } from '../shared/interfaces/delete-response.interface';

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

  async update(updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(updateTaskDto.id, {
      name: updateTaskDto.name,
    });

    const updatedPost = await this.taskRepository.findOneBy({
      id: Number(updateTaskDto.id),
    });
    if (updatedPost) {
      return updatedPost;
    }

    throw new NotFoundException(
      `${updateTaskDto.id}に一致するデータが見つかりませんでした。`,
    );
  }

  async remove(id: number): Promise<DeleteResponse> {
    const response = await this.taskRepository.delete(id);

    if (!response.affected) {
      throw new NotFoundException(
        `${id} に一致するデータが見つかりませんでした`,
      );
    }

    return {
      message: `${id}を削除しました。`,
      delete: true,
    };
  }
}
