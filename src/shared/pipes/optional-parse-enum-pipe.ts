import { ParseEnumPipe } from "@nestjs/common";

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  // @ts-expect-error
  override async transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === "undefined") {
      return undefined;
    }

    return super.transform(value, metadata);
  }
}