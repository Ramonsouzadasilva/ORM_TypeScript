import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const routesInventario = Router();
routesInventario.get(
	"/inventario",
	new ProdutoController().calcularTotalInventario
);
routesInventario.get(
	"/inventario/:idProduto",
	new ProdutoController().calcularInventarioProduto
);
routesInventario.get("/verificar", new ProdutoController().checarNivelEstoque);
export default routesInventario;
