import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { NotificationModule } from './notification/notification.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PubSubModule } from './shared/pubsub/pubsub.module';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './shared/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      context: ({ req, connection }) => {
        if (req) {
          return { token: req.headers?.authorization?.split(' ')[1] };
        } else {
          return { token: connection?.context?.authorization?.split(' ')[1] };
        }
      },
    }),
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    NotificationModule,
    AuthModule,
    PubSubModule,
    RedisCacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
