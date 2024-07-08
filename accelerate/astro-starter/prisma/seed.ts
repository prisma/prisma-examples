import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  console.log('Seeding database 🌱')
  console.time('Seeding complete 🌱')

  await prisma.quote.createMany({
    skipDuplicates: true,
    data: [
      { text: 'The only way to do great work is to love what you do.' },
      {
        text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
      },
      { text: 'In the middle of every difficulty lies opportunity.' },
      { text: "Believe you can and you're halfway there." },
      { text: 'The best way to predict the future is to create it.' },
      { text: "Don't watch the clock; do what it does. Keep going." },
      { text: 'The only thing we have to fear is fear itself.' },
      { text: 'The journey of a thousand miles begins with a single step.' },
      { text: 'If you can dream it, you can achieve it.' },
      { text: 'Innovation distinguishes between a leader and a follower.' },
      {
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
      },
      { text: "You miss 100% of the shots you don't take." },
      {
        text: 'The only limit to our realization of tomorrow will be our doubts of today.',
      },
      { text: 'Change your thoughts and you change your world.' },
      {
        text: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
      },
      {
        text: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
      },
      { text: 'Life is 10% what happens to us and 90% how we react to it.' },
      {
        text: 'The future belongs to those who believe in the beauty of their dreams.',
      },
      {
        text: 'Do not wait for the perfect moment, take the moment and make it perfect.',
      },
      { text: 'The only source of knowledge is experience.' },
    ],
  })

  console.timeEnd('Seeding complete 🌱')
}

main()
  .then(() => {
    console.log('Process completed')
  })
  .catch((e) => console.log(e))
