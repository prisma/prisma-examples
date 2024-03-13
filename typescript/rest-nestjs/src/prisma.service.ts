import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '../prisma/generated/foo'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Note: this is optional
    await this.$connect()
  }
}
