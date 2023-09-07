import { Request, Response } from "express";
import { categoriaRepository } from "../repositories/categoriaRepository";

export class CategoriaController {
	async criar(req: Request, res: Response) {
		const { nome } = req.body;

		try {
			const newCategorias = categoriaRepository.create({
				nome,
			});
			await categoriaRepository.save(newCategorias);

			return res.status(201).json(newCategorias);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno" });
		}
	}

	async listar(req: Request, res: Response) {
		try {
			const categorias = await categoriaRepository.find();
			return res.json(categorias);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}

	async listarPorId(req: Request, res: Response) {
		const { idCategoria } = req.params;

		try {
			const categoria = await categoriaRepository.findOneBy({
				id: Number(idCategoria),
			});

			if (!categoria) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			return res.json(categoria);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}

	async atualizar(req: Request, res: Response) {
		const { idCategoria } = req.params;
		const { nome } = req.body;

		try {
			const categoria = await categoriaRepository.findOneBy({
				id: Number(idCategoria),
			});

			if (!categoria) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			categoria.nome = nome;

			await categoriaRepository.save(categoria);

			return res.json(categoria);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}

	async remover(req: Request, res: Response) {
		const { idCategoria } = req.params;
		try {
			const categoria = await categoriaRepository.findOneBy({
				id: Number(idCategoria),
			});

			if (!categoria) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			await categoriaRepository.remove(categoria);

			return res.status(204).json();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}
}
