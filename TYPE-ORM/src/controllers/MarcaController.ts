import { Request, Response } from "express";
import { marcaRepository } from "../repositories/marcaRepository";

export class MarcaController {
	async criar(req: Request, res: Response) {
		const { nome } = req.body;

		try {
			const newMarca = marcaRepository.create({
				nome,
			});
			await marcaRepository.save(newMarca);

			return res.status(201).json(newMarca);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno" });
		}
	}

	async listar(req: Request, res: Response) {
		try {
			const marcas = await marcaRepository.find();
			return res.json(marcas);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}

	async listarPorId(req: Request, res: Response) {
		const { idMarca } = req.params;

		try {
			const marca = await marcaRepository.findOneBy({
				id: Number(idMarca),
			});

			if (!marca) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			return res.json(marca);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}

	async atualizar(req: Request, res: Response) {
		const { idMarca } = req.params;
		const { nome } = req.body;

		try {
			const marca = await marcaRepository.findOneBy({
				id: Number(idMarca),
			});

			if (!marca) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			marca.nome = nome;

			await marcaRepository.save(marca);

			return res.json(marca);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}

	async remover(req: Request, res: Response) {
		const { idMarca } = req.params;
		try {
			const marca = await marcaRepository.findOneBy({
				id: Number(idMarca),
			});

			if (!marca) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			await marcaRepository.remove(marca);

			return res.status(204).json();
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno do Servidor" });
		}
	}
}
