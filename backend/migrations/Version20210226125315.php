<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210226125315 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE players ADD game_played INT NOT NULL, CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_264E43A6FC392E35 ON players (player_name)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_264E43A6FC392E35 ON players');
        $this->addSql('ALTER TABLE players DROP game_played, CHANGE created_at created_at DATE NOT NULL');
    }
}
