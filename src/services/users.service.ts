import { randomUUID } from "node:crypto";
import { knexDb } from "../database.ts";
import type { CreateUserInput } from "../schemas/user.schema.ts";
import {normalizeString} from "../utils/index.ts";

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("A user with this document already exists");
  }
}

export async function createUser(
  data: CreateUserInput & { sessionId: string },
) {
  const userExists = await knexDb("users")
    .where("usr_document", normalizeString(data.document))
    .select("usr_id")
    .first();

  if (userExists) {
    throw new UserAlreadyExistsError();
  }

  return knexDb("users").insert({
    usr_id: randomUUID(),
    usr_name: data.name,
    usr_document: normalizeString(data.document),
    usr_session_id: data.sessionId,
    usr_email: data.email,
    usr_phone: normalizeString(data.phone),
  }).returning("*");
}
