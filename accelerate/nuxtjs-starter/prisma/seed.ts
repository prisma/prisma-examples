import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.time("Seeding complete 🌱");

  await prisma.quotes.createMany({
    skipDuplicates: true,
    data: [
      { quote: "The only way to do great work is to love what you do." },
      {
        quote:
          "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      },
      { quote: "In the middle of every difficulty lies opportunity." },
      { quote: "Believe you can and you're halfway there." },
      { quote: "The best way to predict the future is to create it." },
      { quote: "Don't watch the clock; do what it does. Keep going." },
      { quote: "The only thing we have to fear is fear itself." },
      { quote: "The journey of a thousand miles begins with a single step." },
      { quote: "If you can dream it, you can achieve it." },
      { quote: "Innovation distinguishes between a leader and a follower." },
      {
        quote:
          "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      },
      { quote: "You miss 100% of the shots you don't take." },
      {
        quote:
          "The only limit to our realization of tomorrow will be our doubts of today.",
      },
      { quote: "Change your thoughts and you change your world." },
      {
        quote:
          "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
      },
      {
        quote:
          "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
      },
      { quote: "Life is 10% what happens to us and 90% how we react to it." },
      {
        quote:
          "The future belongs to those who believe in the beauty of their dreams.",
      },
      {
        quote:
          "Do not wait for the perfect moment, take the moment and make it perfect.",
      },
      { quote: "The only source of knowledge is experience." },
    ],
  });

  console.timeEnd("Seeding complete 🌱");
};

main()
  .then(() => {
    console.log("Process completed");
  })
  .catch((e) => console.log(e));
