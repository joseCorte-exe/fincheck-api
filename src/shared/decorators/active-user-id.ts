import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const ActiveUserId = createParamDecorator<undefined>((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const userId = request['userId']

  if (!userId) {
    throw new UnauthorizedException('User not found')
  }

  return userId
})