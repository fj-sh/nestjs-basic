import { createTestingModule } from './create-testing-module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

export async function getApplication() {
  if (!app) {
    app = await createTestingModule();
  }

  return app;
}
