import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);
export const basename = resolve(__dirname, "../");
