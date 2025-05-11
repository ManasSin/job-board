import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/models/user.model';
import { LoginInput } from './DTO/login.input';
import { AuthService } from './auth.service';
import { GqlContext } from '@jobber-fresh/nestjs';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext
  ) {
    return this.authService.login(loginInput, context.res);
  }
}
