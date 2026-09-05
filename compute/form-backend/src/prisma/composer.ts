import { pnContract } from "@prisma/composer-prisma-cloud/prisma-next";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

export const appContract = pnContract<Contract>(contractJson);
