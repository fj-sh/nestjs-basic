import { Injectable, Logger } from '@nestjs/common';
import { TasksSeederService } from './tasks/tasks.seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly tasksSeederService: TasksSeederService,
  ) {}

  async seed() {
    await this.tasks()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding tasks...');

        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding tasks...');

        Promise.reject(error);
      });
  }

  async tasks() {
    return await Promise.all(this.tasksSeederService.create())
      .then((createdTasks) => {
        this.logger.debug(
          '作成されたタスク数: ' +
            createdTasks.filter(
              (nullValueOrCreatedTask) => nullValueOrCreatedTask,
            ).length,
        );

        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
