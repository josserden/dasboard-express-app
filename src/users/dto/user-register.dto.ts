import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;

  @IsString({
    message: 'Password is invalid',
  })
  password: string;

  @IsString({
    message: 'Name is invalid',
  })
  name: string;
}
