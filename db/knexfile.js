const conf = {
  development: {
    client: 'postgres',
    connection: {
      database: 'priotix',
      user: 'postgres',
      password: 'qwerty1'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_lda'
    }
  }
};
export default conf;