import prisma from '@/lib/db'
import { QuoteKind } from '@/lib/prisma-enums'

const main = async () => {
  console.log('Seeding database...')
  console.time('Seeding complete 🌱')

  await prisma.quotes.deleteMany()

  await prisma.quotes.createMany({
    skipDuplicates: true,
    data: [
      {
        quote: 'The only way to do great work is to love what you do.',
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          'Success is not final, failure is not fatal: It is the courage to continue that counts.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'In the middle of every difficulty lies opportunity.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: "Believe you can and you're halfway there.",
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'The best way to predict the future is to create it.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: "Don't watch the clock; do what it does. Keep going.",
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'The only thing we have to fear is fear itself.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'The journey of a thousand miles begins with a single step.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'If you can dream it, you can achieve it.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'Innovation distinguishes between a leader and a follower.',
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: "You miss 100% of the shots you don't take.",
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          'The only limit to our realization of tomorrow will be our doubts of today.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'Change your thoughts and you change your world.',
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'Life is 10% what happens to us and 90% how we react to it.',
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          'The future belongs to those who believe in the beauty of their dreams.',
        kind: QuoteKind.Opinion,
      },
      {
        quote:
          'Do not wait for the perfect moment, take the moment and make it perfect.',
        kind: QuoteKind.Opinion,
      },
      {
        quote: 'The only source of knowledge is experience.',
        kind: QuoteKind.Opinion,
      },

      // Facts
      {
        quote: 'Honey never spoils and can last thousands of years.',
        kind: QuoteKind.Fact,
      },
      {
        quote: 'Bananas are berries, but strawberries are not.',
        kind: QuoteKind.Fact,
      },
      { quote: 'Octopuses have three hearts.', kind: QuoteKind.Fact },
      {
        quote: "A group of flamingos is called a 'flamboyance'.",
        kind: QuoteKind.Fact,
      },
      {
        quote: 'Humans share 60% of their DNA with bananas.',
        kind: QuoteKind.Fact,
      },
      {
        quote: 'The Eiffel Tower can be 15 cm taller during hot days.',
        kind: QuoteKind.Fact,
      },
      { quote: 'Wombat poop is cube-shaped.', kind: QuoteKind.Fact },
      {
        quote:
          'Some metals are so reactive that they explode on contact with water.',
        kind: QuoteKind.Fact,
      },
      {
        quote:
          'There are more stars in the universe than grains of sand on Earth.',
        kind: QuoteKind.Fact,
      },
      {
        quote: 'Venus is the only planet that spins clockwise.',
        kind: QuoteKind.Fact,
      },
    ],
  })

  console.timeEnd('Seeding complete 🌱')
}

main()
  .then(() => {
    console.log('Process completed')
  })
  .catch((e) => console.log(e))
