import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default {
  async createSession(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.json({ message: "Usuário ou senha incorretos!" });
      }

      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        return res.json({ message: "Usuário ou senha incorretos!" });
      }
      const token = jwt.sign(
        { id: user.id },
        "0c8ebf54acddc42850fdaaf5537d58ee",
        {
          expiresIn: "1d",
        },
      );
      delete user.password;

      return res.status(200).json({
        message: "Login efetuado com sucesso. Aguarde...",
        user,
        token,
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
