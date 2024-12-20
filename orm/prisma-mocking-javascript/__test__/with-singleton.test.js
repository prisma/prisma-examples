const { createUser, updateUsername, getAllUsers, getUsersAndCount, getPostsByUser } =  require('../functions-without-context')
const { prismaMock } = require('../singleton')

test('should create new user ', async () => {
  const user = {
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  })
})

test('should update a users name ', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(updateUsername(user)).resolves.toEqual({
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true,
  })
})

test('should fail if user does not accept terms', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: false,
  }

  prismaMock.user.create.mockImplementation()

  await expect(createUser(user)).resolves.toEqual(
    new Error('User must accept terms!')
  )
})

test('should retrieve all the users from the database', async () => {

  const dummyUsers = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johnDoe@gmail.com",
      paidUser: false
    }
  ]

  prismaMock.user.findMany.mockResolvedValue(dummyUsers)
  await expect(getAllUsers()).resolves.toEqual(dummyUsers)

})

test('mocks sequential Prisma operation inside a transaction', async () => {
  // Mocked data
  const mockedPostsData = [{ id: 1, title: 'Post with prisma' }];
  const mockedCount = 1;

  prismaMock.$transaction.mockResolvedValueOnce([
    mockedPostsData, // Mocking the first operation
    mockedCount // Mocking the second operation
  ]);

  // Invoke the function
  const result = await getUsersAndCount();


  // Assertions to validate the result
  expect(result.posts).toEqual(mockedPostsData);
  expect(result.totalPosts).toEqual(mockedCount);
});

test('should return all posts by a specific user', async () => {
  const email = 'alice@prisma.io';

  const posts = [
    { id: 1, title: 'First Post', content: 'Content of the first post' },
    { id: 2, title: 'Second Post', content: 'Content of the second post' },
  ];


  prismaMock.user.findUniqueOrThrow.mockReturnValue({
    posts: jest.fn().mockResolvedValue(posts),
  });

  const result = await getPostsByUser(email);

  expect(result).toEqual(posts);
});

