import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";

type PlayersProps = Array<{
  id: string;
  score: number;
  roundScore: number;
  isHand: boolean;
  lastBet: boolean;
  lastEnvido: boolean;
  envidoScore: number;
  user: string;
}>;

type CardsProps = Array<{
  id: string;
  suit: string;
  number: number;
  value: number;
  available: boolean;
}>;

export async function handler() {
  try {
    const gameStateProps = z.object({
      bet: z.number(),
      round: z.number(),
    });

    if ((await prisma.gameState.count()) == 0) {
      await prisma.gameState.create({
        data: {
          bet: 0,
          round: 0,
        },
      });
    }
    const gameState = await prisma.gameState.findFirst();
    const { bet, round } = gameStateProps.parse(gameState);

    //sorts so that winning player comes first
    const players: PlayersProps = await prisma.player.findMany({
      orderBy: [{ roundScore: "desc" }, { isHand: "desc" }],
    });

    //If game already started
    if (round > 0) {
      //determine round winner
      console.log(players);
      const winningPlayer = players[0];
      const losingPlayer = players[1];

      console.log(winningPlayer);

      //give round points to winner
      //sets hand for next round
      console.log(`//give ${bet} points to ${winningPlayer.user}`);
      await prisma.player.update({
        data: {
          score: bet + winningPlayer.score,
          isHand: true,
          roundScore: 0,
        },
        where: {
          id: winningPlayer.id,
        },
      });
      await prisma.player.update({
        data: {
          isHand: false,
          roundScore: 0,
        },
        where: {
          id: losingPlayer.id,
        },
      });
    }

    //set environment for new round
    console.log("//set environment for new round");
    await prisma.playerCards.deleteMany();
    await prisma.gameState.updateMany({
      data: {
        round: 0,
      },
    });
    await prisma.cardsPlayed.deleteMany();
    await prisma.cards.updateMany({
      data: {
        available: true,
      },
    });

    //fetch new card hand to the players
    const cardsResponse: CardsProps = await prisma.$queryRaw`
        SELECT * 
        FROM cards
        WHERE cards.available == true
        ORDER BY random()
        LIMIT 6;
    `;

    if (cardsResponse.length > 0) {
      cardsResponse.map(async (card, i) => {
        //gives cards to player
        if (i < 3) {
          await prisma.playerCards.create({
            data: {
              player_id: players[0].id,
              card_id: card.id,
            },
          });
        } else {
          await prisma.playerCards.create({
            data: {
              player_id: players[1].id,
              card_id: card.id,
            },
          });
        }

        //sets cards unavailable in deck
        await prisma.cards.update({
          where: {
            id: card.id,
          },
          data: {
            available: false,
          },
        });
      });
    }

    return {
      statusCode: 200,
      header: {
        "Content-Type": "application/json",
      },
      body: "newHand",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
