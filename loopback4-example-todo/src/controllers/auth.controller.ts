import {HttpErrors, post, requestBody} from '@loopback/rest';
import {LoginUserSchema, RegisterUserSchema} from '../graphql/user.schema';
import {User} from '../models';
import {log} from '../helpers';
import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {inject} from '@loopback/core';
import {TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {EmailService, JwtService, UsersService} from '../services';
import {SecurityBindings, UserProfile} from '@loopback/security';
import * as crypto from 'node:crypto';


export class AuthController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    // @inject('services.TokenService')
    // public tokenServiceImplementation: TokenServiceImplementation,

    @inject(UserServiceBindings.USER_SERVICE)
    protected userService: UsersService,


    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JwtService,


    // @inject(AuthenticationBindings.CURRENT_USER)
    // private user: UserProfile,

    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,

    @inject('service.mailService')
    protected mailService: EmailService,

  ) {}

  @post('/register', RegisterUserSchema)
  async register(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User, // Use the RegisterUserRequest class as the schema
            },
          },
        },
      }
    )
      userData: Omit<User, 'id'>,
  ): Promise<{message: string; user: User; token: string}>  {
    const {firstname, lastname, email, password, gender} = userData;

    // Log request details
    log.info(`Register User Request: ${JSON.stringify(userData)}`);


    // Check if user already exists
    const existingUser = await this.userRepository.findOne({where: {email}});
    if (existingUser) {
      throw new HttpErrors.Conflict('User Already Exists');
    }

    try {
      const newUser = new User(userData);
      await newUser.hashPassword()
      //const hashedPassword = await this.passwordHasher.hashPassword(password)

      // Save the new user to the database
      const savedUser = await this.userRepository.create(newUser);

      // Generate JWT token
      const userProfile =  this.userService.convertToUserProfile(savedUser)
      const token = await this.jwtService.generateToken(userProfile);

      return {
        message: 'Successfully Registered',
        user: savedUser,
        token,
      };
    } catch (error) {
      throw new HttpErrors.InternalServerError('Failed to create user');
    }
  }

  @post('/login', LoginUserSchema)
  async login(
    @requestBody()
      credentials: { email: string; password: string }
  ): Promise<object> {
    const {email, password} = credentials;
    // Log request details
    log.info(`Login User Request: ${JSON.stringify(credentials)}`);


    // Find the user by email
    const user = await this.userRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpErrors.Unauthorized('Incorrect email or password');
    }

    // Check if the user is verified
    if (!user.verified) {
      throw new HttpErrors.Forbidden('Not verified, please check your email');
    }

    // Compare the password
    const passwordMatch = await user.comparePassword(credentials.password);
    console.log(passwordMatch, credentials.password)
    if (!passwordMatch) {
      throw new HttpErrors.Unauthorized('Incorrect password');
    }

    //Generate JWT token
    //const token = await this.tokenServiceImplementation.generateToken(user);

    //const user = await this.userService.verifyCredentials(credentials);
    // console.log(user);
    const userProfile =  this.userService.convertToUserProfile(user);

    // Generate JWT token
    const token = await this.jwtService.generateToken(userProfile)

    return {
      userProfile,
      message: 'Successfully Logged In',
      token,
    };
  }

  @post('/forgot')
  async forgot(
    @requestBody() body: { email: string }
  ): Promise<{message: string; token: string}> {
    const user = await this.userRepository.findOne({ where: { email: body.email } });

    if (!user) {
      throw new HttpErrors.NotFound('No account with that email address exists');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now().toString() + 3600000; // 1 hour


    await this.userRepository.updateById(user.id!, user); // Make sure to handle potential errors

    await this.mailService.sendResetPasswordEmail(user.email, token, 'localhost:3000');

    return {
      message: `An e-mail has been sent to ${user.email} with further instructions.`,
      token,
    };
  }

  @post('/reset-password')
  async resetPassword(
    @requestBody() credentials: { email: string; passwordToken: string; newPassword: string },
  ): Promise<{result: void; message: string}> {
    const { email, passwordToken, newPassword } = credentials;

    const currentTime = new Date().getTime(); // Get current time in milliseconds

    const user = await this.userRepository.findOne({
      where: {
        email: email,
        resetPasswordToken: passwordToken,
        resetPasswordExpires: { $gt: currentTime },
      },
    });

    if (!user) {
      throw new HttpErrors.NotFound('Invalid email or temporary password');
    }

    user.password = newPassword; // Assuming password hashing is handled in the model
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();

    const result = await this.userRepository.updateById(user.id, user);

    return {
      message: 'Password reset successful',
      result,
    };
  }
}