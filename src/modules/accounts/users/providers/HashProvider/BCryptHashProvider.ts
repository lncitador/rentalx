import { compare, hash } from "bcryptjs";

import IHashProvider from "../../model/IHashProvider";

class BcryptHashProvider implements IHashProvider {
  public async generatehash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BcryptHashProvider };
