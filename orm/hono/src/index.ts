import { Hono } from 'hono';
import { serve } from '@hono/node-server';

import type { Prisma, PrismaClient } from './generated/prisma/client.js';

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

const app = new Hono<ContextWithPrisma>();

import withPrisma from './lib/prisma.js';
import type { PostCreateInput } from './generated/prisma/models.js';

app.post('/signup', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const { name, email, posts } = await c.req.json<{
    name: string;
    email: string;
    posts: Array<PostCreateInput>;
  }>();

  const postData = posts
    ? posts.map((post: Prisma.PostCreateInput) => {
        return { title: post.title, content: post.content || undefined };
      })
    : [];

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });

  return c.json(newUser, 201);
});

app.post('/post', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const {
    title,
    content,
    authorEmail: email,
  } = await c.req.json<{
    title: string;
    content: string;
    authorEmail: string;
  }>();
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email } },
    },
  });
  return c.json(newPost, 201);
});

app.put('/post/:id/views', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  try {
    const post = await prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
    return c.json(post, 201);
  } catch {
    return c.json(
      {
        error: `Post with ID ${id} does not exist in the database`,
      },
      404,
    );
  }
});

app.put('/publish/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));
  const postToUpdate = await prisma.post.findUnique({
    where: { id },
  });

  if (!postToUpdate) {
    c.status(404);
    return c.json({
      error: `Post with ID ${id} does not exist in the database`,
    });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      published: !postToUpdate.published,
    },
  });
  return c.json(updatedPost, 201);
});

app.delete('/post/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });

    return c.json(deletedPost);
  } catch {
    return c.json(
      {
        error: `Post with ID ${id} does not exist in the database`,
      },
      404,
    );
  }
});

app.get('/users', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return c.json(users);
});

app.get('/users/:id/drafts', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));
  const drafts = await prisma.post.findMany({
    where: {
      authorId: id,
      published: false,
    },
  });
  return c.json(drafts);
});

app.get('/post/:id', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const id = Number(c.req.param('id'));
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return c.json(post);
});

app.get('/feed', withPrisma, async (c) => {
  const prisma = c.get('prisma');
  const { searchString, skip, take, orderBy } = c.req.query();
  const or = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: { published: true, ...or },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: orderBy ? [{ id: orderBy as Prisma.SortOrder }] : undefined,
  });
  return c.json(posts);
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
