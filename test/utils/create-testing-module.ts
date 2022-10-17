import { AppModule } from '../../src/app.module';
import { Test } from '@nestjs/testing';

export async function createTestingModule() {
  const moduleBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  const compiled = await moduleBuilder.compile();
  const app = compiled.createNestApplication(undefined, {
    logger: false,
  });

  return await app.init();
}
