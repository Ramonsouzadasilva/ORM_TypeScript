import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

const routesCategoria = Router();
routesCategoria.post("/categorias", new CategoriaController().criar);
routesCategoria.get("/categorias", new CategoriaController().listar);
routesCategoria.get(
	"/categorias/:idCategoria",
	new CategoriaController().listarPorId
);
routesCategoria.put(
	"/categorias/:idCategoria",
	new CategoriaController().atualizar
);
routesCategoria.delete(
	"/categorias/:idCategoria",
	new CategoriaController().remover
);
export default routesCategoria;
