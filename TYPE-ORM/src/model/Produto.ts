// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

@Entity("produtos")
export class Produto {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", length: 50 })
	nome: string;

	@Column({ type: "varchar", length: 100 })
	descricao: string;

	@Column({ type: "bigint" })
	quantidade: number;

	@Column({ type: "numeric", precision: 6, scale: 2 })
	valor: number;

	@ManyToOne(() => Categoria, (categoria) => categoria.produtos)
	@JoinColumn({ name: "categoria_id" })
	categoria: Categoria;

	@ManyToOne(() => Marca, (marca) => marca.produtos)
	@JoinColumn({ name: "marca_id" })
	marca: Marca;
}
