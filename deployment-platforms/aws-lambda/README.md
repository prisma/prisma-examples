# AWS Lambda deployment example

[Deployment Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-aws-lambda)

## Download manually

```bash
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/deployment-platforms/aws-lambda
cd aws-lambda
```

The Serverless configuration file includes a package pattern that excludes all Prisma Engine binaries but the one relevant for the Lambda runtime. You can read more in our [documentation](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda#package-pattern-in-serverlessyml).