export const colors = {
  main: {
    primary: '#ececec',
    secundary: '#ffffff'
  },
  form: {
    label: '#072854',
    'label-selected': '#072854',
    'primary-button': '#2797BA',
    'primary-button-selected': '#2797BA',
    'secundary-button': '#2CBD62',
    'secundary-button-selected': '#258B4B'
  }
}

const createProxy = (obj: any, path: string[] = []): any =>
  new Proxy(obj, {
    get: (target, prop) => handleGet(target, prop, path)
  })

const handleGet = (target: any, prop: string | symbol, path: string[]) => {
  if (typeof prop === 'string' && prop in target) {
    const value = target[prop]
    return isObject(value) ? createProxy(value, [...path, prop]) : formatPath(path, prop)
  }
  return undefined
}

const isObject = (value: any) => typeof value === 'object' && value !== null

const formatPath = (path: string[], prop: string): string => [...path, prop].join('.')

export const colorsProxy = createProxy(colors)
