import { User } from "@modules/accounts/users/infra/typeorm/entities/User";
import { BcryptHashProvider } from "@modules/accounts/users/providers/HashProvider/BCryptHashProvider";

import createConnection from "../index";

const hashProvider = new BcryptHashProvider();

async function create() {
  const connection = await createConnection("localhost");
  const password = await hashProvider.generatehash("admin1234");

  await connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: "admin",
      password,
      email: "admin@mail.com",
      isAdmin: true,
      driver_license: "admin-license",
    })
    .execute()
    .then(() => console.log("User admin created!"))
    .catch(() => console.log("Seed already germinated"));

  await connection.close();
}

create();
