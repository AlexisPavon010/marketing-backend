export const EnvConfiguration = () => ({
  mongo_db_uri: process.env.MONGO_DB_URI,
  port: process.env.PORT || 3001,
  default_skip: 1
})