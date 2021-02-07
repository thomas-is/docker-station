
function query( endpoint ) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", () => render( endpoint, oReq.response) );
  oReq.open("GET", "/"+endpoint+".php");
  oReq.send();
}

function render(className, json) {
  const data = JSON.parse(json);
  clearNodeId("output");
  jDOM(data, className, document.querySelector("#output"));
}

function clearNodeId( id ) {
  const node = document.querySelector("#"+id);
  if( ! node ) { return; }
  while( node.firstChild ) {
    node.removeChild(node.firstChild);
  }
}


function jDOM( data, key = "jdom", parentNode = null ) {

  let span = document.createElement("span");

  if( parentNode ) {
    if( ! parentNode.classList.contains("array") ) {
      span.classList.add(key);
    }
  }

  if( Array.isArray(data) ) {
    span.classList.add("array");
  }

  if( typeof(data) == "object" ) {
    for( let key in data ) {
      jDOM( data[key], key, span)
    }
  } else {
    span.innerText = data;
  }

  if( parentNode ) {
    parentNode.appendChild(span);
    return;
  }

  return span;

}
