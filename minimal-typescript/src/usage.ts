import { Prisma } from '../generated/prisma'

// mock types
const Cat: any = null
const Master: any = null
const connection: any = null
const sequelize: any = null
const mongoose: any = null
const masterSchema: any = null
;(async () => {
  const prisma = new Prisma()

  const result = await prisma
    .cat({ id: 'cjky74byofp1n0b07ux4038oe' })
    .favBrother()

  // Prisma
  await prisma.createMaster({
    catz: {
      create: [
        {
          color: 'red',
          name: 'Bob',
        },
      ],
    },
  })

  // TypeORM
  const master = new Master()

  const cat = new Cat()
  cat.color = 'green'
  cat.name = 'Bob'

  master.catz = [cat]

  const connection = await createConnection(options)
  const masterRepository = connection.getRepository(Master)
  await masterRepository.save(master)

  // Sequelize
  await sequelize.transaction(function(t) {
    return Master.create({}, { transaction: t }).then(function(master) {
      return master.setCatz(
        [
          {
            color: 'green',
            name: 'Bob',
          },
        ],
        { transaction: t },
      )
    })
  })

  // Mongoose

  var Master = mongoose.model('Master', masterSchema)
  var master = new Master({
    catz: [
      {
        color: 'green',
        name: 'Bobx',
      },
    ],
  })
  await master.save()
})()
