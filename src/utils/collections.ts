import clone from 'just-clone'

/**
 * Creates an object with default properties, similar to defaultdict in Python
 *
 * Uses Proxy under the hood.
 *
 * ⚠️ As of now, tested only with integers and arrays.
 */
export function createDefaultObj<T>(defaultValue: T) {
  const ignoredProps = ['toJSON']

  const handler = {
    get: (obj: object, prop: string) => {
      const value = obj[prop]
      if (prop in obj) {
        return value
      }

      if (ignoredProps.includes(prop)) {
        return value
      }

      // If it's an array or object, clone it, instead of using reference
      if (isObject(defaultValue)) {
        const cloned = clone(defaultValue)
        obj[prop] = cloned
        return cloned
      }

      // Primitives can be copied by value
      obj[prop] = defaultValue
      return defaultValue
    },
  }

  return new Proxy<Record<string, T>>({}, handler)
}

function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null
}

export function createQueue<T>(initialValue: T[]) {
  const q = initialValue

  return {
    isNotEmpty: () => q.length > 0,
    isEmpty: () => q.length === 0,
    dequeue: () => q.shift(),
    enqueue: sth => q.push(sth),
  }
}
