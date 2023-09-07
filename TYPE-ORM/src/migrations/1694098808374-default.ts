import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694098808374 implements MigrationInterface {
    name = 'Default1694098808374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "marcas" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, CONSTRAINT "PK_0dabf9ed9a15bfb634cb675f7d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, "descricao" character varying(100) NOT NULL, "quantidade" bigint NOT NULL, "valor" numeric(6,2) NOT NULL, "categoria_id" integer, "marca_id" integer, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(50) NOT NULL, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_820ea8c002d8903afac71bb9d48" FOREIGN KEY ("marca_id") REFERENCES "marcas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_820ea8c002d8903afac71bb9d48"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_330ac6c492cb0bbcce953f3d9eb"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "marcas"`);
    }

}
