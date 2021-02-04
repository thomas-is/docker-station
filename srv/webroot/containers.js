
function boot() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onGetContainers);
  oReq.open("GET", "/containers.php");
  oReq.send();
}

function onGetContainers() {
  const containers = JSON.parse(this.responseText);
  const contextNode = document.querySelector("div#containers");
  for( let index in containers ) {
    new containerNode( contextNode, containers[index] ) ;
  }
}


class containerNode {
  constructor( contextNode,  props ) {
    this.contextNode = contextNode;
    this.props       = props;
    this.node        = document.createElement("div");

    this.contextNode.appendChild(this.node);

    this.node.classList.add("container");
    this.node.innerHTML = document.querySelector("template#container").innerHTML;

    this.node.querySelector("p.name").innerText = this.props.Names[0];
    this.node.querySelector("p.state").innerText = this.props.State;
    this.node.querySelector("p.status").innerText = this.props.Status;

  }
}
