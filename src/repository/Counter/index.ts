import { database } from '@/services/firebase';

import { CounterRepository as repo } from './CounterRepository';

export const CounterRepository = new repo(database, 'counters');