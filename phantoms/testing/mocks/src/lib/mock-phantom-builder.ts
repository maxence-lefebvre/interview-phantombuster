import { generateMock } from '@anatine/zod-mock';
import { PartialDeep } from 'type-fest';

import { IPhantom, zPhantom } from '@phantombuster/phantoms/types';

export type DefaultMockPhantom = IPhantom;

export class MockPhantomBuilder<
  TPhantom extends IPhantom = DefaultMockPhantom,
> {
  private readonly properties: TPhantom;

  public static new<TPhantom extends IPhantom = DefaultMockPhantom>(
    initialValues?: PartialDeep<TPhantom>,
  ): MockPhantomBuilder<TPhantom> {
    return new MockPhantomBuilder(initialValues);
  }

  public with<TProperty extends keyof TPhantom>(
    property: TProperty,
    value: TPhantom[TProperty],
  ): MockPhantomBuilder<TPhantom> {
    this.properties[property] = value;
    return this;
  }

  public build(): TPhantom {
    return this.properties;
  }

  private constructor(initialValues?: PartialDeep<TPhantom>) {
    this.properties = {
      ...generateMock(zPhantom),
      ...initialValues,
    } as TPhantom;
  }
}
