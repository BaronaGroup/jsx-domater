# JessieDOM -- JSX to DOM

This is a simple library that in combination with other code transformation tools such as
babel or typescript allows you to use JSX to create DOM nodes.

If you are simply targeting a browser you'll perhaps want to use [jsx-dom](https://www.npmjs.com/package/jsx-dom)
instead as a slightly more complete options. The main downside of that library though is that
it expect to find a `document` object in the global scope, which is a problem if you're doing,
say, server-side rendering with jsdom.

And that's where this library comes in.

## Setup

The library exports two functions that can act as the JSX `createElement` function:

- `createDOMElement` which creates a straight up DOM node using global document
- `createJessieElement` which creates an object, on which you can call `.toDOM(document)` with
  any document object you want. This is also exported as plain `createElement`, which can be useful
  at times. 
  
The recommended way to do things is to set up is to import one of the two functions and set up
your build to use it instead of `React.createElement`. With typescript that'll happen by
setting the value for the `jsxFactory` config variable to `createJessieElement`

## Features

### Classes

You can use attribute `className` as an alternative to `class`.

The value for classes can be a string, or it can be an array. Falsy values within the array are ignored,
allowing for easy conditional classes.

    <div class="myclass" />
    <div class={["myclass"]} />
    <div class={["myclass", "myclass2"]} />
    <div class={[condition && "myclass"]} />
    
### Styles
 
The `style` attribute can be a string, or it can be an object. The keys for the object can
follow either css conventions with dashes, or camel case.

    <div style="display: none" />
    <div style={{display: 'none'}} />
    <div style={{'border-color': 'red'}} />
    <div style={{borderColor: 'red'}} />

### Event handlers

Attributes that begin with `on` and contain a function as a value are added as event
handlers using `addEventListener`. The character following `on` is lowercased, allowing
for `onClick` to match `click` event; this is not done for any other uppercase characters.

    <button onclick={() => document.location.reload()} />
    <button onClick={() => document.location.reload()} />
    
    
### Custom attribute transformations

Groundwork exists for setting up other custom attribute transformations as well, but
at this time this functionality is not documented.
