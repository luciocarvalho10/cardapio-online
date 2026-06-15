import { database } from '@/services/firebase';

import { UserRepository as repo } from './UserRepository';

export const UserRepository = new repo(database, 'users');
