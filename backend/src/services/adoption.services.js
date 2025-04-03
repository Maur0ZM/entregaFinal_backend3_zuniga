import { petsDao } from "../mongodb/pets.daos.js";
import { userDao } from "../mongodb/users.daos.js";
import { adoptionDao } from "../mongodb/adoption.daos.js";
import { CustomError } from "../utils/error.custom.js";

export const createAdoption = async (idUser, idPet) => {
  try {
    const pet = await petsDao.getPetById(idPet);
    if (!pet) throw new CustomError("Mascota no encontrada", 404);
    if (pet.adopted) throw new CustomError("Mascota ya en adopción", 400);

    const user = await userDao.getUserById(idUser);
    if (!user) throw new CustomError("Usuario no encontrado", 404);

    const updatePet = await petsDao.updatePet(idPet, { adopted: true });
    if (!updatePet)
      throw new CustomError("Error al actualizar la mascota", 400);

    user.pets.push(idPet);

    const updateUser = await userDao.updateUser(idUser, user);
    if (!updateUser)
      throw new CustomError("Error al actualizar el usuario", 400);

    await adoptionDao.createAdoption({
      user: idUser,
      pet: idPet,
    });

    return { pet: updatePet, user: updateUser };
  } catch (error) {
    throw error;
  }
};
