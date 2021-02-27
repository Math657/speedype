<?php

namespace App\Controller;

use App\Entity\Players;
use App\Repository\PlayersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
        $username = $data['user']['name'];
        $player = $entityManager->getRepository(Players::class)->findOneBy(['player_name' => $username]);
    }
}
