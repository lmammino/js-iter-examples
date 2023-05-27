import { readFile } from 'node:fs/promises'

const filename = process.argv[2]
if (!filename) {
  console.error('Please provide a filename. Usage: node parse.js <filename>')
  process.exit(1)
}

const rawData = await readFile(filename, 'utf-8')
const lines = rawData.split(/(?:\r\n|(?!\r\n)[\n-\r\x85\u2028\u2029])+/)
const messages = lines.map(line => line === '' ? {} : JSON.parse(line))

const errors = messages.filter(message => message.error === 'ERR_SYS_FCKD')
const errorCount = errors.length
const errorsByCustomer = errors.reduce((acc, error) => {
  if (!acc[error.customerId]) {
    acc[error.customerId] = 0
  }
  acc[error.customerId]++
  return acc
}, {})
let formattedErrorCount = []
for (const customerId in errorsByCustomer) {
  formattedErrorCount.push({ customerId, errorCount: errorsByCustomer[customerId] })
}
formattedErrorCount = formattedErrorCount.sort((a, b) => b.errorCount - a.errorCount)

console.log(`Total errors: ${errorCount}`)
console.log('\nErrors by customer:')
console.table(formattedErrorCount)
