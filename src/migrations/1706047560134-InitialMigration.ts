import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706047560134 implements MigrationInterface {
    name = 'InitialMigration1706047560134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(30) NOT NULL, "imagemURL" character varying NOT NULL, "quantidade" character varying NOT NULL, "liveId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lives" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(30) NOT NULL, "descricao" text NOT NULL, "imagemURL" character varying NOT NULL, "inicioLive" date NOT NULL DEFAULT now(), "fimLive" date NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_6df2ea4a948eb58dd339544ee1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(120) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d7238f51194c7a77a0b0b971874" FOREIGN KEY ("liveId") REFERENCES "lives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lives" ADD CONSTRAINT "FK_70ab490d6f2d77e9d12244e98a1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lives" DROP CONSTRAINT "FK_70ab490d6f2d77e9d12244e98a1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d7238f51194c7a77a0b0b971874"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "lives"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
