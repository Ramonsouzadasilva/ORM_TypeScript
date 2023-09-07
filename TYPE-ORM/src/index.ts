import express from "express";
import routesCategoria from "../src/routes/categoria-routes";
import routesEstoque from "../src/routes/estoque-routes";
import routesProduto from "./routes/produto-routes";
import routesInventario from "./routes/inventario-routes";
import { dataBaseConfig } from "./database-config";
import routesMarca from "./routes/marca-routes";

dataBaseConfig.initialize().then(() => {
	const app = express();

	app.use(express.json());

	app.use(routesEstoque);
	app.use(routesCategoria);
	app.use(routesMarca);
	app.use(routesProduto);
	app.use(routesInventario);

	return app.listen(process.env.PORT);
});
