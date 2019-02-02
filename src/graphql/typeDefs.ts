import * as path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "./**/*.graphql"));
const typesDefs = mergeTypes(typesArray);

export default typesDefs;
