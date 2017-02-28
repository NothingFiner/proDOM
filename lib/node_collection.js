class NodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(content) {
    if (this.nodes.length > 0) {
      if (typeof content === 'string') {
        this.each((node, i) => {
          this.nodes[i].innerHTML = content;
        });
      }
      return this.nodes[0].innerHTML;
    }
    return console.error('invalid argument for method html');
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.nodes.length === 0) return console.error(`${this} is not a valid NodeCollection object.`);
    if (typeof children === 'string') {
      this.each(node => $(node).html(node.innerHTML.concat(children)));
    } else if (typeof children === 'object') {
      const childCollection = children instanceof NodeCollection ? children : $(children);
      this.each((node) => {
        childCollection.each(childNode => node.appendChild(childNode.cloneNode(true)));
      });
    }
    return this.nodes;
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.each(node => node.setAttribute(key, val));
    }
    return this.nodes[0].getAttribute(key);
  }

  addClass(name) {
    this.each(node => node.classList.add(name));
  }

  removeClass(name) {
    this.each(node => node.classList.remove(name));
  }

}

export default NodeCollection;
