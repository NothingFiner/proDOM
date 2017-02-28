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
    if (this.nodes.length === 0) return;
    if (typeof children === 'string') {
      this.each((node, i) => $(node).html(node.innerHTML.concat(children)));
    } else if (typeof children === 'object') {
      const childCollection = children instanceof NodeCollection ? children : $(children);
      this.each((node) => {
        childCollection.each(childNode => node.appendChild(childNode.cloneNode(true)));
      });
    }
  }
}

export default NodeCollection;
