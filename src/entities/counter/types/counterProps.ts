import { ICounter } from '@/interfaces/ICounter';

export type CreateCounterProps = Omit<ICounter, 'id'>;

export type UpdateCounterProps = Partial<CreateCounterProps>;

export type CounterPersistence = ICounter;
