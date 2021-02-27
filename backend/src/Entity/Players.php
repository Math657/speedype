<?php

namespace App\Entity;

use App\Repository\PlayersRepository;
use Doctrine\ORM\Mapping as ORM;
// use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=PlayersRepository::class)
 * @UniqueEntity("id")
 * @UniqueEntity("player_name")
 */
class Players
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=40, unique=true)
     */
    private $player_name;

    /**
     * @ORM\Column(type="integer")
     */
    private $highscore;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @ORM\Column(type="integer")
     */
    private $game_played;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayerName(): ?string
    {
        return $this->player_name;
    }

    public function setPlayerName(string $player_name): self
    {
        $this->player_name = $player_name;

        return $this;
    }

    public function getHighscore(): ?int
    {
        return $this->highscore;
    }

    public function setHighscore(int $highscore): self
    {
        $this->highscore = $highscore;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getGamePlayed(): ?int
    {
        return $this->game_played;
    }

    public function setGamePlayed(int $game_played): self
    {
        $this->game_played = $game_played;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
}
