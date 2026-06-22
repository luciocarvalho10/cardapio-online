import { ProductValidationError } from './errors/ProductValidationError';
import {
  CreateProductProps,
  ProductPersistence,
  UpdateProductProps,
} from './types/productProps';
import { Price } from './valueObjects/Price';
import { ProductName } from './valueObjects/ProductName';

export const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600';

export class ProductEntity {
  private constructor(
    private readonly _id: string,
    private readonly _name: ProductName,
    private readonly _description: string,
    private readonly _price: Price,
    private readonly _image: string,
    private readonly _categoryId: string,
    private readonly _available: boolean,
    private readonly _showable: boolean,
  ) {}

  static create(id: string, props: CreateProductProps): ProductEntity {
    return ProductEntity.fromPersistence({
      id,
      name: props.name,
      description: props.description,
      price: props.price,
      image: props.image ?? DEFAULT_PRODUCT_IMAGE,
      categoryId: props.categoryId,
      available: props.available ?? true,
      showable: props.showable ?? true,
    });
  }

  static fromPersistence(data: ProductPersistence): ProductEntity {
    const description = data.description.trim();
    if (!description) {
      throw new ProductValidationError(
        'description',
        'Descrição é obrigatória',
      );
    }

    const categoryId = data.categoryId.trim();
    if (!categoryId) {
      throw new ProductValidationError('categoryId', 'Categoria é obrigatória');
    }

    const image = data.image.trim() || DEFAULT_PRODUCT_IMAGE;

    return new ProductEntity(
      data.id,
      ProductName.create(data.name),
      description,
      Price.create(data.price),
      image,
      categoryId,
      data.available,
      data.showable,
    );
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name.value;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price.amount;
  }

  get image(): string {
    return this._image;
  }

  get categoryId(): string {
    return this._categoryId;
  }

  get available(): boolean {
    return this._available;
  }

  get showable(): boolean {
    return this._showable;
  }

  toggleAvailability(): ProductEntity {
    return this.clone({ available: !this._available });
  }

  toggleShowable(): ProductEntity {
    return this.clone({ showable: !this._showable });
  }

  update(props: UpdateProductProps): ProductEntity {
    return ProductEntity.fromPersistence({
      id: this._id,
      name: props.name ?? this.name,
      description: props.description ?? this._description,
      price: props.price ?? this.price,
      image: props.image ?? this._image,
      categoryId: props.categoryId ?? this._categoryId,
      available: props.available ?? this._available,
      showable: props.showable ?? this._showable,
    });
  }

  isAvailableForCustomer(): boolean {
    return this._available && this._showable;
  }

  isAvailable(): boolean {
    return this._available;
  }

  belongsToCategory(categoryId: string): boolean {
    return this._categoryId === categoryId;
  }

  matchesSearch(query: string): boolean {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return true;
    }

    return (
      this.name.toLowerCase().includes(normalized) ||
      this._description.toLowerCase().includes(normalized)
    );
  }

  equals(other: ProductEntity): boolean {
    return this._id === other._id;
  }

  private clone(
    overrides: Partial<Pick<ProductPersistence, 'available' | 'showable'>>,
  ): ProductEntity {
    return new ProductEntity(
      this._id,
      this._name,
      this._description,
      this._price,
      this._image,
      this._categoryId,
      overrides.available ?? this._available,
      overrides.showable ?? this._showable,
    );
  }
}
