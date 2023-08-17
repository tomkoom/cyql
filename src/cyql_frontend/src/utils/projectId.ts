// nanoid https://github.com/ai/nanoid
import { customAlphabet } from "nanoid";

const alphabet = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const numbers = "0123456789";
export const nanoid = customAlphabet(alphabet + numbers, 12);