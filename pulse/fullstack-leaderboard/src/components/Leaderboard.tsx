"use client";

import { Player } from "@prisma/client";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, MutableRefObject, useRef } from "react";
import FlipMove from "react-flip-move";

interface UpdateEventType {
  after: Player;
}

export default function Leaderboard({ initialPlayers }: { initialPlayers: Player[] }) {
  const [players, setPlayers] = useState(initialPlayers || []);
  const [updatedPlayerId, setUpdatedPlayerId] = useState<number | null>(null);

  let socketRef: MutableRefObject<Socket | null> = useRef(null);

  useEffect(() => {
    const updatePoints = (updatedPlayer: Player) => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        )
      );
      setUpdatedPlayerId(updatedPlayer.id);
      setTimeout(() => setUpdatedPlayerId(null), 1000); // Reset updated player ID after 1 second
    };

    const url = process.env.SERVER_URL ?? `http://localhost:3001`;
    socketRef.current = io(url);

    // An update to a player's points
    socketRef.current.on("player_points", (event: UpdateEventType) => {
      console.log(`received UPDATE event from server`, event);
      updatePoints(event.after);
    });

    return () => {
      socketRef.current?.off("player_points");
    };
  }, [players]);

  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="w-full p-4">
      <p className="text-center text-gray text-xl font-semibold mb-4">
        🏆 Welcome to the Real-Time Leaderboard 🏆
      </p>
      <FlipMove>
        {sortedPlayers.map((player, i) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-2 mb-2 rounded-md shadow-md relative ${
              updatedPlayerId === player.id ? 'blink' : 'bg-white'
            }`}
          >
            <div className="text-lg font-semibold text-gray-800">
              {i === 0 ? `${player.username} 🥇` : player.username}
            </div>
            <div className="text-lg font-semibold text-gray-600">
              {player.points}
            </div>
          </div>
        ))}
      </FlipMove>
    </div>
  );
}
