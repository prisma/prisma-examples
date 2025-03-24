# Google Cloud Functions

## Deployment

When deploying on this platform, the build is created on the server and hence the correct binary is available as `prisma generate` runs on the server.

Hence, we do not need to provide additional platform targeting options like `platforms`. With no additional parameters necessary, the generate section of the Prisma schema file looks like the following:

```
generator photon {
    provider = "photonjs"
}
```

## Environment

Deploying to this platform requires setting up the production environment variables correctly. Please refer to the following section to find out how that can be done

https://cloud.google.com/functions/docs/env-var

## Resources

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
