import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@foo/bar'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Note: this is optional
    await this.$connect()
  }
}
