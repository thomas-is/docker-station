
function boot() {
//  setInterval(queryContainers, 1000);
//  queryContainers();
}


function queryContainers() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onGetContainers);
  oReq.open("GET", "/containers.php");
  oReq.send();
}


function queryVolumes() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onGetVolumes);
  oReq.open("GET", "/volumes.php");
  oReq.send();
}

function onGetContainers() {
  const data = JSON.parse(this.responseText);
  const parentNode = document.querySelector("#containers");
  clearOutputNodes();
  new jDOM( parentNode , data, "containers" );
}
function onGetVolumes() {
  const data = JSON.parse(this.responseText);
  const parentNode = document.querySelector("#volumes");
  clearOutputNodes();
  new jDOM( parentNode , data, "volumes" );
}

function clearOutputNodes() {
  clearNodeId("containers");
  clearNodeId("volumes");
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
