import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const routesEstoque = Router();
routesEstoque.get("/estoque", new ProdutoController().mostrarEstoque);
routesEstoque.get(
	"/estoque/:idProduto",
	new ProdutoController().mostrarEstoquePorProduto
);
routesEstoque.put(
	"/aumentar-estoque/:idProduto",
	new ProdutoController().aumentarEstoque
);
routesEstoque.put(
	"/diminuir-estoque/:idProduto",
	new ProdutoController().diminuirEstoque
);
export default routesEstoque;
