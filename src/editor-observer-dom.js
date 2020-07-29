let observer = null

export const doDomObserver = function (observedDom, domReadyCb) {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  const MutationObserverConfig = {
    childList: true,
    subtree: true,
    characterData: true
  };
  
  observer = new MutationObserver(function(mutations){
    domReadyCb(mutations);
  });

  observer.observe(observedDom, MutationObserverConfig);
}

export const disableObserver = function() {
  observer.disconnect()
}
