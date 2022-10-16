import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { DeleteResponseDto } from '../shared/dto/delete-response.dto';
import { FindTaskDto } from './dto/find-task.dto';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query((returns) => Task)
  async getTask(@Args('findTask') findTaskDto: FindTaskDto): Promise<Task> {
    return this.tasksService.findOne(findTaskDto.id);
  }

  @Query((returns) => [Task])
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Mutation((returns) => Task)
  async createTask(@Args('newTask') newTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(newTaskDto);
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Args('updateTask') updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(updateTaskDto);
  }

  @Mutation((returns) => DeleteResponseDto)
  async deleteTask(@Args('deleteTask') deleteTaskDto: DeleteTaskDto) {
    return this.tasksService.remove(deleteTaskDto.id);
  }
}
