import { DrizzleConfig } from 'drizzle-orm';
import * as schema from './schema'; // Import your schema

declare module 'drizzle-orm' {
  interface DrizzleConfig{//<TSchema extends typeof schema> {
    mode?: 'default' | 'planetscale' | 'libsql'; // Make mode optional
  }
}

//If you are using drizzle-orm/mysql2
declare module 'drizzle-orm/mysql2' {
  interface MySql2DrizzleConfig<TSchema extends typeof schema> extends Omit<DrizzleConfig<TSchema>, 'schema'> {
    schema: TSchema;
    mode?: 'default' | 'planetscale' | 'libsql'; // Make mode optional
  }
}
