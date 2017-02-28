class NodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(string) {
    if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
    return this.each((node, i) => {
      this.elements[i].innerHTML = string;
    });
  }

  empty() {
    this.html('');
  }
}

export default NodeCollection;
