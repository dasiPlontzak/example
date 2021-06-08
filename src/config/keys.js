//keys.js file

import dev from './dev';
import prod from './prod'

const keys = JSON.stringify(process.env.NODE_ENV)==='"development"' ? dev :prod;
export default keys;