import { evaluate } from 'mathjs'

export default function right(f: string, a: string, b: string, n: number) {
  // Finds Delta x using the formula: (b-a)/N
  const deltaX = evaluate(`((${b}) - (${a})) / (${n})`)

  // An array of the lengths/heights of the rectangles formulas
  let lengths: string[] = []

  // Starts i at 1 and ends at N
  for (let i = 1; i <= n; i++) {
    // Finds the value of x using the formula: (a) + (Delta x) * i
    const x = evaluate(`(${a}) + (${deltaX}) * (${i})`)

    // Formates the equation
    // (f(x))
    lengths.push('(' + f.split('x').join(x.toString()) + ')')
  }

  // Solves using the formula: (Delta x) * (f(x1), f(x2), ...)
  return evaluate(`${deltaX} * (${lengths.join('+')})`)
}
