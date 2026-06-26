import {
  CounterPersistence,
  CreateCounterProps,
  UpdateCounterProps,
} from './types/counterProps';
import { CounterName } from './valueObjects/CounterName';
import { CounterValue } from './valueObjects/CounterValue';

export class CounterEntity {
  private constructor(
    private readonly _id: string,
    private readonly _name: CounterName,
    private readonly _value: CounterValue,
  ) {}

  static create(id: string, props: CreateCounterProps): CounterEntity {
    return CounterEntity.fromPersistence({ id, ...props });
  }

  static fromPersistence(data: CounterPersistence): CounterEntity {
    return new CounterEntity(
      data.id,
      CounterName.create(data.name),
      CounterValue.create(data.value),
    );
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name.value;
  }

  get value(): number {
    return this._value.value;
  }

  update(props: UpdateCounterProps): CounterEntity {
    return CounterEntity.fromPersistence({
      id: this._id,
      name: props.name ?? this.name,
      value: props.value ?? this.value,
    });
  }

  equals(other: CounterEntity): boolean {
    return this._id === other._id;
  }
}
