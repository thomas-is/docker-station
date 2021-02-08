
function query( endpoint ) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", () => filterResponse(oReq.response, endpoint) );
  oReq.open("GET", "/"+endpoint+".php");
  oReq.send();
  clearNodeId("output");
}

function render(className, data) {
  jdom(data, className, document.querySelector("#output"));
  document.querySelector("#output").classList.remove("syncing");
}

function clearNodeId( id ) {
  const node = document.querySelector("#"+id);
  if( ! node ) { return; }
  while( node.firstChild ) {
    node.removeChild(node.firstChild);
  }
  node.classList.add("syncing");
}

function filterResponse( json, endpoint ) {
  const source = JSON.parse(json);
  switch(endpoint) {
   case "services":
    render( endpoint, mapServices(source) );
    break;
   case "containers":
    render( endpoint, mapContainers(source) );
    break;
   case "volumes":
    render( endpoint, mapVolumes(source) );
    break;
   default:
    render("",data);
  }
}

function mapContainers( source ) {
  let data = [];
  for( let index in source ) {
    data.push(
      {
        "Name":   source[index].Names[0][0] == "/" ? source[index].Names[0].substring(1) : source[index].Names[0],
        "State":  source[index].State,
        "Status": source[index].Status,
      }
    );
  }

  data.sort( (a, b) => { return a.Name < b.Name ? -1 : 1 });

  return data;
}

function mapVolumes( source ) {
  let data = [];
  console.log(source);
  for( let index in source.Volumes ) {
    data.push(
      {
        "Name":   source.Volumes[index].Name,
        "Driver":  source.Volumes[index].Driver,
        "Mountpoint": source.Volumes[index].Mountpoint,
      }
    );
  }

  data.sort( (a, b) => { return a.Name < b.Name ? -1 : 1 });

  return data;
}

function mapServices( source ) {
  let data = {};
  console.log(source);
}





function jdom( data, key = "jdom", parentNode = null ) {

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
      jdom( data[key], key, span)
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
