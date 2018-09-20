import {IDomaterElement} from './jsx'

type Transformer = (value: any, attributeName: string, element: IDomaterElement, htmlElement: HTMLElement) => any

interface TransformerDeclaration {
  transformer: Transformer
  tagName: string | undefined
  attributeName: string | undefined
}

const transformers: TransformerDeclaration[] = []

export function register(tagName: string | undefined, attributeName: string | undefined, transformer: Transformer) {
  transformers.unshift({tagName, attributeName, transformer})
}

export function getTransformers(tagName: string, attributeName: string) {
  return transformers.filter(td => (td.tagName === undefined || td.tagName === tagName) && (td.attributeName === undefined || td.attributeName === attributeName))
    .map(td => td.transformer)
}
