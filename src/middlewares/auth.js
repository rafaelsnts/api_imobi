import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado!" });
  }

  const token = authorization.replace("Bearer", "").trim();
  try {
    const data = jwt.verify(token, "0c8ebf54acddc42850fdaaf5537d58ee");
    const { id } = data;
    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
}
