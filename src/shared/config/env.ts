import { plainToInstance } from "class-transformer"
import { IsNotEmpty, IsString, NotEquals, validateSync } from "class-validator"

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  databaseUrl: string

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string
}

export const env: Env = plainToInstance(Env, {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
} as Env)

const errors = validateSync(env)

console.error(JSON.stringify(errors, null, 2))

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
