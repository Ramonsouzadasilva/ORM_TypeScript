import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const routesProduto = Router();
routesProduto.post("/produtos", new ProdutoController().criar);
routesProduto.get("/produtos", new ProdutoController().listar);
routesProduto.get("/produtos/:idProduto", new ProdutoController().listarPorId);
routesProduto.put("/produtos/:idProduto", new ProdutoController().atualizar);
routesProduto.delete("/produtos/:idProduto", new ProdutoController().remover);
export default routesProduto;
