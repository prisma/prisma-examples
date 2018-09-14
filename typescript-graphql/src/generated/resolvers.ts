import { GraphQLResolveInfo } from "graphql";

export interface ITypeMap {
  Context: any;

  QueryParent: any;
  MutationParent: any;
  PostParent: any;
}

export namespace QueryResolvers {
  export type FeedResolver<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["PostParent"][] | Promise<T["PostParent"][]>;

  export type DraftsResolver<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["PostParent"][] | Promise<T["PostParent"][]>;

  export interface ArgsPost {
    id: string;
  }

  export type PostResolver<T extends ITypeMap> = (
    parent: T["QueryParent"],
    args: ArgsPost,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["PostParent"] | null | Promise<T["PostParent"] | null>;

  export interface Type<T extends ITypeMap> {
    feed: (
      parent: T["QueryParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["PostParent"][] | Promise<T["PostParent"][]>;
    drafts: (
      parent: T["QueryParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["PostParent"][] | Promise<T["PostParent"][]>;
    post: (
      parent: T["QueryParent"],
      args: ArgsPost,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["PostParent"] | null | Promise<T["PostParent"] | null>;
  }
}

export namespace MutationResolvers {
  export interface ArgsCreateDraft {
    title: string;
    content: string;
  }

  export type CreateDraftResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: ArgsCreateDraft,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["PostParent"] | Promise<T["PostParent"]>;

  export interface ArgsDeletePost {
    id: string;
  }

  export type DeletePostResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: ArgsDeletePost,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["PostParent"] | null | Promise<T["PostParent"] | null>;

  export interface ArgsPublish {
    id: string;
  }

  export type PublishResolver<T extends ITypeMap> = (
    parent: T["MutationParent"],
    args: ArgsPublish,
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => T["PostParent"] | null | Promise<T["PostParent"] | null>;

  export interface Type<T extends ITypeMap> {
    createDraft: (
      parent: T["MutationParent"],
      args: ArgsCreateDraft,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["PostParent"] | Promise<T["PostParent"]>;
    deletePost: (
      parent: T["MutationParent"],
      args: ArgsDeletePost,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["PostParent"] | null | Promise<T["PostParent"] | null>;
    publish: (
      parent: T["MutationParent"],
      args: ArgsPublish,
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => T["PostParent"] | null | Promise<T["PostParent"] | null>;
  }
}

export namespace PostResolvers {
  export type IdResolver<T extends ITypeMap> = (
    parent: T["PostParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type IsPublishedResolver<T extends ITypeMap> = (
    parent: T["PostParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => boolean | Promise<boolean>;

  export type TitleResolver<T extends ITypeMap> = (
    parent: T["PostParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type ContentResolver<T extends ITypeMap> = (
    parent: T["PostParent"],
    args: {},
    ctx: T["Context"],
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export interface Type<T extends ITypeMap> {
    id: (
      parent: T["PostParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => string | Promise<string>;
    isPublished: (
      parent: T["PostParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => boolean | Promise<boolean>;
    title: (
      parent: T["PostParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => string | Promise<string>;
    content: (
      parent: T["PostParent"],
      args: {},
      ctx: T["Context"],
      info: GraphQLResolveInfo
    ) => string | Promise<string>;
  }
}

export interface IResolvers<T extends ITypeMap> {
  Query: QueryResolvers.Type<T>;
  Mutation: MutationResolvers.Type<T>;
  Post: PostResolvers.Type<T>;
}
