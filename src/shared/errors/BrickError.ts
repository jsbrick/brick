export class BrickError<Code extends string> extends Error {
  constructor(
    public message: string,
    public code: Code,
  ) {
    super(message);
  }

  static of<Code extends string>(message: string, code: Code) {
    return new BrickError(message, code);
  }

  static throw<Code extends string>(message: string, code: Code): never {
    throw new BrickError(message, code);
  }
}

export const isBrickError = <T extends string>(entity: unknown): entity is BrickError<T> =>
  entity instanceof BrickError;
