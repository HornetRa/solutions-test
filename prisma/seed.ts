import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'node:url';
import { PROFILE_SLUG } from '../src/profile/constants.js';

export { PROFILE_SLUG };

export async function seed(prisma: PrismaClient) {
  const profile = await prisma.profile.upsert({
    where: { slug: PROFILE_SLUG },
    update: {
      name: 'Aleksei Rybkin',
      title: 'Senior Fullstack Developer · React / Next.js / Node.js',
      description:
        'Senior fullstack developer with 8+ years building scalable, high-load web apps for fintech and enterprise. Core stack: React, TypeScript, Next.js, Node.js / NestJS; commercial Vue.js experience. Shipped microfrontend architecture and a UI Kit from scratch, owned CI/CD, mentored developers and led technical decisions across teams.',
    },
    create: {
      slug: PROFILE_SLUG,
      name: 'Aleksei Rybkin',
      title: 'Senior Fullstack Developer · React / Next.js / Node.js',
      description:
        'Senior fullstack developer with 8+ years building scalable, high-load web apps for fintech and enterprise. Core stack: React, TypeScript, Next.js, Node.js / NestJS; commercial Vue.js experience. Shipped microfrontend architecture and a UI Kit from scratch, owned CI/CD, mentored developers and led technical decisions across teams.',
    },
  });

  await prisma.link.deleteMany({ where: { profileId: profile.id } });
  await prisma.skill.deleteMany({ where: { profileId: profile.id } });
  await prisma.experience.deleteMany({ where: { profileId: profile.id } });
  await prisma.project.deleteMany({ where: { profileId: profile.id } });

  await prisma.link.createMany({
    data: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/aleksei-rybkin-b5842816a',
        order: 0,
        profileId: profile.id,
      },
      { label: 'Telegram', url: 'https://t.me/amasumara', order: 1, profileId: profile.id },
    ],
  });

  const skills: { name: string; category: string }[] = [
    { name: 'React', category: 'Frontend' },
    { name: 'React Native', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Next.js (SSR/SSG)', category: 'Frontend' },
    { name: 'Vue.js 2/3 / Nuxt', category: 'Frontend' },
    { name: 'Redux Toolkit / Zustand / MobX', category: 'State Management' },
    { name: 'TanStack Query', category: 'State Management' },
    { name: 'Microfrontends & UI Kit development', category: 'UI & Styling' },
    { name: 'SASS/SCSS, BEM/SMACSS', category: 'UI & Styling' },
    { name: 'Node.js / NestJS', category: 'Backend' },
    { name: 'Express / Koa', category: 'Backend' },
    { name: 'Prisma', category: 'Backend' },
    { name: 'PostgreSQL / MongoDB / Redis', category: 'Backend' },
    { name: 'RabbitMQ / Kafka', category: 'Backend' },
    { name: 'GraphQL / REST / gRPC / WebSocket', category: 'Backend' },
    { name: 'Jest / Cypress / React Testing Library', category: 'Testing' },
    { name: 'Docker / CI-CD (Jenkins, GitLab CI)', category: 'Build & DevOps' },
    { name: 'AWS (EC2, RDS, S3, IAM)', category: 'Build & DevOps' },
    { name: 'Technical leadership & mentoring', category: 'Leadership' },
  ];
  await prisma.skill.createMany({
    data: skills.map((s, i) => ({ ...s, order: i, profileId: profile.id })),
  });

  const experience = [
    {
      company: 'AAC Speech-Therapy Platform (Client Project)',
      position: 'Contract Fullstack Developer',
      period: 'Aug 2026 - Present',
      achievements: [
        'Custom PixiJS (WebGL) canvas engine shared across editor, live game, specialist mirror and attempt replay',
        '8 interactive lesson mechanics with custom logic (pattern tracing, pair matching, shape arithmetic, and more)',
        'NestJS + Prisma backend with live WebSocket monitoring for specialists',
        'Event-sourced session replay reconstructed from stored events, not video',
        'Multi-tenant RBAC with secure QR-token lesson delivery and i18n/PWA for 15 languages',
      ],
    },
    {
      company: 'Real-Estate Platform (Client Project)',
      position: 'Contract Fullstack Developer',
      period: 'Mar 2026 - Present',
      achievements: [
        'NestJS + Prisma + PostgreSQL modular backend: 26 modules, 67-table domain model',
        'Next.js 16 (App Router) storefront and admin dashboard, 67 pages, ISR for SEO/speed',
        'JWT/Passport auth with role-based dashboards per user type',
        'Real-time chat/notifications over WebSocket, cron jobs, i18n for 7 locales',
        'AWS deployment: EC2, RDS, S3 with IAM roles',
      ],
    },
    {
      company: 'Qugo',
      position: 'Senior Fullstack Developer',
      period: 'Sep 2022 - Feb 2026',
      achievements: [
        'Owned React/TypeScript frontend handling 25K+ daily transactions for 1K+ companies',
        'Designed and built the user registration service end-to-end (OAuth/SSO, validation, multi-tenant/locale support)',
        'Built a custom microfrontend UI Kit adopted across teams',
        'Implemented PostgreSQL, Redis and RabbitMQ/Kafka backend infrastructure with Docker and CI/CD',
        'Ran technical interviews, mentoring and code reviews for the team',
      ],
    },
    {
      company: 'KMS Lighthouse',
      position: 'Fullstack Developer',
      period: 'Oct 2020 - Sep 2022',
      achievements: [
        'Built features and refactored legacy code in Vue.js 2/3 + Vuex with TypeScript',
        'Wrote backend logic and REST endpoints in C# (.NET)',
        'Led estimation and code review for frontend track across 3 distributed teams',
        'Led a Knockout.js to Vue.js migration, cutting page load times',
      ],
    },
    {
      company: 'Digiterra',
      position: 'Fullstack Developer',
      period: 'Feb 2018 - Oct 2020',
      achievements: [
        'Developed and maintained React/React Native apps for German clients',
        'Designed REST APIs with Python/Django (DRF) and PostgreSQL',
        'Stood up Node.js/Express/Koa services on MongoDB',
        'Increased unique visitors by ~30% via Next.js SSR and SEO improvements',
      ],
    },
  ];
  await prisma.experience.createMany({
    data: experience.map((e, i) => ({ ...e, order: i, profileId: profile.id })),
  });

  await prisma.project.createMany({
    data: [
      {
        name: 'Consul Service Discovery Demo',
        description:
          'Two Node.js/Express services (order-service, payment-service) registering with Consul; dynamic service lookup with health checks, orchestrated via Docker Compose.',
        url: 'https://github.com/REPLACE_ME/consul-service-discovery-demo',
        order: 0,
        profileId: profile.id,
      },
    ],
  });
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
  const prisma = new PrismaClient();
  seed(prisma)
    .then(() => prisma.$disconnect())
    .catch(async (error: unknown) => {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
