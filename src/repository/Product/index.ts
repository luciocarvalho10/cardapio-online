import { database } from '@/services/firebase';

import { ProductRepository as repo } from './ProductRepository';

export const ProductRepository = new repo(database, 'products');
