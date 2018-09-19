import {getTransformers} from './transformers'
import {setupDefaultTransformers} from './default-transformers'

interface Attributes {
  [key: string]: any
}

setupDefaultTransformers()

type ChildType = string | Node | JessieElementImpl | undefined | null | false | true

interface TransformedAttribute {
  name: string
  value: string
}

export interface JessieElement {
  tagName: string
  attributes: Attributes
  children: ChildType[]
}

class JessieElementImpl implements JessieElement {
  public readonly tagName: string
  public readonly attributes: Attributes
  public readonly children: ChildType[]
  constructor(tagName: string, attributes: Attributes, children: Array<ChildType | ChildType[]>) {
    this.tagName = tagName
    this.attributes = attributes
    const childArray: ChildType[] = []
    this.children = childArray.concat(...children.map(child => isArrayLike(child) ? child : [child]))
  }

  public toDOM(document: Document) {
    const that = this
    const element = document.createElement(this.tagName)
    handleAttributes(element, this.attributes)

    for (const child of this.children) {
      let outputtable: Node
      if (child instanceof JessieElementImpl) {
        outputtable = child.toDOM(document)
      } else if (child === null || child === undefined || child === false || child === true) {
        outputtable = document.createComment('')
      } else {
        outputtable = document.createTextNode(child.toString())
      }

      element.appendChild(outputtable)
    }

    function handleAttributes(domElement: HTMLElement, attributes: any) {
      for (const attributeName of Object.keys(attributes)) {
        handleAttribute(domElement, attributeName, attributes[attributeName])
      }
    }

    function handleAttribute(domElement: HTMLElement, attributeName: string, value: any) {
      const transformedAttribute = transformAttribute(that, attributeName, value, domElement)
      if (typeof transformedAttribute === 'string') {
        domElement.setAttribute(attributeName, transformedAttribute)
      } else {
        handleAttributes(domElement, transformedAttribute)
      }
    }
    return element
  }
}

function transformAttribute(element: JessieElement, attributeName: string, value: any, htmlElement: HTMLElement): string | TransformedAttribute {
  const transformers = getTransformers(element.tagName, attributeName)
  return transformers.reduce((memo: any, transformer) => transformer(memo, attributeName, element, htmlElement), value)
}

export function createDOMElement(tagName: string, attributes: Attributes, ...children: ChildType[]) {
  attributes = attributes || {}
  if (typeof tagName !== 'string') {
    throw new Error('Components are not supported.')
  } else {
    return new JessieElementImpl(tagName, attributes, children).toDOM(document)
  }
}

export function createJessieElement(tagName: string, attributes: Attributes, ...children: ChildType[]) {
  attributes = attributes || {}
  if (typeof tagName !== 'string') {
    throw new Error('Components are not supported.')
  } else {
    return new JessieElementImpl(tagName, attributes, children)
  }
}

export default createJessieElement

function isArrayLike<T>(t: T | T[]): t is T[] {
  return typeof t !== 'string' && (length in (t as any))
}
