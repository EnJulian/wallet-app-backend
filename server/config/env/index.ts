import development from './development'
import test from './test'
import production from './production'

const environment = {
  development,
  test,
  production
}

type EnvironmentObjectKey = keyof typeof environment

const currentEnvironment = process.env.NODE_ENV as EnvironmentObjectKey
console.log(currentEnvironment);

// TODO get the node env from the object
const config = environment[currentEnvironment]
console.log(config);
export default config
