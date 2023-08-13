function load() {
  handleAdd();
  handleStoneConfig();
  webSocket();
}
function handleAdd() {
  document.getElementById("addButton").addEventListener('click', getSum);

  // button click callback
  function getSum() {
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    let x = document.getElementById('x').value;
    let y = document.getElementById('y').value;
    httpRequest.onreadystatechange = () => showSum(httpRequest);
    httpRequest.open('POST', 'add.gs');
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send('{"x":' + x + ',"y":' + y + '}');
  }

  // received response to request
  function showSum(httpRequest) {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        let sum = response['sum'];
        document.getElementById('sum').value = sum;
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
}
function handleStoneConfig() {
  document.getElementById("configButton").addEventListener('click', getConfig);

  // button click callback
  function getConfig() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = addConfigRows;
    httpRequest.open('GET', 'stone.gs');
    httpRequest.send();
  }

  // received response to request
  function addConfigRows() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        var tbody = document.querySelector("tbody");
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            let row = tbody.insertRow();
            let cell = row.insertCell();
            let text = document.createTextNode(key);
            cell.appendChild(text);
            cell = row.insertCell();
            text = document.createTextNode(response[key]);
            cell.appendChild(text);
          }
        }
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
}
function webSocket() {
  const pieces1 = window.location.href.split(':');
  const protocol = pieces1[0].endsWith('s') ? 'wss:' : 'ws:';
  const pieces2 = pieces1[2].split('/');
  const serverURL = protocol + pieces1[1] + ':' + pieces2[0] + '/webSocket.gs';
  console.log(serverURL);

  let socket;
  // variables for the DOM elements:
  let incomingSpan;
  let outgoingText;
  let connectionSpan;
  let connectButton;

  function setup() {
    // get all the DOM elements that need listeners:
    incomingSpan = document.getElementById('incoming');
    outgoingText = document.getElementById('outgoing');
    connectionSpan = document.getElementById('connection');
    connectButton = document.getElementById('connectButton');
    // set the listeners:
    outgoingText.addEventListener('change', sendMessage);
    connectButton.addEventListener('click', changeConnection);
    openSocket(serverURL);
  }

  function openSocket(url) {
    // open the socket:
    socket = new WebSocket(url);
    socket.addEventListener('open', openConnection);
    socket.addEventListener('close', closeConnection);
    socket.addEventListener('message', readIncomingMessage);
  }


  function changeConnection(event) {
    // open the connection if it's closed, or close it if open:
    if (socket.readyState === WebSocket.CLOSED) {
      openSocket(serverURL);
    } else {
      socket.close();
    }
  }

  function openConnection() {
    // display the change of state:
    connectionSpan.innerHTML = "true";
    connectButton.value = "Disconnect";
  }

  function closeConnection() {
    // display the change of state:
    connectionSpan.innerHTML = "false";
    connectButton.value = "Connect";
  }

  function readIncomingMessage(event) {
    // display the incoming message:
    incomingSpan.innerHTML = event.data;
  }

  function sendMessage() {
    //if the socket's open, send a message:
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(outgoingText.value);
    }
  }

  setup();
}
