import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './DTO/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { TokenPayload } from '../auth/types';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async getUsers(@CurrentUser() { userId }: TokenPayload) {
    console.log(userId);
    return this.usersService.findAll();
  }
}
