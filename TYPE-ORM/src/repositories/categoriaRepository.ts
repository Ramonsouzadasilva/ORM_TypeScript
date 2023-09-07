import { dataBaseConfig } from "../database-config";
import { Categoria } from "../model/Categoria";
export const categoriaRepository = dataBaseConfig.getRepository(Categoria);
