
function query( endpoint ) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", () => render( endpoint, oReq.response) );
  oReq.open("GET", "/"+endpoint+".php");
  oReq.send();
}

function render(className, json) {
  const data = JSON.parse(json);
  clearNodeId("output");
  new jDOM( document.querySelector("#output"), data, className );
}

function clearNodeId( id ) {
  const node = document.querySelector("#"+id);
  if( ! node ) { return; }
  while( node.firstChild ) {
    node.removeChild(node.firstChild);
  }
}


class jDOM {

  constructor( parentNode, data, key = "jdom" ) {

    this.parentNode = parentNode;
    this.key        = key;
    this.data       = data;
    this.node       = document.createElement("span");

    if( ! this.parentNode.classList.contains("array") ) {
      this.node.classList.add(this.key);
    }
    if( Array.isArray(data) ) {
      this.node.classList.add("array");
    }

    if( typeof(data) == "object" ) {
      for( let key in data ) {
        new jDOM( this.node, data[key], key) 
      }
    } else {
      this.node.innerText = data;
    }

    this.parentNode.appendChild(this.node);

  }


}
