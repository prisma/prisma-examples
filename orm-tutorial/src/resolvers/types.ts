import { ITypes } from "../generated/resolvers";

import { QueryRoot } from "./Query";
import { SpecialMasterRoot } from "./SpecialMaster";
import { CatRoot } from "./Cat";

import { Context } from "./Context";

export interface Types extends ITypes {
  Context: Context;
  QueryRoot: QueryRoot;
  SpecialMasterRoot: SpecialMasterRoot;
  CatRoot: CatRoot;
}
