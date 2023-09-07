import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Produto } from "./Produto";

@Entity("marcas")
export class Marca {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 50 })
	nome: string;

	@OneToMany(() => Produto, (produto) => produto.marca)
	produtos: Produto[];
}
