import dev from './env.dev'
import prod from './env.prod'

const config =  process.env.DEV ? dev : prod
//console.log(process.env.DEV ? 'dev' : 'prod', config)
export default config;
