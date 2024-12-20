const { mockDeep, mockReset } = require("jest-mock-extended")

const { prisma }  = require("./client")

jest.mock("./client", () => ({
  prisma: mockDeep()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

const prismaMock = prisma

module.exports = {
    prismaMock
}