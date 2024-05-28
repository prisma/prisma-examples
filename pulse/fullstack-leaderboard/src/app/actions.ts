"use server";
import prisma from "@/lib/prisma";

export async function addPoints({ points, playerId }: { points: number; playerId: number }) {
  console.log(`addPoints, `, points, playerId);
  const updatedPlayer = await prisma.player.update({
    where: { id: playerId },
    data: { points: { increment: points } },
  });
  console.log(`Player ${updatedPlayer.username} now has ${updatedPlayer.points}.`);
}
