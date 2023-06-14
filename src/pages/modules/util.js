export const getLocalStorage = (key, nullable) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      if(result[key]){
        resolve(result[key]);
      } else {
        resolve(nullable);
      }
    });
  })
    
  };
  
  export const setLocalStorage = (key, value) => {
    chrome.storage.local.set({[key]: value})
  };
  
  export const getPluginVersion = () => {
    return chrome.runtime.getManifest().version;
  };
  
  