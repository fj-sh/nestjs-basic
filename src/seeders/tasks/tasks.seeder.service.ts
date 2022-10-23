import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../tasks/task.repository';
import { Task } from '../../tasks/entities/task.entity';
import { tasks } from './data';

@Injectable()
export class TasksSeederService {
  constructor(private readonly taskRepository: TaskRepository) {}

  create(): Array<Promise<Task>> {
    return tasks.map(async (task) => {
      const result = await this.taskRepository.findOneBy({ name: task.name });
      if (!result) {
        return Promise.resolve(
          await this.taskRepository
            .save(task)
            .catch((error) => Promise.reject(error)),
        );
      } else {
        return Promise.resolve(null);
      }
    });
  }
}
