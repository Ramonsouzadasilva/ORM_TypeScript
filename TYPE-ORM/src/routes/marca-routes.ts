import { Router } from "express";
import { MarcaController } from "../controllers/MarcaController";

const routesMarca = Router();
routesMarca.post("/marcas", new MarcaController().criar);
routesMarca.get("/marcas", new MarcaController().listar);
routesMarca.get("/marcas/:idCategoria", new MarcaController().listarPorId);
routesMarca.put("/marcas/:idCategoria", new MarcaController().atualizar);
routesMarca.delete("/marcas/:idCategoria", new MarcaController().remover);
export default routesMarca;
