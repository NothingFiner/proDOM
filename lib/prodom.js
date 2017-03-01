import NodeCollection from './node_collection';

let documentReady = false;
const readyCallbacks = [];

const registerReadyCallbacks = (func) => {
  if (documentReady) {
    return func();
  }
  readyCallbacks.push(func);
};

const getNodes = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodeArray = Array.from(nodes);
  return new NodeCollection(nodeArray);
};

const queryFormatter = (obj) => {
  let result = '';
  for (const prop in obj){
    if (obj.hasOwnProperty(prop)) {
      result = result.concat(`${prop}=${obj[prop]}&`);
    }
  }
  return result.substring(0, result.length - 1);
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

$.merge = (src, ...objects) => {
  const newObj = Object.assign({}, src);
  objects.forEach((object) => {
    for(const prop in object) {
      newObj[prop] = object[prop];
    }
  });
  return newObj;
};

$.ajax = (options) => {
  return new Promise((resolve, reject) => {
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: 'GET',
      url: '',
      success: () => {},
      error: () => {},
      data: {},
    };
    options = $.merge(defaults, options);
    options.method = options.method.toUpperCase();

    if (options.method === 'GET') {
      options.url = options.url.concat(`?${queryFormatter(options.data)}`);
    }

    const req = new XMLHttpRequest();
    req.open(options.method, options.url, true);
    req.onload = () => {
      if (req.status === 200) {
        options.success(req.response);
        resolve(req.response);
      } else {
        options.error(req.response);
        reject(req.response);
      }
    };

    req.send(JSON.stringify(options.data));
  });
};

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  readyCallbacks.forEach(func => func());
});
