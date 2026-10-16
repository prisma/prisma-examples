#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/42fbbe796b6d0793f2d98649ebfee94a6e769fe7bb5a5b11fa616eb75fd08a3c/contract';
import startContract from '../../snapshots/42fbbe796b6d0793f2d98649ebfee94a6e769fe7bb5a5b11fa616eb75fd08a3c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/7eb72e5dca77a2eb6054b989b2b7b5356eebb195089f208b095cc5f6e5cef10a/contract';
import endContract from '../../snapshots/7eb72e5dca77a2eb6054b989b2b7b5356eebb195089f208b095cc5f6e5cef10a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
