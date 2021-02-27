<?php

namespace App\Controller;

use App\Entity\Players;
use App\Repository\PlayersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class GetOnePlayerController extends AbstractController
{
    /**
     * @Route("/player/{player_name}", name="get_one_player", methods={"GET"})
     */
    public function getOnePlayer(string $player_name, PlayersRepository $playerRepository): Response
    {
        return $this->json($playerRepository->findOneBy(['player_name' => $player_name]), 201);
    }
}
