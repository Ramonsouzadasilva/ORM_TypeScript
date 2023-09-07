import { dataBaseConfig } from "../database-config";
import { Produto } from "../model/Produto";

export const produtoRepository = dataBaseConfig.getRepository(Produto);
