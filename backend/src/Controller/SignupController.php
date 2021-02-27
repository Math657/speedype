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
class SignupController extends AbstractController
{
    /**
     * @Route("/signup", name="signup", methods={"POST"})
     */
    public function signup(ValidatorInterface $validator, Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $data = json_decode($request->getContent(), true);
        $username = $data['user']['name'];

        $exist = $entityManager->getRepository(Players::class)->findOneBy(['player_name' => $username]);

        if (!$exist) {
            $options = [
                'cost' => 12,
            ];
            
            $pw = $data['user']['password'];
            $pw = password_hash($pw, PASSWORD_BCRYPT, $options);
    
            $player = new Players();
            $player->setPlayerName($data['user']['name']);
            $player->setPassword($pw);
            $player->setHighscore(0);
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
        } else {
            return $this->json(['message' => 'This name already exist'], 400);
            // return new Response(('This name already exist'), 400);
        }

        
        
        
    }
}
