export const colors = {
  main: {
    primary: '#FFFFFF',
    secundary: '#f2f2f2',
    border: '#CCCCCC',
    'border-selected': '#44A9CC',
    'logo-main-color': '#44A9CC'
  },
  form: {
    label: '#072854',
    'label-selected': '#072854',
    'primary-button': '#2797BA',
    'secundary-button': '#2CBD62',
    'secundary-button-selected': '#258B4B'
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

export const colorsProxy = createProxy(colors)
