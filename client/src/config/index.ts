const currentEnv: NodeJS.ProcessEnv = process.env

const SERVER_HOST = currentEnv.REACT_APP_SERVER_HOST
const SERVER_PORT = currentEnv.REACT_APP_SERVER_PORT
const USER_PASSWORD = currentEnv.REACT_APP_USER_PASSWORD

const SERVER_CONFIG = {
  URL: `http://${SERVER_HOST}:${SERVER_PORT}`,
  HOST: SERVER_HOST,
  PORT: SERVER_PORT,
  USER_PASSWORD: USER_PASSWORD,
}

export default SERVER_CONFIG
