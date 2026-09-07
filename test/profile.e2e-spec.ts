import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../src/app.module.js';
import { seed } from '../prisma/seed.js';

describe('Profile GraphQL (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await seed(prisma);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('returns the seeded profile with all nested fields', async () => {
    const query = `
      query {
        profile {
          name
          title
          links { label url }
          skills { name category }
          experience { company position period achievements }
          projects { name description url }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const { profile } = response.body.data;
    expect(profile.name).toBe('Aleksei Rybkin');
    expect(profile.links.length).toBeGreaterThan(0);
    expect(profile.skills.length).toBeGreaterThan(0);
    expect(profile.experience.length).toBeGreaterThan(0);
    expect(profile.projects.length).toBeGreaterThan(0);
  });

  it('rejects a query for a field that does not exist on the schema', async () => {
    const query = `query { profile { nope } }`;

    const response = await request(app.getHttpServer()).post('/graphql').send({ query });

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toContain('nope');
  });
});
