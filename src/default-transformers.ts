import {register as registerTransformer} from './transformers'

export function setupDefaultTransformers() {
  // className -> class
  registerTransformer(undefined, 'className', (className: any) => ({class: className}))

  // class array -> class string
  registerTransformer(undefined, 'class', (classes: any) => {
    if (classes instanceof Array) {
      const typedClasses = classes as Array<string | boolean | undefined | null | 0>
      return typedClasses.filter(className => !!className)
        .join(' ')
    }
    return classes
  })

  // style object -> style string
  registerTransformer(undefined, 'style', (styles: any) => {
    if (typeof styles === 'object') {
      return Object.keys(styles).map(key => `${mapStyleName(key)}: ${styles[key]}`).join('; ')
    }
    return styles
  })

  // event handler
  registerTransformer(undefined, undefined, (value: any, attributeName: string, _: any, htmlElement: HTMLElement) => {
    if (!attributeName.startsWith('on') || typeof value !== 'function') return value
    htmlElement.addEventListener(attributeName[2].toLowerCase() + attributeName.slice(3), value)
    return {}
  })
}

function mapStyleName(name: string) {
  return name.replace(/[A-Z]/g, s => '-' + s.toLowerCase())
}