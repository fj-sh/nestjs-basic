import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(@InjectRepository(Task) repository: Repository<Task>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
