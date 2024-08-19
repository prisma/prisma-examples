# Prisma Pulse-Inngest Router

This package enables event-driven support for your existing Inngest workflows,
using Prisma Pulse. Trigger workflows instantly whenever a database table
changes, so you can create timely workflows that run instantly -- not only
batch workflows.

## Pre-requisites

- A **Pulse API key** which you can get by enabling Pulse in a project in your
  [Prisma Data Platform](https://pris.ly/pdp) account (learn more in the
  [docs](https://www.prisma.io/docs/platform/concepts/environments#api-keys))
- An existing [Inngest](https://www.inngest.com) account and
  [Event Key](https://www.inngest.com/docs/events/creating-an-event-key?ref=environment-variables)

## Get started

### Fork or clone this repo

You should operate with your own version of this service in a GitHub repository
that you own. This allows you to track changes, and deploy to cloud platforms
easily.

### Set up your API keys

Make a copy of the `.env.sample` file and update it with your own keys and
database connection string:

```bash
cp .env.sample .env
```

### Add your Prisma schema

Add your existing Prisma schema file to the `/prisma` directory, overwriting
the existing example schema.

### Define the Prisma models to subscribe to

Add all Prisma models that you wish to stream events from to the array. The
service will ignore any models that don't exist.

Note that the naming convention should follow the standard naming convention for
Prisma ORM, eg. `MyModel` becomes `myModel`.

```typescript
// Here configure each prisma model to stream changes from
const PRISMA_MODELS = ['notification', 'user'];
```

### Test locally before saving your changes

Run the service locally:
1. `npx prisma generate`
1. `npm run build`
1. `npm run start`

**Hint:** you can trigger changes in your database by running
`npx prisma studio` and modifying some data or adding a new row.

### Commit your changes

```
git add .
git commit -m "Configure my pulse-inngest-router service"
git push
```

## Deploy

### To Railway

1. Create an account and project on [Railway](https://railway.app/new)
1. Create a new service by clicking the **Create** button in the top right of
your dashboard
1. Choose to deploy from a **GitHub Repo**
1. Authorize your GitHub account, and choose the GitHub repository you used in
previous steps
1. Add the respective environment variables:
    1. DATABASE_URL
    1. PULSE_API_KEY
    1. INNGEST_EVENT_KEY

### Run manually with Docker

1. Build the Docker image: `docker build -t pulse-inngest-router .`
1. Run the service, substituting the variables with your own values:
```
docker run \
  -e DATABASE_URL="" \
  -e PULSE_API_KEY="" \
  -e INNGEST_EVENT_KEY="" \
  pulse-inngest-router
```

## Create Inngest functions

When database changes occur, there will automatically be events submitted to 
your Inngest project. The event names will be formatted like this: `db/<action>.<model>`

eg. If your model is `notification`, and a new row is added, the event submitted
to Inngest will be `db/create.notification`

The possible actions are `create`, `update`, and `delete`.

To handle these events, create an Inngest function with the appropriate name.
See the below example, and the [Inngest docs](https://www.inngest.com/docs/learn/inngest-functions) for more detail:

```typescript
export default inngest.createFunction(
  { id: "handle-new-notification" },
  { event: "db/create.notification" },
  async ({ event, step }) => {
    const pulseChange = event.data;

    // Your logic here
  };
);
```

Note that the full [Pulse Change Event](https://www.prisma.io/docs/pulse/database-events) is available in `event.data`;

## Helpful documentation
1. [Get started with Prisma ORM](https://www.prisma.io/docs/getting-started)
1. [Get started with Prisma Pulse](https://www.prisma.io/docs/pulse)

## Get help

[Join our Discord community](https://discord.gg/KQyTW2H5ca) to get help with
Prisma products and discuss Prisma related topics.