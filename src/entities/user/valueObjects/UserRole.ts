import { UserValidationError } from '../errors/UserValidationError';

export type UserRoleType = 'admin' | 'gerente' | 'atendente' | 'usuario';

const VALID_ROLES: UserRoleType[] = ['admin', 'gerente', 'atendente', 'usuario'];

export class UserRole {
  private constructor(private readonly _value: UserRoleType) {}

  static create(value: string): UserRole {
    const trimmed = value.trim().toLowerCase() as UserRoleType;

    if (!trimmed) {
      throw new UserValidationError('role', 'Role é obrigatório');
    }

    if (!VALID_ROLES.includes(trimmed)) {
      throw new UserValidationError(
        'role',
        `Role inválido. Valores válidos: ${VALID_ROLES.join(', ')}`,
      );
    }

    return new UserRole(trimmed);
  }

  get value(): UserRoleType {
    return this._value;
  }

  isAdmin(): boolean {
    return this._value === 'admin';
  }

  hasRole(requiredRole: UserRoleType): boolean {
    return this._value === requiredRole;
  }

  equals(other: UserRole): boolean {
    return this._value === other._value;
  }
}
