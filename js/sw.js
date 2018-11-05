//Make sure the SW is supported then rigester it
if(navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw_cached.js');
  });
}
