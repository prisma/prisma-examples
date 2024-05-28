"use server"

import prisma from "@/lib/prisma";
import UpvoteButton from "@/components/UpvoteButton";
import Leaderboard from "@/components/Leaderboard";

export default async function Home() {

  async function getPlayers() {
    console.log(`getPlayers`)
    const players = await prisma.player.findMany();
    return players;
  }

  const players = await getPlayers();
  console.log(players);

  return (
    <main className="flex-col h-screen">
      <Leaderboard initialPlayers={players} />
      <div className="w-full flex justify-center items-center">
        {players.map((player) => {
          return <UpvoteButton player={player} key={player.id} />;
        })}
      </div>
      <p className="text-center text-gray text-xs font-light mt-4">
        ⚡️ This leaderboard is updated in real-time when a value changes in the database. Hit one of the buttons above to update the score of a player. 
      </p>
      <p className="text-center text-gray text-xs font-light mt-4">
        💡 Tip: Open the app in multiple browser windows to see the update in multiple places at once.
      </p>
    </main>
  );
}