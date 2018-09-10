import { IResolvers } from "../generated/resolvers";
import { Types } from "./types";

import { Query } from "./Query";
import { SpecialMaster } from "./SpecialMaster";
import { Cat } from "./Cat";

export const resolvers: IResolvers<Types> = {
  Query,
  SpecialMaster,
  Cat
};
