/* eslint-disable */
export default async () => {
  const t = {
    ['./common/dto/abstract.dto']: await import('./common/dto/abstract.dto'),
    ['./constants/language-code']: await import('./constants/language-code'),
    ['./modules/review/review.entity']: await import(
      './modules/review/review.entity'
    ),
    ['./modules/user/entities/user.entity']: await import(
      './modules/user/entities/user.entity'
    ),
    ['./constants/role-type']: await import('./constants/role-type'),
    ['./constants/register-provider-type']: await import(
      './constants/register-provider-type'
    ),
    ['./modules/user/dtos/user.dto']: await import(
      './modules/user/dtos/user.dto'
    ),
    ['./modules/auth/dto/token-payload.dto']: await import(
      './modules/auth/dto/token-payload.dto'
    ),
    ['./common/dto/create-translation.dto']: await import(
      './common/dto/create-translation.dto'
    ),
    ['./constants/order']: await import('./constants/order'),
    ['./common/dto/page-meta.dto']: await import('./common/dto/page-meta.dto'),
    ['./modules/auth/dto/login-payload.dto']: await import(
      './modules/auth/dto/login-payload.dto'
    ),
    ['./modules/review/dtos/review.dto']: await import(
      './modules/review/dtos/review.dto'
    ),
  };
  return {
    '@nestjs/swagger/plugin': {
      models: [
        [
          import('./common/dto/abstract.dto'),
          {
            AbstractDto: {
              id: { required: true, type: () => Object },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              translations: {
                required: false,
                type: () => [
                  t['./common/dto/abstract.dto'].AbstractTranslationDto,
                ],
              },
            },
            AbstractTranslationDto: {},
          },
        ],
        [
          import('./common/abstract.entity'),
          {
            AbstractEntity: {
              id: { required: true, type: () => Object },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              translations: { required: false },
            },
            AbstractTranslationEntity: {
              languageCode: {
                required: true,
                enum: t['./constants/language-code'].LanguageCode,
              },
            },
          },
        ],
        [
          import('./modules/review/review.entity'),
          {
            ReviewEntity: {
              userId: { required: true, type: () => Object },
              user: {
                required: true,
                type: () => t['./modules/user/entities/user.entity'].UserEntity,
              },
            },
          },
        ],
        [
          import('./modules/user/dtos/user.dto'),
          {
            UserDto: {
              email: { required: false, type: () => String, nullable: true },
              nickName: { required: true, type: () => String },
              role: {
                required: false,
                enum: t['./constants/role-type'].RoleType,
              },
            },
          },
        ],
        [
          import('./modules/user/entities/user.entity'),
          {
            UserEntity: {
              email: { required: true, type: () => String },
              password: { required: false, type: () => String, nullable: true },
              nickName: { required: true, type: () => String },
              refreshToken: { required: true, type: () => String },
              registerProvider: { required: true, type: () => String },
              registerProviderToken: { required: true, type: () => String },
              profileImage: { required: true, type: () => String },
              role: {
                required: true,
                enum: t['./constants/role-type'].RoleType,
              },
              posts: {
                required: false,
                type: () => [t['./modules/review/review.entity'].ReviewEntity],
              },
            },
          },
        ],
        [
          import('./modules/auth/dto/social-user-register.dto'),
          {
            SocialUserRegisterDto: {
              email: { required: true, type: () => String },
              nickName: { required: true, type: () => String },
              registerProvider: {
                required: false,
                type: () => String,
                enum: t['./constants/register-provider-type']
                  .RegisterProviderType,
              },
              registerProviderToken: { required: false, type: () => String },
              profileImage: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./modules/auth/dto/user-register.dto'),
          {
            UserRegisterDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              nickName: { required: true, type: () => String },
              profileImage: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./modules/auth/dto/token-payload.dto'),
          {
            TokenPayloadDto: {
              expiresIn: { required: true, type: () => Number },
              accessToken: { required: true, type: () => String },
              refreshToken: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/auth/dto/login-payload.dto'),
          {
            LoginPayloadDto: {
              user: {
                required: true,
                type: () => t['./modules/user/dtos/user.dto'].UserDto,
              },
              token: {
                required: true,
                type: () =>
                  t['./modules/auth/dto/token-payload.dto'].TokenPayloadDto,
              },
            },
          },
        ],
        [
          import('./modules/auth/dto/user-login.dto'),
          {
            UserLoginDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./common/dto/create-translation.dto'),
          {
            CreateTranslationDto: {
              languageCode: {
                required: true,
                enum: t['./constants/language-code'].LanguageCode,
              },
              text: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/review/dtos/create-review.dto'),
          {
            CreatePostDto: {
              title: {
                required: true,
                type: () => [
                  t['./common/dto/create-translation.dto'].CreateTranslationDto,
                ],
              },
              description: {
                required: true,
                type: () => [
                  t['./common/dto/create-translation.dto'].CreateTranslationDto,
                ],
              },
            },
          },
        ],
        [
          import('./common/dto/page-options.dto'),
          {
            PageOptionsDto: {
              order: { required: true, enum: t['./constants/order'].Order },
              page: { required: true, type: () => Number },
              take: { required: true, type: () => Number },
              q: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./common/dto/page-meta.dto'),
          {
            PageMetaDto: {
              page: { required: true, type: () => Number },
              take: { required: true, type: () => Number },
              itemCount: { required: true, type: () => Number },
              pageCount: { required: true, type: () => Number },
              hasPreviousPage: { required: true, type: () => Boolean },
              hasNextPage: { required: true, type: () => Boolean },
            },
          },
        ],
        [
          import('./common/dto/page.dto'),
          {
            PageDto: {
              data: { required: true },
              meta: {
                required: true,
                type: () => t['./common/dto/page-meta.dto'].PageMetaDto,
              },
            },
          },
        ],
        [
          import('./modules/review/dtos/review-page-options.dto'),
          { PostPageOptionsDto: {} },
        ],
        [
          import('./modules/review/dtos/update-review.dto'),
          { UpdatePostDto: {} },
        ],
        [
          import('./modules/user/dtos/users-page-options.dto'),
          { UsersPageOptionsDto: {} },
        ],
      ],
      controllers: [
        [
          import('./modules/user/user.controller'),
          {
            UserController: {
              admin: {},
              getUser: { type: t['./modules/user/dtos/user.dto'].UserDto },
            },
          },
        ],
        [
          import('./modules/auth/auth.controller'),
          {
            AuthController: {
              userLogin: {
                type: t['./modules/auth/dto/login-payload.dto'].LoginPayloadDto,
              },
              userRegister: {
                type: t['./modules/auth/dto/login-payload.dto'].LoginPayloadDto,
              },
              getCurrentUser: {
                type: t['./modules/user/dtos/user.dto'].UserDto,
              },
              googleAuth: {},
              googleAuthRedirect: {
                type: t['./modules/auth/dto/login-payload.dto'].LoginPayloadDto,
              },
            },
          },
        ],
        [
          import('./modules/health-checker/health-checker.controller'),
          { HealthCheckerController: { check: { type: Object } } },
        ],
        [
          import('./modules/review/review.controller'),
          {
            PostController: {
              createPost: {
                type: t['./modules/review/dtos/review.dto'].ReviewDto,
              },
              getPosts: {},
              getSinglePost: {
                type: t['./modules/review/dtos/review.dto'].ReviewDto,
              },
              updatePost: {},
              deletePost: {},
            },
          },
        ],
      ],
    },
  };
};
