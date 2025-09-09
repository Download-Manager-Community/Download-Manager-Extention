// Sort out the context menu
var windowTopTab = [];
var curWin = 1;

// Add a listener for when the active tab is changed
chrome.tabs.onActivated.addListener(function(activeInfo) {
  windowTopTab[activeInfo.windowId] = activeInfo.tabId;
  recreateStuff();
});

// Add a listener for when the active window is changed
chrome.windows.onFocusChanged.addListener(function(windowId) {
  curWin = windowId;
  recreateStuff();
});

// Add a listener for when the active tab is changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (windowTopTab[curWin])
    if (windowTopTab[curWin] == tabId) {
      recreateStuff();
    }
});

// Define the context menu
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "downloadWithManager",
        title: "Download with Download Manager",
        contexts: ["link"]
    });
});

// Regex for YouTube
var regex = new RegExp("^(https?\:\/\/)?((www?\.|m?\.)?youtube\.com|^(https?\:\/\/)?(www?\.)?youtu\.be)\/.+$")

function recreateStuff() {  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0];
    var curUrl = activeTab.url;

    console.log("Tab switched to: " + curUrl)
    
    if(curUrl.match(regex) == null){
      if(curUrl.indexOf("youtube.com") >= 0 || curUrl.indexOf("youtu.be") >= 0){
        // YouTube
        console.log("Is YouTube");

        // Disable the context menu
        chrome.contextMenus.update("downloadWithManager", {
            enabled: false
        });
      }
      else{
        // Not YouTube
        console.log("Not YouTube");

        // Enable the context menu
        chrome.contextMenus.update("downloadWithManager", {
            title: "Download with Download Manager",
            contexts: ["link"],
            enabled: true,
            onclick: function (info, tab) {
                contextOnClick(info, tab);
            }
        });
      }
    }
    else{
      // YouTube
      console.log("Is YouTube");

      // Disable the context menu
      chrome.contextMenus.update("downloadWithManager", {
          enabled: false
      });
    }
  });
}

function contextOnClick(info, tab) {
  chrome.storage.local.get(['port'], function(result) {
    if(info.linkUrl != "" && info.linkUrl != null){
      try{
        console.log('Link URL:' + info.linkUrl)
        httpGet('http://localhost:' + result.port + '/?url="' + info.linkUrl + '"');
      }
      catch(err){
        console.error(err);
        alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
      }
    }
    else{
      try{
        console.log('Page URL: ' + info.pageUrl)
        httpGet('http://localhost:' + result.port + '/?url="' + info.pageUrl + '"');
      }
      catch(err){
        console.error(err);
        alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
      }
    }
  });
}

chrome.storage.local.get(['port'], function(result) {
  if(result.port == null || result.port == "" || result.port == "undefined"){
      chrome.storage.local.set({"port": "65535"}, function() {
       console.log('Performing first time setup, server port should now be set to 65535.');
       serverPort = chrome.storage.local.get(['port'], function(result1) {
           console.log('Set server port to: ' + result1.port);
       });
      });
  }
  console.log('Server port: ' + result.port);
});

chrome.webRequest.onHeadersReceived.addListener(
  function(details) { 
    // return {cancel: true};
    
    chrome.storage.local.get(['extToggle'], function(result) {
      window.toggleExt = result.extToggle;
    });

    if(window.toggleExt == null){
      console.warn("Could not determine extension toggle state.\nDefaulting to disabled.");
    }
    else{
      if(window.toggleExt == true){
        if(details.url.indexOf("www.bing.com/vs/ec/stop.mp3") >= 0 ||
        details.url.indexOf("www.bing.com/vs/ec/start.mp3") >= 0 ||
        details.url.indexOf("mp3+") >= 0 ||
        details.url.indexOf("mp3&") >= 0 ||
        details.url.indexOf("upload.") >= 0 ||
        details.url.indexOf("partner.microsoft.com") >= 0 ||
        details.url.indexOf("adfoc.us") >= 0 ||
        details.url.indexOf("adloadx") >= 0 ||
        details.url.indexOf(".pipe.") >= 0 ||
        details.url.indexOf("chrome-extension://") >= 0 ||
        details.url.indexOf("exef") >= 0) {
          console.warn("Could not download. Download url is in URL blacklist.");
          return {cancel: false}; 
        }
        else{
          if(details.url.indexOf('.zip') >=0){
            console.log("Blocking request.");
            return {cancel: true};
          }
          else if(details.url.indexOf(".7z") >=0){
            console.log("Blocking request.");
            return {cancel: true};
          }
          else if(details.url.indexOf(".rar") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".iso") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if (details.url.indexOf(".img") >= 0) {
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".exe") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if (details.url.indexOf(".jar") >= 0) {
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".msi") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".aif") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".cda") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".mid") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".midi") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".mp3") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".mpa") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".ogg") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".wav") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".wma") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".wpl") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".mp4") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".vsix") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".py") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".txt") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".log") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".tar") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".rbxl") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".rbxm") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".doc") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".docx") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".ppt") >=0){
            console.log("Blocking request.");
            return {cancel: true}; 
          }
          else if(details.url.indexOf(".bin") >=0){
            if(details.url.indexOf(".bing") >=0){
              console.warn("URLs containing .bin like .bing will be picked up as a download. If this happens please file a bug report.");
            }
            else{
              console.log("Blocking request.");
              return {cancel: true}; 
            }
          }
          else{
            console.log("Request does not contain any download type so has not been blocked.");
            return {cancel: false};
          }
        }
      }
      else {
        console.log("Extension is disabled. Request has not been blocked.");
        return {cancel: false};
      }
    }
  },
  {urls: ["<all_urls>"]},
  ["responseHeaders", "blocking"]);

  /*
      
      else{
        console.log("Request does not contain any download type so has not been blocked.");
      }
    }
  }
  else{
    console.log("Extension is disabled. Request has not been blocked.");
  }
  });
}, {
  urls: ["<all_urls>"],
  types: ["main_frame", "sub_frame"]
},*/

chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
      console.log (details.url);
      chrome.storage.local.get(['extToggle'], function(result) {  
        if(result.extToggle == true){
        if (details.url.indexOf("www.bing.com/vs/ec/stop.mp3") >= 0 ||
            details.url.indexOf("www.bing.com/vs/ec/start.mp3") >= 0 ||
            details.url.indexOf("mp3+") >= 0 ||
            details.url.indexOf("mp3&") >= 0 ||
            details.url.indexOf("upload.") >= 0 ||
            details.url.indexOf("partner.microsoft.com") >= 0 ||
            details.url.indexOf("adfoc.us") >= 0 ||
            details.url.indexOf("adloadx") >= 0 ||
            details.url.indexOf(".pipe.") >= 0 ||
            details.url.indexOf("chrome-extension://") >= 0 ||
            details.url.indexOf("exef") >= 0) {
        console.warn("Could not download " + details.url + ". Download url is in URL blacklist.");
      }
      else{
        if(details.url.indexOf(".zip") >=0){
          console.log("Request url contains .zip which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.includes(".7z")){
          console.log("Request url contains .7z which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".rar") >=0){
          console.log("Request url contains .rar which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".iso") >=0){
          console.log("Request url contains .iso which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if (details.url.indexOf(".img") >= 0) {
            console.log("Request url contains .iso which is a download type. Sending to Download Manager.");
            chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".exe") >=0){
          console.log("Request url contains .exe which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if (details.url.indexOf(".jar") >= 0) {
            console.log("Request url contains .jar which is a download type. Sending to Download Manager.");
            chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".msi") >=0){
          console.log("Request url contains .msi which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".aif") >=0){
          console.log("Request url contains .aif which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".cda") >=0){
          console.log("Request url contains .cda which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".mid") >=0){
          console.log("Request url contains .mid which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".midi") >=0){
          console.log("Request url contains .midi which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".mp3") >=0){
          console.log("Request url contains .mp3 which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".mpa") >=0){
          console.log("Request url contains .mpa which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".ogg") >=0){
          console.log("Request url contains .ogg which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".wav") >=0){
          console.log("Request url contains .wav which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".wma") >=0){
          console.log("Request url contains .wma which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".wpl") >=0){
          console.log("Request url contains .wpl which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".mp4") >=0){
          console.log("Request url contains .mp4 which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".vsix") >=0){
          console.log("Request url contains .visx which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".py") >=0){
          console.log("Request url contains .py which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".txt") >=0){
          console.log("Request url contains .txt which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".log") >=0){
          console.log("Request url contains .log which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".tar") >=0){
          console.log("Request url contains .tar which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".doc") >=0){
          console.log("Request url contains .doc which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".docx") >=0){
          console.log("Request url contains .docx which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".ppt") >=0){
          console.log("Request url contains .ppt which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".rbxl") >=0){
          console.log("Request url contains .rbxl which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".rbxm") >=0){
          console.log("Request url contains .rbxm which is a download type. Sending to Download Manager.");
          chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
        }
        else if(details.url.indexOf(".bin") >=0){
          if(details.url.indexOf(".bing") >=0){
            console.warn("URLs containing .bin like .bing will be picked up as a download. If this happens please file a bug report.");
          }
          else{
            console.log("Request url contains .bin which is a download type. Sending to Download Manager.");
            chrome.storage.local.get(['port'], function(result) {
            try{
              httpGet('http://localhost:' + result.port + '/?url="' + details.url + '"');
            }
            catch(err){
              console.error(err);
              alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
            }
            console.log('Server port value is ' + result.port);
          });
          }
        }
      }
    }
    else{
      console.log("Extension is disabled. Not sending to Download Manager.");
    }
    });
    },
  
    {urls: ["<all_urls>"]},
  
    ["blocking"]
);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}