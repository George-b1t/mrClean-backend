import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDataTable1611146105375 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'data',
            columns: [
                {
                    name: 'Carrinho',
                    type: 'varchar'
                }
            ]
        }));
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('data');
    };
};