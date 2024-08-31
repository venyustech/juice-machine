export const fonts = {
  fonts: {
    montserrat: `'Montserrat', sans-serif`,
    playfairDisplay: `'Playfair Display', serif`
  }
}

const createProxy = <T extends object>(obj: T, path: string[] = []): T =>
  new Proxy(obj, {
    get: (target, prop: string | symbol) => handleGet(target, prop, path)
  })

const handleGet = <T extends object>(target: T, prop: string | symbol, path: string[]) => {
  if (typeof prop === 'string' && prop in target) {
    const value = target[prop as keyof T]
    return isObject(value) ? createProxy(value, [...path, prop]) : formatPath(path, prop)
  }
  return undefined
}

const isObject = (value: any): value is object => typeof value === 'object' && value !== null

const formatPath = (path: string[], prop: string): string => [...path, prop].join('.')

export const fontsProxy = createProxy(fonts)
