import { CounterValidationError } from '../errors/CounterValidationError';

export class CounterValue {
  private constructor(private readonly _value: number) {}

  static create(value: number): CounterValue {
    if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value)) {
      throw new CounterValidationError('value', 'Valor do contador deve ser um número inteiro maior ou igual a zero');
    }

    return new CounterValue(value);
  }

  get value(): number {
    return this._value;
  }

  equals(other: CounterValue): boolean {
    return this._value === other._value;
  }
}
