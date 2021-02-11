const { spawnSync } = require("child_process");

const latestPrismaVersion = spawnSync(
  "npm",
  ["info", "prisma@latest", "version"],
  {
    encoding: "utf-8",
  }
).stdout.trim();

const patchDevPrismaVersion = spawnSync(
  "npm",
  ["info", "prisma@patch-dev", "version"],
  {
    encoding: "utf-8",
  }
).stdout.trim();

// 2.7.1-dev.1 => 2.7
const semverBase = (version) => {
  const tokens = version.split(".");
  return tokens[0] + "." + tokens[1];
};

const latestPrismaVersionBase = semverBase(latestPrismaVersion);
const patchDevPrismaVersionBase = semverBase(patchDevPrismaVersion);

if (latestPrismaVersionBase !== patchDevPrismaVersionBase) {
  console.log("false");
} else {
  console.log("true");
}
