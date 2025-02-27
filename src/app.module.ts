import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { AppResolver } from 'src/app.resolver';
import { AppService } from 'src/app.service';
import { RedisModule } from 'src/common/cache/redis.module';
import { CommonModule } from 'src/common/common.module';
import { TokenRenewalInterceptor } from 'src/common/interceptors/token.interceptor';
import envConfiguration from 'src/configuration/environment/env.config';
import { validationSchema } from 'src/configuration/environment/validation.schema';
import { DatabaseModule } from 'src/database/database.module';
import { NestGraphQLModule } from 'src/graphql/graphql.module';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { LevelModule } from 'src/modules/level/level.module';
import { QuestionModule } from 'src/modules/question/question.module';
import { ScoreModule } from 'src/modules/score/score.module';
import { GqlThrottlerGuard } from 'src/modules/shared/guards/throttler.guard';
import { SharedModule } from 'src/modules/shared/shared.module';
import { SubcategoryModule } from 'src/modules/subcategory/subcategory.module';
import { UserModule } from 'src/modules/user/user.module';
import { UserAnswerModule } from 'src/modules/user_answer/user_answer.module';
import { UserQuestionHistoryModule } from 'src/modules/user_question_history/user_question_history.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? 'test.env' : '.env',
      expandVariables: true,
      isGlobal: true,
      load: [envConfiguration],
      validationSchema: validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    ThrottlerModule.forRootAsync({
      useFactory: async () => ({
        throttlers: [{ limit: 60, ttl: seconds(60) }],
      }),
    }),
    ScheduleModule.forRoot(),
    NestGraphQLModule,
    AuthModule,
    AnswerModule,
    CategoryModule,
    CommonModule,
    DatabaseModule,
    LevelModule,
    QuestionModule,
    RedisModule,
    ScoreModule,
    SharedModule,
    SubcategoryModule,
    UserAnswerModule,
    UserModule,
    UserQuestionHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    { provide: APP_INTERCEPTOR, useClass: TokenRenewalInterceptor },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
