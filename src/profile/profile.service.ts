import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PROFILE_SLUG } from './constants.js';
import { Profile } from './models/profile.model.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { slug: PROFILE_SLUG },
      include: {
        links: { orderBy: { order: 'asc' } },
        skills: { orderBy: { order: 'asc' } },
        experience: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
      },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile "${PROFILE_SLUG}" not found — has the database been seeded?`,
      );
    }

    return profile;
  }
}
