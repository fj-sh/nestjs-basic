import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('TasksServiceの正常系のテスト', () => {
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

  const mockUpdate = (id: number, name: string): UpdateResult => {
    return {
      raw: 1,
      affected: 2,
      generatedMaps: [],
    };
  };

  const mockDelete = (): DeleteResult => {
    return {
      raw: 1,
      affected: 2,
    };
  };

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
            update: jest.fn(mockUpdate),
            delete: jest.fn(mockDelete),
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

  describe('update', () => {
    it('更新されたタスクを返すこと', async () => {
      const updateTargetId = 1;
      const updateDto: UpdateTaskDto = {
        name: '更新された勉強',
      };

      // update 内では findOneBy が呼び出されている。 findOneBy のモックからは { id: 1, name: '勉強' } が返される。
      const expected = { id: 1, name: '勉強' };

      const actual = await tasksService.update(updateTargetId, updateDto);
      expect(actual).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('削除された結果を返すこと', async () => {
      const targetId = 1;
      const expected = {
        raw: 1,
        affected: 2,
      };
      const actual = await tasksService.remove(targetId);
      expect(actual).toEqual(expected);
    });
  });
});
