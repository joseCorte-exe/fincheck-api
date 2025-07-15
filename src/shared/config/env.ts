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

if (errors.length > 0) {
  console.error('Environment validation errors:')
  console.error('Please ensure all environment variables are set correctly.')
  console.error('The following errors were found:')
  errors.forEach(error => {
    console.error(`- ${error.property}: ${Object.values(error.constraints || {}).join(', ')}`)
  })
}

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
