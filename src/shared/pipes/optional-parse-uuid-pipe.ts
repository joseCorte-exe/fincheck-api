import { ArgumentMetadata, ParseUUIDPipe } from "@nestjs/common";

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  // @ts-expect-error
  override async transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return super.transform(value, metadata);
  }
}