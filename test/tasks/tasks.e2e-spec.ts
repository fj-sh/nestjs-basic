import { INestApplication } from '@nestjs/common';
import { getApplication } from '../utils/get-application';
import * as request from 'supertest';

describe('TasksResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApplication();
  });

  describe('Query #getAllTasks', () => {
    const query = () => `
      query {
        getAllTasks {
          id
          name
        }
      }
    `;

    it('タスクが取得できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: query(),
        });

      expect(body).toEqual({
        data: {
          getAllTasks: [
            {
              id: 4,
              name: '洗濯',
            },
            {
              id: 5,
              name: 'サッカー',
            },
            {
              id: 3,
              name: 'プログラミング',
            },
          ],
        },
      });
    });
  });
});
