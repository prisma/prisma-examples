import { dataContract } from "@prisma/composer-prisma-cloud/orm";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

export const appContract = dataContract<Contract>(contractJson);
