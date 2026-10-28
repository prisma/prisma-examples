#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/dc5ac85f4f56b1db685a838b5de651b19189a27ccfbbb3fe4e7e64752be834e2/contract';
import endContract from '../../snapshots/dc5ac85f4f56b1db685a838b5de651b19189a27ccfbbb3fe4e7e64752be834e2/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  createExtension,
  fn,
  primaryKey,
  rawSql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      // Needed by the exclusion constraint at the end: GiST equality on text.
      createExtension('btree_gist'),
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Booking',
        columns: [
          col('booker', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-date@1' },
          }),
          col('endsAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('roomId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startsAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('booking_ends_after_start_20c1ac54', '"endsAt" > "startsAt"'),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Room',
        columns: [
          col('floor', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('seats', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Room',
        constraint: 'Room_name_key',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Booking',
        index: 'Booking_roomId_idx_fe51d647',
        columns: ['roomId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Booking',
        index: 'Booking_roomId_startsAt_idx_4f44cd3f',
        columns: ['roomId', 'startsAt'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Booking',
        foreignKey: {
          name: 'Booking_roomId_fkey',
          columns: ['roomId'],
          references: { schema: 'public', table: 'Room', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      // Second line of defence, hand-written: the contract cannot express an
      // exclusion constraint. Postgres itself refuses two bookings of the same
      // room whose [startsAt, endsAt) ranges overlap, whoever writes them.
      rawSql({
        id: 'constraint.booking.booking_no_overlap',
        label: 'Add exclusion constraint "booking_no_overlap" on "Booking"',
        operationClass: 'additive',
        target: { id: 'postgres' },
        precheck: [
          {
            description: 'constraint "booking_no_overlap" does not exist',
            sql: `SELECT NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'booking_no_overlap')`,
          },
        ],
        execute: [
          {
            description: 'add exclusion constraint',
            sql: `ALTER TABLE "public"."Booking" ADD CONSTRAINT "booking_no_overlap" EXCLUDE USING gist ("roomId" WITH =, tstzrange("startsAt", "endsAt", '[)') WITH &&)`,
          },
        ],
        postcheck: [
          {
            description: 'constraint "booking_no_overlap" exists',
            sql: `SELECT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'booking_no_overlap')`,
          },
        ],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
