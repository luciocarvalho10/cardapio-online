import { ProductValidationError } from '../errors/ProductValidationError';

export class ProductName {
  private constructor(private readonly _value: string) {}

  static create(value: string): ProductName {
    const trimmed = value.trim();

    if (!trimmed) {
      throw new ProductValidationError('name', 'Nome é obrigatório');
    }

    return new ProductName(trimmed);
  }

  get value(): string {
    return this._value;
  }

  equals(other: ProductName): boolean {
    return this._value === other._value;
  }
}
