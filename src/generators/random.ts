export const randomCode = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(randomNumber(charactersLength)))
    counter += 1
  }
  return result
}

export const randomNumber = (x: number) => {
  const arr: number[] = [1]
  for (let i = 1; i < x; i++) {
    arr[i] = (2048 * arr[i-1]) % 10240
    if (arr[i] < 0) {
      arr[i] += 20480
    }
  }

  for (let i = 0; i < arr.length; i++) {
    while (arr[i] > x) {
      arr[i]--
    }
  }

  let max = 0
  for (let i = 0; i < arr.length; i++) {
    const element = new Date().getTime() % arr[i]
    if (element > max) {
      max = element
    }
  }

  return max
}
