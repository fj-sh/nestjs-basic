import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteResult } from 'typeorm';

describe('TasksController - 正常系', () => {
  let controller: TasksController;
  let spyService: TasksService;

  const TasksServiceProvider = {
    provide: TasksService,
    useFactory: () => ({
      create: jest.fn((createTaskDto: CreateTaskDto): Promise<Task> => {
        return Promise.resolve({ id: 1, name: '勉強' });
      }),
      findAll: jest.fn((): Promise<Task[]> => {
        return Promise.resolve([
          { id: 1, name: '勉強' },
          { id: 2, name: '洗濯' },
        ]);
      }),
      update: jest.fn((): Promise<Task> => {
        return Promise.resolve({
          id: 1,
          name: '勉強',
        });
      }),
      remove: jest.fn((): Promise<DeleteResult> => {
        return Promise.resolve({
          raw: 1,
        });
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksServiceProvider],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    spyService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create メソッドが呼ばれたとき', () => {
    const createTask: CreateTaskDto = {
      name: '勉強',
    };
    it('TasksService の create メソッドが呼ばれること', () => {
      controller.create(createTask);
      expect(spyService.create).toHaveBeenCalled();
    });
    it('作成されたタスクが返されること', async () => {
      const expected: Task = {
        id: 1,
        name: '勉強',
      };

      const actual = await controller.create(createTask);
      expect(actual).toEqual(expected);
    });
  });

  describe('findAll メソッドが呼ばれたとき', () => {
    it('TasksService の findAll メソッドが呼ばれること', () => {
      controller.findAll();
      expect(spyService.findAll).toHaveBeenCalled();
    });
    it('タスクのリストが返されること', async () => {
      const expected: Task[] = [
        {
          id: 1,
          name: '勉強',
        },
        {
          id: 2,
          name: '洗濯',
        },
      ];

      const actual = await controller.findAll();
      expect(actual).toEqual(expected);
    });
  });

  describe('update メソッドが呼ばれたとき', () => {
    const updateId = '1';
    const updateTask: UpdateTaskDto = {
      name: '勉強',
    };
    it('TasksService の update メソッドが呼ばれること', () => {
      controller.update(updateId, updateTask);
      expect(spyService.update).toHaveBeenCalled();
    });
    it('更新されたタスクが返されること', async () => {
      const expected: Task = {
        id: 1,
        name: '勉強',
      };

      const actual = await controller.update(updateId, updateTask);
      expect(actual).toEqual(expected);
    });
  });

  describe('remove メソッドが呼ばれたとき', () => {
    const removeId = '1';
    it('TasksService の remove メソッドが呼ばれること', () => {
      controller.remove(removeId);
      expect(spyService.remove).toHaveBeenCalled();
    });
  });
});
