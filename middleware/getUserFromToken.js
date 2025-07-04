import { getUserById } from "#db/queries/users";
import { verifyToken } from "#utils/jwt";

/** Attaches the user to the request if a valid token is provided */
export default async function getUserFromToken(req, res, next) {
  console.log ("getting header")
  const authorization = req.get("authorization");
  console.log("authorization", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) return next();

  const token = authorization.split(" ")[1];
  try {
    const { id } = verifyToken(token);
    const user = await getUserById(id);
    req.user = user;
    console.log(" req.user", req.user);
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("Invalid token.");
  }
}
