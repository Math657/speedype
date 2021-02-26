<?php

namespace App\Controller;

use App\Entity\Players;
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
        $data = json_decode($request->getContent(), true);
        $user = $data['user'];

        dd($data['user']['name']);
        // dd($user['name']);
        
        // return $this->json($data, 201);
    }
}
