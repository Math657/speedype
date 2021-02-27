<?php

namespace App\Controller;

use App\Entity\Players;
use App\Repository\PlayersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class GetAllPlayersController extends AbstractController
{
    /**
     * @Route("/all/players", name="get_all_players", methods={"GET"})
     */
    public function getAllPlayers(PlayersRepository $playerRepository): Response
    {
        return $this->json($playerRepository->findAllHighscore(), 201);
    }
}
