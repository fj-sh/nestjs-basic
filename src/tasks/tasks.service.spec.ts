import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

const mockFind = () => {
  return [
    {
      id: 1,
      name: '勉強',
    },
    {
      id: 2,
      name: '洗濯',
    },
  ];
};

const mockFindOneBy = (id: number) => {
  return {
    id: 1,
    name: '勉強',
  };
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: () => ({
            find: jest.fn(mockFind),
            findOneBy: jest.fn(mockFindOneBy),
          }),
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('タスクの配列を返すこと', async () => {
      await tasksService.findAll();
      const expected = [
        { id: 1, name: '勉強' },
        { id: 2, name: '洗濯' },
      ];
      const actual = await tasksService.findAll();
      expect(actual).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('タスクの配列を返すこと', async () => {
      const id = 1;
      const expected = { id: 1, name: '勉強' };
      const actual = await tasksService.findOne(id);
      expect(actual).toEqual(expected);
    });
  });
});
