import { createReadStream } from 'node:fs'
import AsyncIterator from 'core-js-pure/features/async-iterator/index.js'
import { byLine } from './utils/byline.js'

const filename = process.argv[2]
if (!filename) {
  console.error('Please provide a filename. Usage: node parse-iter.js <filename>')
  process.exit(1)
}

const readable = createReadStream(filename, { encoding: 'utf-8' })

const errorsByCustomer = await AsyncIterator.from(byLine(readable))
  .map(line => line === '' ? {} : JSON.parse(line))
  .filter(message => message.error === 'ERR_SYS_FCKD')
  .reduce((acc, error) => {
    if (!acc[error.customerId]) {
      acc[error.customerId] = 0
    }
    acc[error.customerId]++
    return acc
  }, {})

console.log('Errors by customer:')
console.log(errorsByCustomer)
