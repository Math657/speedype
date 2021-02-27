<?php

namespace App\Controller;

use App\Entity\Players;
use App\Repository\PlayersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class LoginController extends AbstractController
{
    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(ValidatorInterface $validator, Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $username = $data['user']['name'];
        $exist = $entityManager->getRepository(Players::class)->findOneBy(['player_name' => $username]);

        if ($exist) {
            $pw = $data['user']['password'];

            $match = password_verify($pw, $exist->getPassword());

            if ($match) {
                return $this->json(['message' => 'Logged!'], 200);
            } else {
                return $this->json(['message' => 'Wrong username and/or password'], 400);
            }

        dd($pw);
        // dd($user['name']);
        
        // return $this->json($data, 201);
        } else {
            return $this->json(['message' => 'Wrong username and/or password'], 400);
        }
        
    }
}