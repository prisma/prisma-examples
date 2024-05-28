"use client";

import { addPoints } from "@/app/actions";
import { Player } from "@prisma/client";

export default function UpvoteButton({ player }: { player: Player }) {
  return (
      <button
        className="m-6 bg-indigo600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo800 hover:scale-105"
        onClick={() => {
          console.log(`button pressed`, player.id, player.username);
          addPoints({ points: 5, playerId: player.id });
        }}
      >
        ⬆ {' ' + player.username}
      </button>
  );
}
