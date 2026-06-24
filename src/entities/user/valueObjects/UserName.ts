import { UserValidationError } from '../errors/UserValidationError';

export class UserName {
  private constructor(private readonly _value: string) {}

  static create(value: string): UserName {
    const trimmed = value.trim();

    if (!trimmed) {
      throw new UserValidationError('name', 'Nome é obrigatório');
    }

    if (trimmed.length < 2) {
      throw new UserValidationError('name', 'Nome deve ter pelo menos 2 caracteres');
    }

    if (trimmed.length > 100) {
      throw new UserValidationError('name', 'Nome não pode exceder 100 caracteres');
    }

    return new UserName(trimmed);
  }

  get value(): string {
    return this._value;
  }

  equals(other: UserName): boolean {
    return this._value === other._value;
  }
}
