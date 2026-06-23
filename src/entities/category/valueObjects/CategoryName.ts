import { CategoryValidationError } from '../errors/CategoryValidationError';

export class CategoryName {
  private constructor(private readonly _value: string) {}

  static create(value: string): CategoryName {
    const trimmed = value.trim();

    if (!trimmed) {
      throw new CategoryValidationError('name', 'Nome da categoria é obrigatório');
    }

    if (trimmed.length < 2) {
      throw new CategoryValidationError('name', 'Nome deve ter pelo menos 2 caracteres');
    }

    if (trimmed.length > 50) {
      throw new CategoryValidationError('name', 'Nome não pode exceder 50 caracteres');
    }

    return new CategoryName(trimmed);
  }

  get value(): string {
    return this._value;
  }

  equals(other: CategoryName): boolean {
    return this._value === other._value;
  }
}
