import { randomUUID } from 'node:crypto'

const customers = ['01H1D5K2JDVD941R6H67YEY0G8', '01H1D5KGHRV3SNJ71C4E920872', '01H1D5KSG0K81CCAGTSTBXHFA6', '01H1D5KZ7GV7HK213XE3WV5GQX', '01H1D5M5RTKKK5SC4ADWAPK7Q0', '01H1D5MJ4XNJ580DMM8Y7T1HRW', '01H1D5MZAVPSXSXPTYADF4BDND', '01H1D5N6HS2EMA900A2V6NQQ2Q', '01H1D5NGA5D689HD57CN5BZSG3']
const errors = ['ERR_SYS_FCKD', 'ERR_CLIENT_TIMEOUT', 'ERR_SERVER_TIMEOUT', 'ERR_BUSY', 'ERR_NOT_FOUND']
const messages = ['user logged in', 'request on hold', 'payment started', 'transaction in progress', 'item added to basket', 'payment completed', 'transaction cancelled by user', 'this talk is going to be epic, trust me', 'all looks good', 'the grass is greener on the other server']

function randomElement (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateMessage (timestamp) {
  const customerId = randomElement(customers)

  if (Math.random() > 0.5) {
    // error
    return {
      requestId: randomUUID(),
      level: 'ERROR',
      timestamp,
      customerId,
      error: randomElement(errors)
    }
  } else {
    // regular log
    return {
      requestId: randomUUID(),
      level: 'INFO',
      timestamp,
      customerId,
      message: randomElement(messages)
    }
  }
}

const numLinesToGenerate = Number.parseInt(process.argv[2]) || 10_000

let timestamp = Date.now()
for (let i = 0; i < numLinesToGenerate; i++) {
  const message = generateMessage((new Date(timestamp).toISOString()))
  console.log(JSON.stringify(message))
  timestamp += Math.floor(Math.random() * 10_000)
}
