import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserRequest {
  name: string,
  email: string,
  admin?: boolean
}

class CreateUsersService {
  async execute({ name, email, admin }: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Email incorreto");
    }

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado!");
    }

    const user = userRepository.create({
      name,
      email,
      admin
    })

    await userRepository.save(user);

    return user;
  }
}

export { CreateUsersService }