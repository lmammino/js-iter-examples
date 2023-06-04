import { readFile } from 'node:fs/promises'

const filename = process.argv[2]
if (!filename) {
  console.error(`Please provide a filename. Usage: ${process.argv[0]} ${process.argv[1]} <filename>`)
  process.exit(1)
}

const rawData = await readFile(filename, 'utf-8')
const lines = rawData.split(/(?:\r\n|(?!\r\n)[\n-\r\x85\u2028\u2029])+/)
const messages = lines.map(line => line === '' ? {} : JSON.parse(line))

const errors = messages.filter(message => message.error === 'ERR_SYS_FCKD')
const errorsByCustomer = errors.reduce((acc, error) => {
  if (!acc[error.customerId]) {
    acc[error.customerId] = 0
  }
  acc[error.customerId]++
  return acc
}, {})

console.log('Errors by customer:')
console.log(errorsByCustomer)
