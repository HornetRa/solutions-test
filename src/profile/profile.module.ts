import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver.js';
import { ProfileService } from './profile.service.js';

@Module({
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
