import { CategoryValidationError } from '../errors/CategoryValidationError';

export class CategoryIcon {
  private constructor(private readonly _value: string) {}

  static create(value: string): CategoryIcon {
    const trimmed = value.trim();

    if (!trimmed) {
      throw new CategoryValidationError('icon', 'Ícone da categoria é obrigatório');
    }

    if (trimmed.length > 100) {
      throw new CategoryValidationError('icon', 'Ícone não pode exceder 100 caracteres');
    }

    return new CategoryIcon(trimmed);
  }

  get value(): string {
    return this._value;
  }

  equals(other: CategoryIcon): boolean {
    return this._value === other._value;
  }
}
