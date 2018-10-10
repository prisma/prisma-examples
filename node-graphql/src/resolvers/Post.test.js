const { Post } = require('./Post')

describe('Post Resolver', () => {
  it('Should resolve Post', () => {
    const obj = {
      title: 'Prisma is Awesome',
      content: 'Sweet Content about Prisma',
      isPublished: true,
    }

    const args = {}
    const ctx = {}

    const output = Post.isPublished(obj, args, ctx)

    expect(output).toEqual(true)
  })
})
