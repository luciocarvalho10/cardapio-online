import { database } from "@/services/firebase";

import { CategoryRepository as repo } from "./CategoryRepository";

export const CategoryRepository = new repo(database, 'categories');