// src/controllers/user.controller.ts
import {repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {inject} from '@loopback/core';
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {JwtService, UsersService} from '../services';
import {TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {securityId, SecurityBindings, UserProfile} from '@loopback/security';
import {User} from '../models';
import {UserProfileRepository} from '../repositories';
import {UserProfile as UserProfModel} from '../models/user-profile.model'

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserProfileRepository) private userProfileRepo: UserProfileRepository,
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

  ) {}




  @get('/loadUser/{id}')
  @authenticate('jwt')
  async loadUser(@param.path.string('id') id: string): Promise<{ user: object }> {
    const userProfile = await this.userRepository.findOne({ where: { email: id } });

    if (!userProfile) {
      throw new HttpErrors.NotFound('User profile not found');
    }

    return { user: userProfile };
  }

  @get('/getUser')
  @authenticate('jwt')
  async getUser(
   @inject(AuthenticationBindings.CURRENT_USER) userId: UserProfile
  ): Promise<{ msg: string; user: object }> {
    const usersId: any = userId[securityId]
    const user = await this.userRepository.findById(usersId?.id);
    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }

    const userProfile = await this.userRepository.findOne({ where: { email: user.email } });

    if (userProfile) {
      return { msg: 'Data from UserProfileDB', user: userProfile };
    } else {
      return { msg: 'Data from UserDB SESSION', user: user };
    }
  }



   // Protect this route with JWT authentication
  @authenticate('jwt')
  @get('/profile')
  async getUserProfile(@inject(AuthenticationBindings.CURRENT_USER)
                         currentUserProfile: UserProfile,
  ): Promise<string | undefined> {
    return currentUserProfile[securityId];
  }


  // Protect this route with JWT authentication
  @get('/profile2')
  @authenticate('jwt')
  async getUserProfile2(@param.query.string('token') token: UserProfile): Promise<UserProfile> {
    // Token will be automatically validated
    return {
      email: token.email,
      [securityId]: token[securityId],
      id: token, // Retrieve this from your user service or JWT token
      name: token.name
    };
  }




  @authenticate('jwt')
  @get('/whoami')
  whoAmI(): string {

    const userId = this.user[securityId]

    return userId;
  }

  @authenticate('jwt')
  @post('/updateUser')
  async updateUser(
    @inject(AuthenticationBindings.CURRENT_USER) currentUser: UserProfile,  // Inject the authenticated user's profile
    @requestBody() userProfileData: UserProfModel  // Data to update
  ): Promise<{ msg: string; user: object }> {
    try {
      const userId: any = currentUser[securityId];  // Access the user ID from the injected user profile

      console.log('User ID:', userId?.id);

      // Fetch the existing user profile by userId
      //const existingProfile = await this.userProfileRepo.findById(userId?.id);
      const existingProfile = await this.userProfileRepo.findOne({
        where: {userId:userId?.id}
      });

      //userProfileData.userId = userId?.id;

      if (existingProfile) {
        console.log('1')
        userProfileData.userId = userId?.id;
        console.log('existingProfile',existingProfile)
        await this.userProfileRepo.updateById(existingProfile.id,userProfileData);
        console.log('runs second line')

        const updatedUserPro = await this.userProfileRepo.findById(existingProfile.id);

        console.log('updatedProfile',updatedUserPro)
        return {
          msg: 'User Profile Updated',
          user: updatedUserPro
        }
      } else {
        console.log('2')
        userProfileData.userId = userId?.id;
        const newUserProfile = await this.userProfileRepo.create(userProfileData)
        return {
          msg: 'User Profile Created',
          user: newUserProfile
        }
      }
    } catch (error) {
      throw new HttpErrors.BadRequest(error)

    }

  }
}
