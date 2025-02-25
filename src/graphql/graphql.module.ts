import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      debug: false,
      driver: ApolloDriver,
      playground: true,
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        return {
          success: false,
          message: error.message,
          statusCode: error.extensions?.status || 500,
        };
      },
    }),
  ],
})
export class NestGraphQLModule {}
