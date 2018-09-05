import { GraphQLResolveInfo } from "graphql";

export interface ResolverFn<Root, Args, Ctx, Payload> {
  (root: Root, args: Args, ctx: Ctx, info: GraphQLResolveInfo):
    | Payload
    | Promise<Payload>;
}

export interface ITypes {
  Context: any;

  QueryRoot: any;
  SpecialMasterRoot: any;
  CatRoot: any;
}

export namespace IQuery {
  export type MastersResolver<T extends ITypes> = ResolverFn<
    T["QueryRoot"],
    {},
    T["Context"],
    T["SpecialMasterRoot"][]
  >;

  export interface Resolver<T extends ITypes> {
    masters: MastersResolver<T>;
  }
}

export namespace ISpecialMaster {
  export type IdResolver<T extends ITypes> = ResolverFn<
    T["SpecialMasterRoot"],
    {},
    T["Context"],
    string
  >;

  export type CatBrothersResolver<T extends ITypes> = ResolverFn<
    T["SpecialMasterRoot"],
    {},
    T["Context"],
    T["CatRoot"][]
  >;

  export interface Resolver<T extends ITypes> {
    id: IdResolver<T>;
    catBrothers: CatBrothersResolver<T>;
  }
}

export namespace ICat {
  export type IdResolver<T extends ITypes> = ResolverFn<
    T["CatRoot"],
    {},
    T["Context"],
    string
  >;

  export type NameResolver<T extends ITypes> = ResolverFn<
    T["CatRoot"],
    {},
    T["Context"],
    string
  >;

  export type ColorResolver<T extends ITypes> = ResolverFn<
    T["CatRoot"],
    {},
    T["Context"],
    string
  >;

  export type FavBrotherResolver<T extends ITypes> = ResolverFn<
    T["CatRoot"],
    {},
    T["Context"],
    T["CatRoot"] | null
  >;

  export interface Resolver<T extends ITypes> {
    id: IdResolver<T>;
    name: NameResolver<T>;
    color: ColorResolver<T>;
    favBrother: FavBrotherResolver<T>;
  }
}

export interface IResolvers<T extends ITypes> {
  Query: IQuery.Resolver<T>;
  SpecialMaster: ISpecialMaster.Resolver<T>;
  Cat: ICat.Resolver<T>;
}
