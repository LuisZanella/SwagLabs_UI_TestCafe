import { User } from '@helpers/interfaces/Index.spec';
import * as faker from 'faker';

export const InvalidUsersTestData: User[] = [
  {
    userName: faker.internet.userName(),
    password: faker.internet.password(10, false),
  },
];
