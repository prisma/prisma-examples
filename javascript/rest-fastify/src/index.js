const fastify = require("fastify");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = fastify({ logger: true });

app.register(require("fastify-formbody"));

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.send(result);
});

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  });
  res.send(result);
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: { published: true },
  });
  res.send(post);
});

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(post);
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findOne({
    where: {
      id: parseInt(id),
    },
  });
  res.send(post);
});

app.get("/feed", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  res.send(posts);
});

app.get("/filterPosts", async (req, res) => {
  const { searchString } = req.query;
  const draftPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  });
  res.send(draftPosts);
});

const server = app.listen(3000, () =>
  console.log(
    "🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-fastify#using-the-rest-api"
  )
);
