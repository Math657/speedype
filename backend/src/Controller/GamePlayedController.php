<?php

namespace App\Controller;

use App\Entity\Players;
use App\Repository\PlayersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;


class GamePlayedController extends AbstractController
{
    /**
     * @Route("/gameplayed", name="game_played", methods={"POST"})
     */
    public function postGamePlayed(Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $username = $data['gameStats']['name'];
        $gameScore = $data['gameStats']['score'];
        $timezone = new \DateTimeZone('Europe/Paris');

        $player = $entityManager->getRepository(Players::class)->findOneBy(['player_name' => $username]);

        $totalGamesPlayed = $player->getGamePlayed();
        $highscore = $player->getHighscore();

        $player->setGamePlayed($totalGamesPlayed + 1);

        if ($gameScore > $highscore) {
            $player->setHighscore($gameScore);
            $player->setCreatedAt(new \DateTime('now', $timezone));

            $entityManager->flush();
            return $this->json(['message' => 'New highscore!'], 200);
        }

        else {
            $entityManager->flush();
            return $this->json(['message' => 'Game stats updated'], 200);
        }
    }
}
