import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createImobi(req, res) {
    try {
      const thumb = req.file ? req.file.filename : null;

      if (!thumb) {
        return res.status(400).json({ message: "Imagem não enviada!!!" });
      }
      const {
        id,
        name,
        email,
        telefone,
        tipo,
        endereco,
        cidade,
        uf,
        valor,
        descricao,
      } = req.body;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!!!" });
      }

      const slugify = (srt) =>
        srt
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      const slug = slugify(tipo);

      const imobi = await prisma.imobi.create({
        data: {
          thumb,
          tipo,
          endereco,
          cidade,
          uf,
          valor: Number(valor),
          descricao,
          name,
          email,
          telefone,
          slug,
          userId: user.id,
        },
      });

      return res.status(201).json(imobi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async findAllImobi(req, res) {
    try {
      const imobi = await prisma.imobi.findMany();

      return res.status(201).json(imobi);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async findImobi(req, res) {
    try {
      const { slug } = req.params;
      const imobi = await prisma.imobi.findFirst({
        where: {
          slug: slug,
        },
      });
      if (!imobi) {
        return res.json({ message: "Imóvel não encontrado!" });
      }
      return res.status(200).json(imobi);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
