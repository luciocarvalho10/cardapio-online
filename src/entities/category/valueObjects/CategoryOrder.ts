import { CategoryValidationError } from '../errors/CategoryValidationError';

export class CategoryOrder {
  private constructor(private readonly _value: number) {}

  static create(value: number): CategoryOrder {
    if (!Number.isInteger(value)) {
      throw new CategoryValidationError('order', 'Ordem deve ser um número inteiro');
    }

    if (value < 0 || value > 999) {
      throw new CategoryValidationError('order', 'Ordem deve estar entre 0 e 999');
    }

    return new CategoryOrder(value);
  }

  get value(): number {
    return this._value;
  }

  equals(other: CategoryOrder): boolean {
    return this._value === other._value;
  }
}
