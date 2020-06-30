create extension postgis;

create table "public"."User" (
  id serial primary key,
  "name" text not null,
  location geography(Point, 4326)
);

create table "public"."Location" (
  id serial primary key,
  name text not null,
  location geography(Point, 4326)
);

create function "public"."locations_near_user" (
  user_id int,
  distance int
) returns table (id int, name text) as $$
  select l.id, l.name from "public"."Location" l
	where st_distance(
		l.location,
    (select location from "public"."User" u where u.id = user_id)
	) / 1000 <= distance
$$ language 'sql' stable;
