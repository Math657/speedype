<?php

namespace App\Controller;

use App\Entity\Players;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
class SignupController extends AbstractController
{
    /**
     * @Route("/signup", name="signup", methods={"POST"})
     */
    public function signup(ValidatorInterface $validator, Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $user = $data['user'];
        $pw = $data['user']['password'];

        $options = [
            'cost' => 12,
        ];

        dd(password_hash($pw, PASSWORD_BCRYPT, $options));

        $player = new Players();
        $player->setPlayerName($data['user']['name']);
        $player->setScore(111);
        $player->setGamePlayed(0);

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
