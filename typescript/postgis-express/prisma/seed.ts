import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const schema = process.env.DB_URL?.split('?schema=')[1] || 'public'

async function seed() {
  const sql = await generateSQL()
  for (let statement of sql) {
    await prisma.executeRaw(statement)
  }
}

seed()
  .then(() => console.log('seeded!'))
  .catch(console.error)
  .finally(async () => {
    await prisma.disconnect()
  })

async function generateSQL() {
  const sql = `
  create extension if not exists postgis;

  create table if not exists "${schema}"."User" (
    id serial primary key,
    "name" text not null,
    location geography(Point, 4326)
  );
  
  create table if not exists "${schema}"."Location" (
    id serial primary key,
    name text not null,
    location geography(Point, 4326)
  );
  
  create function if not exists "${schema}"."locations_near_user" (
    user_id int,
    distance int
  ) returns table (id int, name text) as $$
    select l.id, l.name from "Location" l
    where st_distance(
      l.location,
      (select location from "User" u where u.id = user_id)
    ) / 1000 <= distance
  $$ language 'sql' stable;
  `
  return sql
    .split('\n')
    .filter((line) => line.indexOf('--') !== 0)
    .join('\n')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s+/g, ' ')
    .split(';')
    .map((sql) => sql.trim())
    .filter(Boolean)
}
