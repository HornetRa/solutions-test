import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PROFILE_SLUG } from './constants.js';

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: { profile: { findUnique: ReturnType<typeof vi.fn> } };

  beforeEach(async () => {
    prisma = {
      profile: {
        findUnique: vi.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(ProfileService);
  });

  it('returns the profile', async () => {
    const fakeProfile = {
      name: 'Kakoi to tip',
      title: 'Traveler',
      description: 'I have being moving around the World',
      links: [],
      skills: [],
      experience: [],
      projects: [],
    };
    prisma.profile.findUnique.mockResolvedValue(fakeProfile);

    const result = await service.getProfile();

    expect(result).toBe(fakeProfile);
    expect(prisma.profile.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { slug: PROFILE_SLUG } }),
    );
  });

  it('throws NotFoundException', async () => {
    prisma.profile.findUnique.mockResolvedValue(null);

    await expect(service.getProfile()).rejects.toThrow(NotFoundException);
  });
});
