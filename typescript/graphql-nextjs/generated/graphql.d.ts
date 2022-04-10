
declare module '*/create.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateDraftMutation: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/drafts.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Drafts: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/index.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Feed: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/[id].tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const PostQuery: DocumentNode;
export const PublishMutation: DocumentNode;
export const DeleteMutation: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/signup.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SignupMutation: DocumentNode;

  export default defaultDocument;
}
    