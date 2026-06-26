import { CounterValidationError } from '../errors/CounterValidationError';

export class CounterName {
  private constructor(private readonly _value: string) {}

  static create(value: string): CounterName {
    const name = value.trim();

    if (!name) {
      throw new CounterValidationError('name', 'Nome do contador é obrigatório');
    }

    if (name.length > 100) {
      throw new CounterValidationError('name', 'Nome do contador não pode exceder 100 caracteres');
    }

    return new CounterName(name);
  }

  get value(): string {
    return this._value;
  }

  equals(other: CounterName): boolean {
    return this._value === other._value;
  }
}
