import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Produto } from "./Produto";

@Entity("categorias")
export class Categoria {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 50 })
	nome: string;

	@OneToMany(() => Produto, (produto) => produto.categoria)
	produtos: Produto[];
}
