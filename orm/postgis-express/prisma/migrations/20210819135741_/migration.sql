CREATE EXTENSION IF NOT EXISTS postgis schema "public";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" "public".geography,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" "public".geography,

    PRIMARY KEY ("id")
);

CREATE FUNCTION "locations_near_user" (
    user_id INT,
    distance INT
) returns TABLE (id INT, name TEXT) as $$
    select l.id, l.name from "Location" l
    where "public"."st_distance"(
        l.location,
        (select location from "User" u where u.id = user_id)
    ) / 1000 <= distance
$$ language 'sql' stable;