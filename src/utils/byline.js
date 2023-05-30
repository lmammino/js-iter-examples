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
