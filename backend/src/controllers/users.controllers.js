import * as services from "../services/users.services.js";
import { isValidPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { logger } from "../utils/logger.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await services.getUsers();
    res.send({ message: "Success", data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, age, role } = req.body;
    const user = {
      name,
      email,
      password,
      age,
      role,
    };
    const newPet = await services.createUser(user);
    res.send({ message: "Success", data: newPet });
  } catch (error) {
    next(error);
  }
};

export const generateData = async (req, res, next) => {
  try {
    const { numUsers, numMascotas } = req.params;
    const data = await services.generateData(numUsers, numMascotas);
    res.send({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const user = await services.getUserById(idUser);
    res.send({ message: "Success", data: user });
  } catch (error) {
    next(error);
  }
};

export const findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await services.findUserByEmail(email);
    res.send({ message: "Success", data: user });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await services.getUsers();

    const userExists = response.some((user) => user.email === email);
    if (userExists) {
      return res.status(406).json({ error: "El email ya está en uso" });
    } else {
      const newUser = await services.createUser(req.body);
      const payload = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      };

      const token = jwt.sign(payload, config.secret, { expiresIn: "24h" });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.json({ message: "Usuario creado", data: newUser });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userFind = await services.findUserByEmail(email);
  try {
    if (!userFind) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const validPassword = isValidPassword(userFind, password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    const payload = {
      id: userFind.id,
      email: userFind.email,
      role: userFind.role,
    };
    const token = jwt.sign(payload, config.secret, { expiresIn: "24h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    logger.info(`Usuario ${userFind.email} logeado con exito`);
    res.json({ message: "Logeado con exito" });
  } catch (error) {
    next(error);
  }
};
