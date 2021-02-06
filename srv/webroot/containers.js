
function boot() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onGetContainers);
  oReq.open("GET", "/containers.php");
  oReq.send();
}

function onGetContainers() {
  const data = JSON.parse(this.responseText);
  new containersList(data);
}

class containersList {

  constructor( data ) {
    this.node = document.querySelector("div#containers");
    this.initialHTML = this.node.innerHTML;
    this.data = data;
    this.render();
  }

  render( sortBy = "name" ) {
    this.node.innerHTML = this.initialHTML;
    switch(sortBy) {
      case "name":
      default:
        this.data.sort((a, b) => (a.Names[0] > b.Names[0]) ? 1 : -1);
    }
    for( let index in this.data ) {
      new container( this.node, this.data[index] ) ;
    }
  }

}


class container {

  constructor( parentNode, data ) {
    this.parentNode = parentNode;
    this.data       = data;
    this.node       = document.createElement("div");

    this.parentNode.appendChild(this.node);

    this.node.classList.add("container");
    this.node.innerHTML = document.querySelector("template#container").innerHTML;

    this.node.querySelector("p.name"  ).innerText = this.data.Names[0];
    this.node.querySelector("p.state" ).innerText = this.data.State;
    this.node.querySelector("p.status").innerText = this.data.Status;

  }

}
