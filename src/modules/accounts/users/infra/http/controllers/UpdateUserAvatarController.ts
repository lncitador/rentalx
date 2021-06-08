import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarService } from "@modules/accounts/users/services/UpdateUserAvatarService";

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    console.log("1");
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    console.log("2");
    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatar_file: request.file.filename,
    });

    console.log({ user });

    console.log("3");

    return response.status(201).json({ user });
  }
}

export { UpdateUserAvatarController };
