# AWS Lambda deployment example

[Deployment Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-aws-lambda)

## Download manually

```bash
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/deployment-platforms/aws-lambda
cd aws-lambda
```

The Serverless configuration file includes a package pattern that excludes all Prisma Engine binaries but the one relevant for the Lambda runtime. You can read more in our [documentation](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda#package-pattern-in-serverlessyml).

## Resources

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
