import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'

const { NODE_ENV = '' } = process.env
const STAGE = NODE_ENV ? `.${NODE_ENV}` : ''

export class ConfigEnv {
  envConfig

  constructor(filePath = '.env') {
    this.envConfig = dotenv.parse(readFileSync(filePath))
  }

  get(key) {
    return this.envConfig[key]
  }

  getAll() {
    return this.envConfig
  }
}

export default new ConfigEnv(`.env${STAGE}`)
