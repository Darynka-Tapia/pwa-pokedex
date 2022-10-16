let swRegistration = null;
function initializeApp() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');
  
      //Register the service worker
      navigator.serviceWorker
        .register('./sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);
          // We are storing the service worker, globally
          swRegistration = swReg;
          initializeUi('notifications');
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
    }
  }

  initializeApp();

  function initializeUi(idName, pokeName, pokeImage) {
    const notificationButton = document.getElementById(idName);
    notificationButton.addEventListener('click', () => {
      //Do something here
      console.log('click a notification button');
      displayNotification(pokeName, pokeImage);

    });
  }

  function displayNotification(pokeName, pokeImage) {
    //Ask user if we show notifications
    if (window.Notification && Notification.permission === 'granted') {
      notification(pokeName, pokeImage);
      // We will crete this function in a further step.
    }
    // If the user hasn't told whether he wants to be notified or not
    // Note: because of Chrome, we cannot be sure the permission property
    // is set, therefore it's unsafe to check for the "default" value.
    else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(status => {
        if (status === 'granted') {
          notification(pokeName, pokeImage);
        } else {
          alert('You denied or dismissed permissions to notifications.');
        }
      });
    } else {
      // If the user refuses to get notified
      alert(
        'You denied permissions to notifications. Please go to your browser or phone setting to allow notifications.'
      );
    }
  }

  function notification(pokeName, pokeImage) {
    const options = {
      body: `${pokeName} ¡Yo te elijo!`,
      icon: pokeImage
    };
    swRegistration.showNotification(`${pokeName} Notification!`, options);
  }