// import type { ICommandHandler } from '@nestjs/cqrs';
// import { CommandHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { ReviewEntity } from '../review.entity.ts';

// @CommandHandler(CreatePostCommand)
// export class CreatePostHandler
//   implements ICommandHandler<CreatePostCommand, ReviewEntity>
// {
//   constructor(
//     @InjectRepository(ReviewEntity)
//     private postRepository: Repository<ReviewEntity>,
//   ) {}

//   async execute(command: CreatePostCommand) {
//     const { userId, createPostDto } = command;
//     const postEntity = this.postRepository.create({ userId });

//     await this.postRepository.save(postEntity);

//     for (const createTranslationDto of createPostDto.title) {
//       const languageCode = createTranslationDto.languageCode;
//       const translationEntity = this.postTranslationRepository.create({
//         postId: postEntity.id,
//         languageCode,
//         title: createTranslationDto.text,
//         description: createPostDto.description.find(
//           (desc) => desc.languageCode === languageCode,
//         )!.text,
//       });

//       translations.push(translationEntity);
//     }

//     await this.postTranslationRepository.save(translations);

//     postEntity.translations = translations;

//     return postEntity;
//   }
// }
