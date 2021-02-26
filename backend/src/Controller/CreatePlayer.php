<?php

namespace App\Controller;

use App\Entity\Players;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CreatePlayer extends AbstractController
{
    /**
     * @Route("/player", name="create_player", methods={"POST"})
     */
    public function createPlayer(ValidatorInterface $validator): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $player = new Players();
        $player->setPlayerName('date?');
        $player->setScore(135);
        $players->setGamePlayed(8);

        $timezone = new \DateTimeZone('Europe/Paris');
        $player->setCreatedAt(new \DateTime('now', $timezone));

        $entityManager->persist($player);

        

        $errors = $validator->validate($player);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
        else {
            $entityManager->flush();

            return new Response('Saved new player with id '.$player->getId());
        }   
    }
}
