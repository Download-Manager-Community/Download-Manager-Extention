document.addEventListener('DOMContentLoaded', load, false);
var serverPortText;
var serverPort;

function load(){
    document.getElementById("submit").addEventListener("click", submitForm);
    serverPortText = document.getElementById("serverPort");
    if(serverPortText == null){
        alert("The extention failed to load correctly. Please restart the extention.");
        console.error("serverPortText is null!");
        return;
    }

    serverPort = chrome.storage.local.get(['port'], function(result) {
       if(result.port == null || result.port == "" || result.port == "undefined"){
           chrome.storage.local.set({"port": "65535"}, function() {
            console.log('Server port should now be set to 65535');
            serverPort = chrome.storage.local.get(['port'], function(result1) {
                serverPortText.value = result1.port;
                serverPort = result1.port;
                console.log('Set server port to ' + result1.port);
            });
           });
       }
       serverPortText.value = result.port;
       serverPort = result.port;
       console.log('Port currently is ' + result.port);
    });
}

function submitForm(){

    if(serverPort == null || serverPortText == null){
        console.error("serverPort or serverPortText is null!");
    }
    else{
        var serverPortBoxNumber = parseInt(+serverPortText.value); 

        // Check if the port is a number from 1025 to 65535
        if(serverPortBoxNumber < 1025 || serverPortBoxNumber > 65535 || isNaN(serverPortBoxNumber)){
            alert("The port must be a number between 1025 and 65535.");
            return;
        }

        serverPort = serverPortBoxNumber;

        chrome.storage.local.set({"port": serverPortBoxNumber}, function() {
            alert('Set server port to: ' + serverPortBoxNumber);
          });
    }
}

/*chrome.storage.local.set({key: value}, function() {
    console.log('Value is set to ' + value);
  });
  
  chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });*/