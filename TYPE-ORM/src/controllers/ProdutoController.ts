import { Request, Response } from "express";

import { produtoRepository } from "../repositories/produtoRepository";
import { categoriaRepository } from "../repositories/categoriaRepository";
import { marcaRepository } from "../repositories/marcaRepository";

export class ProdutoController {
	async criar(req: Request, res: Response) {
		const {
			nome,
			quantidade,
			descricao,
			valor,
			categoria: categoriaid,
			marca: marcaid,
		} = req.body;

		const categoria = await categoriaRepository.findOneBy({
			id: Number(categoriaid),
		});

		const marca = await marcaRepository.findOneBy({
			id: Number(marcaid),
		});

		try {
			if (!categoria || !marca) {
				return res
					.status(404)
					.json({ message: "Categoria ou Marca não encontrada" });
			}
			const newProduto = produtoRepository.create({
				nome,
				marca,
				descricao,
				quantidade,
				valor,
				categoria,
			});
			await produtoRepository.save(newProduto);

			return res.status(201).json({ message: "Produto criado com sucesso" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro interno ao criar produto" });
		}
	}

	async listar(req: Request, res: Response) {
		try {
			const produtos = await produtoRepository.find({
				relations: {
					categoria: true,
					marca: true,
				},
			});
			return res.json({ produtos });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao tentar listar produtos" });
		}
	}

	async listarPorId(req: Request, res: Response) {
		const { idProduto } = req.params;

		try {
			const produto = await produtoRepository.findOne({
				where: { id: Number(idProduto) },
				relations: ["categoria", "marca"],
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			return res.json({
				produto,
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao tentar listar um produto" });
		}
	}

	async atualizar(req: Request, res: Response) {
		const { idProduto } = req.params;
		const { nome, marca, descricao, quantidade, valor, categoria } = req.body;

		try {
			const produto = await produtoRepository.findOneBy({
				id: Number(idProduto),
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado." });
			}

			produto.nome = nome;
			produto.marca = marca;
			produto.descricao = descricao;
			produto.quantidade = quantidade;
			produto.valor = valor;
			produto.categoria = categoria;

			await produtoRepository.save(produto);

			return res.json({
				produto,
				message: "Produto atualizado com sucesso.",
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao tentar alterar um produto" });
		}
	}

	async remover(req: Request, res: Response) {
		const { idProduto } = req.params;
		try {
			const produto = await produtoRepository.findOneBy({
				id: Number(idProduto),
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado." });
			}

			await produtoRepository.remove(produto);

			return res.status(204).json({ message: "Produto removido com sucesso" });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao tentar remover um produto" });
		}
	}

	async mostrarEstoque(req: Request, res: Response) {
		try {
			const produtos = await produtoRepository.find();
			const quantidadeProdutos = produtos.length;
			const quantidadeTotal = produtos.reduce(
				(total, produto) => total + produto.quantidade,
				0
			);

			let mensagem = "Não há produtos em estoque.";
			if (quantidadeProdutos === 1) {
				mensagem = `Há 1 produto cadastrado com um total de ${quantidadeTotal} unidades em estoque.`;
			} else if (quantidadeProdutos > 1) {
				mensagem = `Há ${quantidadeProdutos} produtos cadastrados com um total de ${quantidadeTotal} unidades em estoque.`;
			}

			return res.json({ message: mensagem });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao obter a mensagem de estoque" });
		}
	}

	async mostrarEstoquePorProduto(req: Request, res: Response) {
		try {
			const { idProduto } = req.params;
			const produto = await produtoRepository.findOne({
				where: { id: Number(idProduto) },
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			const mensagem = `O produto ${produto.nome} possui ${produto.quantidade} unidades em estoque.`;

			return res.json({ mensagem });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao obter o estoque do produto" });
		}
	}

	//aumentar e diminuir
	async aumentarEstoque(req: Request, res: Response) {
		try {
			const { idProduto } = req.params;
			const { quantidade } = req.body;
			const produto = await produtoRepository.findOne({
				where: { id: Number(idProduto) },
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado" });
			} else if (isNaN(Number(quantidade))) {
				return res.status(400).json({ message: "Quantidade inválida" });
			}

			produto.quantidade += Number(quantidade);
			await produtoRepository.save(produto);

			return res.json({ produto });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao aumentar a quantidade em estoque" });
		}
	}

	async diminuirEstoque(req: Request, res: Response) {
		try {
			const { idProduto } = req.params;
			const { quantidade } = req.body;

			const produto = await produtoRepository.findOne({
				where: { id: Number(idProduto) },
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado" });
			} else if (isNaN(Number(quantidade)) || produto.quantidade < quantidade) {
				return res.status(400).json({ message: "Quantidade inválida" });
			}

			produto.quantidade -= Number(quantidade);
			await produtoRepository.save(produto);

			return res.json({ produto });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao diminuir a quantidade em estoque" });
		}
	}

	async calcularTotalInventario(req: Request, res: Response) {
		try {
			const produtos = await produtoRepository.find();

			let totalInventario = 0;
			produtos.forEach((produto) => {
				totalInventario += produto.valor * produto.quantidade;
			});
			totalInventario = parseFloat(totalInventario.toFixed(2));
			return res.json({ totalInventario });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao calcular o inventário total" });
		}
	}

	async calcularInventarioProduto(req: Request, res: Response) {
		try {
			const { idProduto } = req.params;
			const produto = await produtoRepository.findOne({
				where: { id: Number(idProduto) },
			});

			if (!produto) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			const inventario = Number(
				(produto.valor * produto.quantidade).toFixed(3)
			);

			return res.json({ inventario });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao obter o inventário do produto" });
		}
	}

	async checarNivelEstoque(req: Request, res: Response) {
		try {
			const produtos = await produtoRepository.find();

			const nivelDeEstoque = produtos.map((produto) => {
				let level = "";
				if (produto.quantidade < 20) {
					level = "Repor imediatamente";
				} else if (produto.quantidade < 50) {
					level = "Repor em breve";
				} else {
					level = "Estoque adequado";
				}

				return {
					produto: produto.nome,
					nivel: level,
				};
			});

			return res.json({ nivelDeEstoque });
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Erro interno ao verificar o nível de estoque" });
		}
	}
}
