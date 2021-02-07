
function boot() {
//  setInterval(queryContainers, 1000);
  queryContainers();
}


function queryContainers() {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", onGetContainers);
  oReq.open("GET", "/containers.php");
  oReq.send();
}

function onGetContainers() {
  const data = JSON.parse(this.responseText);
  const parentNode = document.querySelector("#containers");
  while( parentNode.firstChild ) {
    parentNode.removeChild(parentNode.firstChild);
  }
  new jDOM( parentNode , data, "containers" );
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
