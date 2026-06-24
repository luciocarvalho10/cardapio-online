import { UserValidationError } from '../errors/UserValidationError';

export class UserPassword {
  private constructor(private readonly _value: string) {}

  static create(value: string): UserPassword {
    if (!value || !value.trim()) {
      throw new UserValidationError('password', 'Senha é obrigatória');
    }

    if (value.length < 6) {
      throw new UserValidationError('password', 'Senha deve ter no mínimo 6 caracteres');
    }

    return new UserPassword(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: UserPassword): boolean {
    return this._value === other._value;
  }
}
