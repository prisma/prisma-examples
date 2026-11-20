#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/bcf4cf6e695be2d386e8ca5a493e06891fc9440f6e40a2832e71f0faca8a303c/contract';
import endContract from '../../snapshots/bcf4cf6e695be2d386e8ca5a493e06891fc9440f6e40a2832e71f0faca8a303c/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'stripe_invoices',
        columns: [
          col('amount_due', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('amount_paid', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('created', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('currency', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('customer', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('data', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('livemode', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('synced_at', 'timestamptz(3)', {
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('total', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'stripe_prices',
        columns: [
          col('active', 'bool', { default: lit(true), codecRef: { codecId: 'pg/bool@1' } }),
          col('created', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('currency', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('data', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('livemode', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('product', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('recurring_interval', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('recurring_interval_count', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('synced_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('unit_amount', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'stripe_subscription_items',
        columns: [
          col('created', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('data', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('livemode', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('price_id', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('product_id', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'int4', { default: lit(1), codecRef: { codecId: 'pg/int4@1' } }),
          col('subscription', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('synced_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'stripe_subscriptions',
        columns: [
          col('cancel_at_period_end', 'bool', {
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('canceled_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('created', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('currency', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('current_period_end', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('current_period_start', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('customer', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('data', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('default_payment_method', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('ended_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('livemode', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('synced_at', 'timestamptz(3)', {
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'stripe_invoices',
        index: 'stripe_invoices_status_created_idx_d2187d43',
        columns: ['status', 'created'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'stripe_subscription_items',
        index: 'stripe_subscription_items_subscription_idx_903ec21d',
        columns: ['subscription'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'stripe_subscriptions',
        index: 'stripe_subscriptions_status_idx_e98638ab',
        columns: ['status'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
