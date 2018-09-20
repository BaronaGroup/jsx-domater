import {createDomaterElement} from '../src/jsx'
import jsdom from 'jsdom'

describe('simple-test', function() {

  it('a simple element', function() {
    const element = <div>test</div>
    expect(element.toDOM(createDocument()).outerHTML).toBe('<div>test</div>')
  })

  it('a few nested elements', function() {
    const element = <div><span><a>hello</a></span></div>
    expect(element.toDOM(createDocument()).outerHTML).toBe('<div><span><a>hello</a></span></div>')
  })

  it('sibling elements', function() {
    const element = (
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    )

    expect(element.toDOM(createDocument()).outerHTML).toBe('<ul><li>1</li><li>2</li></ul>')
  })

  it('an array of children', function() {
    const element = (
      <ul>
        {[<li>1</li>, <li>2</li>]}
      </ul>
    )

    expect(element.toDOM(createDocument()).outerHTML).toBe('<ul><li>1</li><li>2</li></ul>')
  })

  it('attributes', function() {
    const element = <div class='test' />
    expect(element.toDOM(createDocument()).outerHTML).toBe('<div class="test"></div>')
  })
})

function createDocument() {
  const window = new jsdom.JSDOM('<html />').window
  return window.document
}