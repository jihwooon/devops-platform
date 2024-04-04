import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { describe, it } from 'vitest';
import { AppModule } from '../src/app.module';

describe('IssueController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  describe('/git/login (GET)', () => {
    it('should return the response body and status code', async () => {
      const response = await request(app.getHttpServer())
        .get('/git/login')
        .set('Authorization', `Bearer ${process.env.GITHUB_AUTH_TOKEN}`);

      expect(response.status).toBe(500);
    });
  });
});
