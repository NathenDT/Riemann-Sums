import { evaluate } from 'mathjs'

export default function middle(f: string, a: string, b: string, n: number) {
  // Finds Delta x using the formula: (b-a)/N
  const deltaX = evaluate(`((${b}) - (${a})) / (${n})`)

  // An array of the lengths/heights of the rectangles formulas
  let lengths: string[] = []

  // Starts i at 0 and ends at N - 1
  for (let i = 0; i < n; i++) {
    // Finds the value of x using the formula: (a) + (Delta x) * i
    const x1 = evaluate(`(${a}) + (${deltaX}) * (${i})`)
    // Finds the value of x using the formula: (a) + (Delta x) * (i + 1)
    const x2 = evaluate(`(${a}) + (${deltaX}) * (${i} + 1)`)

    // Formates the equation
    // (f((x1 + x2) / 2)
    lengths.push(`(${f.split('x').join(((x1 + x2) / 2).toString())})`)
  }

  // Solves using the formula: (Delta x) * (f(x1), f(x2), ...)
  return evaluate(`${deltaX} * (${lengths.join('+')})`)
}
