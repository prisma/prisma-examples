/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  // Your app's config.
  app(input) {
    return {
      name: "prisma-client-aws-lambda-sst",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  
  // Your app's resources.
  // Note: The Global `sst` library is only available in the run function of your sst.config.ts.
  async run() {
    const secrets = {
      directUrl: new sst.Secret("DIRECT_URL", '<placeholder_value>'),
    }
    const allSecrets = Object.values(secrets)

    new sst.aws.Function('prisma-client-aws-lambda-sst', {
      handler: "src/index.handler",
      url: true,
      runtime: 'nodejs20.x',
      architecture: 'arm64',
      link: [
        // encrypts the secrets as part of the function bundle on deploy, and
        // then synchronously decrypts them as the function loads via the SST SDK.
        ...allSecrets,
      ],
    })
  },
});
