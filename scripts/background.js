chrome.contextMenus.create({
  "title": "Download with Download Manager",
  "contexts": ["link"],
  "onclick": function(info, tab) {
    chrome.storage.local.get(['port'], function(result) {
      try{
        httpGet('http://localhost:' + result.port + '/?url="' + info.linkUrl + '"');
      }
      catch(err){
        console.error(err);
        alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
      }
    });
  }
});

chrome.contextMenus.create({
  "title": "Download YouTube Video with Download Manager",
  "contexts": ["page"],
  "documentUrlPatterns": ["*://www.youtube.com/*"],
  "onclick": function(info, tab) {
    chrome.storage.local.get(['port'], function(result) {
      try{
        httpGet('http://localhost:' + result.port + '/?url=' + info.pageUrl + '&ytdownload=True');
      }
      catch(err){
        console.error(err);
        alert("Failed to send download request to internal server.\nIf the issue persists try the following:\n - Check that Download Manager is running.\n - Ensure the port number is correct in Advanced Options.\n - Try using a different port number.\n - Try restarting Download Manager and your browser.");
      }
    });
  }
});

chrome.webRequest.onHeadersReceived.addListener(
  // ... your code that checks whether the request should be blocked ...
  //  (omitted for brevity)

  function(details) { 
    // return {cancel: true};
    
    chrome.storage.local.get(['extToggle'], function(result) {
      window.toggleExt = result.extToggle;
    });

    if(window.toggleExt == null){
      console.error("Could not determine extension toggle state.\nDefaulting to disabled.");
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
        console.log("Extention is disabled. Request has not been blocked.");
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
    console.log("Extention is disabled. Request has not been blocked.");
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
      console.log("Extention is disabled. Not sending to Download Manager.");
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