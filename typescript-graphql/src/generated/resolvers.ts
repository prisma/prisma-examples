import { GraphQLResolveInfo } from "graphql";

export interface ResolverFn<Root, Args, Ctx, Payload> {
  (root: Root, args: Args, ctx: Ctx, info: GraphQLResolveInfo):
    | Payload
    | Promise<Payload>;
}

export interface ITypes {
  Context: any;

  QueryRoot: any;
  MutationRoot: any;
  PostRoot: any;
}

export namespace IQuery {
  export type FeedResolver<T extends ITypes> = ResolverFn<
    T["QueryRoot"],
    {},
    T["Context"],
    T["PostRoot"][]
  >;

  export type DraftsResolver<T extends ITypes> = ResolverFn<
    T["QueryRoot"],
    {},
    T["Context"],
    T["PostRoot"][]
  >;

  export interface ArgsPost {
    id: string;
  }

  export type PostResolver<T extends ITypes> = ResolverFn<
    T["QueryRoot"],
    ArgsPost,
    T["Context"],
    T["PostRoot"] | null
  >;

  export interface Resolver<T extends ITypes> {
    feed: FeedResolver<T>;
    drafts: DraftsResolver<T>;
    post: PostResolver<T>;
  }
}

export namespace IMutation {
  export interface ArgsCreateDraft {
    title: string;
    content: string | null;
  }

  export type CreateDraftResolver<T extends ITypes> = ResolverFn<
    T["MutationRoot"],
    ArgsCreateDraft,
    T["Context"],
    T["PostRoot"] | null
  >;

  export interface ArgsDeletePost {
    id: string;
  }

  export type DeletePostResolver<T extends ITypes> = ResolverFn<
    T["MutationRoot"],
    ArgsDeletePost,
    T["Context"],
    T["PostRoot"] | null
  >;

  export interface ArgsPublish {
    id: string;
  }

  export type PublishResolver<T extends ITypes> = ResolverFn<
    T["MutationRoot"],
    ArgsPublish,
    T["Context"],
    T["PostRoot"] | null
  >;

  export interface Resolver<T extends ITypes> {
    createDraft: CreateDraftResolver<T>;
    deletePost: DeletePostResolver<T>;
    publish: PublishResolver<T>;
  }
}

export namespace IPost {
  export type IdResolver<T extends ITypes> = ResolverFn<
    T["PostRoot"],
    {},
    T["Context"],
    string
  >;

  export type IsPublishedResolver<T extends ITypes> = ResolverFn<
    T["PostRoot"],
    {},
    T["Context"],
    boolean
  >;

  export type TitleResolver<T extends ITypes> = ResolverFn<
    T["PostRoot"],
    {},
    T["Context"],
    string
  >;

  export type ContentResolver<T extends ITypes> = ResolverFn<
    T["PostRoot"],
    {},
    T["Context"],
    string
  >;

  export interface Resolver<T extends ITypes> {
    id: IdResolver<T>;
    isPublished: IsPublishedResolver<T>;
    title: TitleResolver<T>;
    content: ContentResolver<T>;
  }
}

export interface IResolvers<T extends ITypes> {
  Query: IQuery.Resolver<T>;
  Mutation: IMutation.Resolver<T>;
  Post: IPost.Resolver<T>;
}
