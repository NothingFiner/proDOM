import NodeCollection from './node_collection';

let documentReady = false;
const readyCallbacks = [];

const registerReadyCallbacks = (func) => {
  if (documentReady) {
    readyCallbacks.push(func);
  }
  func();
};

const getNodes = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodeArray = Array.from(nodes);
  return new NodeCollection(nodeArray);
};

window.$ = (arg) => {
  switch (typeof arg) {
    case 'function':
      return registerReadyCallbacks(arg);
    case 'string':
      return getNodes(arg);
    case 'object':
      if (arg instanceof HTMLElement) {
        return new NodeCollection([arg]);
      }
      return console.error('proDOM only accepts objects as arguments if they are instances of HTMLElement');
    default:
      return console.error('proDOM accepts Strings, Functions, and instances of HTMLElement as arguments');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  readyCallbacks.forEach(func => func());
});
