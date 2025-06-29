import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return res.json({ error: true, message: "Erro: Usuário já existe!" });
      }

      const HashPassword = await hash(password, 8);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: HashPassword,
        },
      });

      return res.json({
        error: false,
        message: "Sucesso: Usuário cadastrado com sucesso!!!",
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async findAllUsers(req, res) {
    try {
      const user = await prisma.user.findMany();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async findUser(req, res) {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
