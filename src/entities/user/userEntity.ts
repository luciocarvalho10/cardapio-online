import {
  CreateUserProps,
  UpdateUserProps,
  UserPersistence,
} from './types/userProps';
import { UserName, UserPassword, UserRole, UserRoleType } from './valueObjects';

export class UserEntity {
  private constructor(
    private readonly _id: string,
    private readonly _name: UserName,
    private readonly _password: UserPassword,
    private readonly _role: UserRole,
  ) {}

  static create(id: string, props: CreateUserProps): UserEntity {
    return UserEntity.fromPersistence({
      id,
      ...props,
    });
  }

  static fromPersistence(data: UserPersistence): UserEntity {
    return new UserEntity(
      data.id,
      UserName.create(data.name),
      UserPassword.create(data.password),
      UserRole.create(data.role),
    );
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name.value;
  }

  get password(): string {
    return this._password.value;
  }

  get role(): UserRoleType {
    return this._role.value;
  }

  changePassword(newPassword: string): UserEntity {
    return this.update({ password: newPassword });
  }

  isAdmin(): boolean {
    return this._role.isAdmin();
  }

  hasRole(requiredRole: UserRoleType): boolean {
    return this._role.hasRole(requiredRole);
  }

  update(props: UpdateUserProps): UserEntity {
    return UserEntity.fromPersistence({
      id: this._id,
      name: props.name ?? this.name,
      password: props.password ?? this.password,
      role: props.role ?? this.role,
    });
  }

  equals(other: UserEntity): boolean {
    return this._id === other._id;
  }
}
