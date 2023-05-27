import { createReadStream } from 'node:fs'
import { byLine } from './utils/byline.js'

const filename = process.argv[2]
if (!filename) {
  console.error('Please provide a filename. Usage: node parse-iter.js <filename>')
  process.exit(1)
}

const readable = createReadStream(filename, { encoding: 'utf-8' })

let errorCount = 0
const errorsByCustomer = {}

for await (const line of byLine(readable)) {
  const message = line === '' ? {} : JSON.parse(line)
  if (message.error === 'ERR_SYS_FCKD') {
    errorCount++
    if (!errorsByCustomer[message.customerId]) {
      errorsByCustomer[message.customerId] = 0
    }
    errorsByCustomer[message.customerId]++
  }
}

let formattedErrorCount = []
for (const customerId in errorsByCustomer) {
  formattedErrorCount.push({ customerId, errorCount: errorsByCustomer[customerId] })
}
formattedErrorCount = formattedErrorCount.sort((a, b) => b.errorCount - a.errorCount)

console.log(`Total errors: ${errorCount}`)
console.log('\nErrors by customer:')
console.table(formattedErrorCount)
