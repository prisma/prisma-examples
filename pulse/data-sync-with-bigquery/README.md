# Prisma Pulse Example: Data Sync with Google BigQuery

This repository demonstrates how to sync data into Google BigQuery using [Prisma Pulse](https://www.prisma.io/pulse).

## Prerequisites

To successfully run the project, you will need the following:

- The **connection string** of a Pulse-ready database (if you don't have one yet, you can configure your database following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup) or [use a Railway template](https://railway.app/template/pulse-pg?referralCode=VQ09uv))
- A **Pulse API key** which you can get by enabling Pulse in a project in your [Prisma Data Platform](https://pris.ly/pdp) account (learn more in the [docs](https://www.prisma.io/docs/platform/concepts/environments#api-keys))
- The JSON contents of a **service account file** called [`service-account.json`](./service-account.json) in the root directory of this project

<details><summary>Expand to see steps for obtaining your service account file</summary>

### 1. Go to the Google Cloud Console

Navigate to the [Google Cloud Console](https://console.cloud.google.com/).

### 2. Select or create a project

If you haven't already, select an existing project or create a new one.

### 3. Navigate to the IAM & Admin section

1. In the Cloud Console, click on the menu icon (three horizontal lines) in the top-left corner.
2. Select **IAM & Admin** and then **Service accounts**.

### 4. Create a Service Account

1. Click the **Create Service Account** button.
2. Enter a name and description for your service account.
3. Click **Create**.

### 5. Grant permissions to the Service Account

1. In the **Service account permissions** section, grant the necessary roles to the Service Account. For BigQuery, you typically need the **BigQuery Data Editor** and **BigQuery Job User** roles.
2. Click **Continue**.

### 6. Create key for the Service Account

1. In the **Grant users access to this service account** section, click **Done** (you can skip this step if you don't need to grant access to other users).
2. Find the service account you created in the list.
3. Click the three vertical dots in the **Actions** column for your service account, and select **Manage keys**.
4. Click on the **Add Key** button, then select **Create new key**.
5. In the **Key type** section, choose **JSON** and click **Create**.

The JSON key file will be downloaded to your computer. This file contains your service account credentials.

It will look similar to this:

```json
{
  "type": "service_account",
  "project_id": "big-query-pulse-demo",
  "private_key_id": "44ddb0e575520d07a2fa8aa5d0ab95cf285fcdb7",
  "private_key": "-----BEGIN PRIVATE KEY-----\n ... =\n-----END PRIVATE KEY-----\n",
  "client_email": "janedoe-545@big-query-pulse-demo.iam.gserviceaccount.com",
  "client_id": "102929029119421091767",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/janedoe-545%40big-query-pulse-demo.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

</details>


## Getting started

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/pulse/data-sync-with-bigquery
npm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and update the `DATABASE_URL` and `PULSE_API_KEY` environment variables with the values of your connection string and your Pulse API key:

```bash
# .env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
PULSE_API_KEY="__YOUR_PULSE_API_KEY__"
GOOGLE_APPLICATION_CREDENTIALS="./service-account.json" # make sure this points to your service account file
```

Note that `__YOUR_DATABASE_CONNECTION_STRING__` and `__YOUR_PULSE_API_KEY__` are placeholder values that you need to replace with the values of your connection string and your Pulse API key. the `GOOGLE_APPLICATION_CREDENTIALS` environment variable already is set to point to the empty [`./service-account.json`](./service-account.json) in this project.

### 3. Configure your service account file

Paste the contents of your service account file into [`./service-account.json`](./service-account.json). It will look similar to this:

```js
// service-account.json
{
  "type": "service_account",
  "project_id": "big-query-pulse-demo",
  "private_key_id": "44ddb0e575520d07a2fa8aa5d0ab95cf285fcdb7",
  "private_key": "-----BEGIN PRIVATE KEY-----\n ... =\n-----END PRIVATE KEY-----\n",
  "client_email": "janedoe-545@big-query-pulse-demo.iam.gserviceaccount.com",
  "client_id": "102929029119421091767",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/janedoe-545%40big-query-pulse-demo.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

### 4. Run a database migration to create the `User` table

The Prisma schema file contains a single `User` model. You can map this model to the database and create the corresponding `User` table using the following command:

```bash
npx prisma migrate dev --name init
```

You now have an empty `User` table in your database.

### 5. Start the app

Start the app by running the following command:

```bash
npm run dev
```

This will run the script at [`index.ts`](./index.ts) and perform the following actions:

1. Create a new dataset called `pulse_demo` if it doesn't exist yet in your BigQuery project
1. Create a new table called `users` if it doesn't exist yet in the `pulse_demo` dataset
1. Start streaming database change events with Prisma Pulse and sync new records into the `users` table in the `pulse_demo` dataset

### 5. Test the app

The following instructions use [Prisma Studio](https://www.prisma.io/studio) to create a new record in the `User` table. However, you can use any other method to write to the `User` table in your PostgreSQL database (e.g. a SQL client like `psql` or [TablePlus](https://tableplus.com/)) in order to trigger a database change event in Pulse.

1. Start Prisma Studio in a new terminal: `npx prisma studio`
2. Add a new record to the `User` table via Prisma Studio UI.
3. Return to your terminal where you ran the `npm run dev` command.
4. If everything is set up properly you will see an output that is similar to the following.

   ```
   Just received an event: {
     action: 'create',
     created: { id: 6, email: 'test@prisma.io', name: 'Test' },
     id: '01HZ1NZV2GX9YQA4J7GM7HQ78Q',
     modelName: 'User'
   }
   Inserted user with email 'test@prisma.io' into 'pulse_demo.users'
   ```

## Resources

- [Pulse examples](https://pris.ly/pulse-examples)
- [Pulse documentation](https://pris.ly/pulse-docs)
- [Pulse announcement blog post](https://pris.ly/gh/pulse-ga)
- [Prisma Discord](https://pris.ly/discord)
