import { dataBaseConfig } from "../database-config";
import { Marca } from "../model/Marca";
export const marcaRepository = dataBaseConfig.getRepository(Marca);
