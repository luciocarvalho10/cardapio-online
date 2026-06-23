import {
  CategoryPersistence,
  CreateCategoryProps,
  UpdateCategoryProps,
} from './types/categoryProps';
import { CategoryIcon, CategoryName, CategoryOrder } from './valueObjects';

export class CategoryEntity {
  private constructor(
    private readonly _id: string,
    private readonly _name: CategoryName,
    private readonly _icon: CategoryIcon,
    private readonly _order: CategoryOrder,
  ) {}

  static create(id: string, props: CreateCategoryProps): CategoryEntity {
    return CategoryEntity.fromPersistence({
      id,
      ...props,
    });
  }

  static fromPersistence(data: CategoryPersistence): CategoryEntity {
    return new CategoryEntity(
      data.id,
      CategoryName.create(data.name),
      CategoryIcon.create(data.icon),
      CategoryOrder.create(data.order),
    );
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name.value;
  }

  get icon(): string {
    return this._icon.value;
  }

  get order(): number {
    return this._order.value;
  }

  update(props: UpdateCategoryProps): CategoryEntity {
    return CategoryEntity.fromPersistence({
      id: this._id,
      name: props.name ?? this.name,
      icon: props.icon ?? this.icon,
      order: props.order ?? this.order,
    });
  }

  changePosition(newOrder: number): CategoryEntity {
    return this.update({ order: newOrder });
  }

  equals(other: CategoryEntity): boolean {
    return this._id === other._id;
  }
}
