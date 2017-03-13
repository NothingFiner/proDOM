# proDOM
:link::link::link::link::link::link::link::link::link::link::link::link::link::link::link::link::link::link::link::link:

proDOM is a lightweight library, inspired by jQuery, with DOM manipulation so good it hurts.

With proDOM users can:
  * Select any amount of DOM Elements using a variety of selectors
  * Traverse and manipulate those Elements
  * Append or replace elements in the DOM
  * Queue functions to be executed after the DOM finishes loading
  * Simplify AJAX requests

proDOM is built around the `NodeCollection` class. An instance of this class is created when `$()` is passed either a String(selector) or HTMLElement object. Passing a function into `$()` will delegate that function to the registerReadyCallbacks function, pushing the function into an array to be called, in order, after the DOM has been loaded. Doing this after the DOM has loaded will simply call the function.

## NodeCollection methods

`NodeCollection` has several methods with which Users can manipulate the DOM. These are generally abstractions of native DOM api.

#### `.each(callback)`
invokes the callback function on each element contained in a `nodes` attribute of a given `NodeCollection`.

A simple wrapper for the `.forEach` method. Does not take index.

#### `.html(content)`

With a valid string `content` as an argument changes the inner HTML of each node to the value of `content`.

Always returns the value of the innerHTML of the first node in the node collection.

#### `.empty()`

alias method for `.html('')`. Sets innerHTML for all nodes to an empty string.

#### `.append(children)`

appends `children` to each element of `nodes`, if `children` is a string or instance of `NodeCollection`.

Always returns the value of `nodes`.

#### `.remove()`

Removes all `nodes` from the DOM.
Returns value of `nodes`.

#### `.attr(key, value)`

If passed `key` and `value` arguments will set attribute `key` to `value` on each `node`.

Returns the value of attribute `key` on the first element of `nodes`.

#### `.addClass(string)`

Adds string from each element of `nodes`. Wrapper for `classList.add`.

#### `.removeClass(string)`

Removes string from each element of `nodes`. Wrapper for `classList.remove`.

#### `.find([selector = '*'])`

returns all child elements of `nodes` matching a given `selector` as a new `NodeCollection`.

`selector` defaults to `'*'`, which will return all child elements of `nodes`.

#### `.children()`

Returns all child elements of `nodes` as a new `NodeCollection`.

#### `.parent()`

Returns the parent elements of each `node` as a new `NodeCollection`.

#### `.bind(eventName, callback)`

creates an event listener of `eventName` and binds a function `callback` to each `node`.

#### `.release(eventName)`

removes the event listener `eventName` from each `node`.

## Merge and Ajax

### `$.merge(src, ...objects)`

Merges a `src` object with any number of of other objects and returns the resulting object.

## `$.ajax({options})`

Returns a promise wrapped around an instance of `XMLHttpRequest`

valid keys for `options` are:
- `method`: method for request. defaults to 'GET',
- `url`: url for request
- `data`: data to be included in request header
- `contentType`: expected content type for response, defaults to `application/x-www-form-urlencoded; charset=UTF-8`
- `success`: callback function for success
- `failure`: callback function for failure
