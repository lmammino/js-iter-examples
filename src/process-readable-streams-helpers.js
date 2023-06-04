// alternative approach fully using Node.js streams rather than Async Iterators

import { createReadStream } from 'node:fs'
import { compose } from 'node:stream'
import { LinesStream } from './utils/byline.js'

const filename = process.argv[2]
if (!filename) {
  console.error('Please provide a filename. Usage: node parse-iter.js <filename>')
  process.exit(1)
}

const byLineStream = compose(
  createReadStream(filename, { encoding: 'utf-8' }),
  new LinesStream()
)

const errorsByCustomer = await byLineStream
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
