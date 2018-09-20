import {createDomaterElement} from '../src/jsx'
import jsdom from 'jsdom'

describe('transformer-test', function () {

  it('className becomes class', function () {
    const element = <div className='test'/>
    expect(element.toDOM(createDocument()).outerHTML).toBe('<div class="test"></div>')
  })

  describe('class array', function () {
    it('simple case', function () {
      const element = <div class={['a', 'b']}/>
      expect(element.toDOM(createDocument()).outerHTML).toBe('<div class="a b"></div>')
    })

    it('falsy values are omitted', function () {
      const element = <div class={['a', null, undefined, '', 0, 'b']}/>
      expect(element.toDOM(createDocument()).outerHTML).toBe('<div class="a b"></div>')
    })
  })

  describe('style object', function () {
    it('simple case', function () {
      const element = <div style={{color: 'red'}}/>
      expect(element.toDOM(createDocument()).outerHTML).toBe('<div style="color: red"></div>')
    })

    it('multiple styles', function () {
      const element = <div style={{color: 'red', display: 'none'}}/>
      expect(element.toDOM(createDocument()).outerHTML).toBe('<div style="color: red; display: none"></div>')
    })

    it('dashed styles', function () {
      const element = <div style={{'border-color': 'red'}}/>
      expect(element.toDOM(createDocument()).outerHTML).toBe('<div style="border-color: red"></div>')
    })

    it('camelCase styles', function () {
      const element = <div style={{borderColor: 'red'}}/>
      expect(element.toDOM(createDocument()).outerHTML).toBe('<div style="border-color: red"></div>')
    })
  })

  it('event handlers', function() {
    const document = createDocument()
    const element = <button onClick={(e: any) => {e.target.textContent = 'clicked'}} />
    const domButton = element.toDOM(document)
    domButton.click()
    expect(domButton.textContent).toBe('clicked')
  })
})

function createDocument() {
  const window = new jsdom.JSDOM('<html />').window
  return window.document
}