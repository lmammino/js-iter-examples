import { Transform } from 'node:stream'

export async function * byLine (asyncIterable) {
  let remainder = ''
  for await (const chunk of asyncIterable) {
    const lines = (remainder + chunk).split(/(?:\r\n|(?!\r\n)[\n-\r\x85\u2028\u2029])+/)
    remainder = lines.pop()
    yield * lines
  }
  if (remainder.length > 0) {
    yield remainder
  }
}

export class LinesStream extends Transform {
  constructor (options) {
    super({ ...options, objectMode: true })
    this.remainder = ''
  }

  _transform (chunk, encoding, done) {
    const line = chunk.toString('utf-8')
    const lines = (this.remainder + line).split(/(?:\r\n|(?!\r\n)[\n-\r\x85\u2028\u2029])+/)
    this.remainder = lines.pop()
    for (const line of lines) {
      this.push(line, 'utf-8')
    }
    done()
  }

  _flush (done) {
    if (this.remainder.length > 0) {
      this.push(this.remainder, 'utf-8')
    }
    done()
  }
}
