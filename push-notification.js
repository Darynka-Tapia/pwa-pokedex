/*
const button = document.getElementById('notifications');
button.addEventListener('click', () => {
    var notificacion = window.webkitNotifications.createNotification("","Uso de Notification API", "¡Felicidades! Ya has configurado las notificaciones :)");
    notificacion.show();  
});
*/
//First, we check if having service workers and notifications are //supported.

const notificationButton = document.getElementById('notifications');
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
          initializeUi();
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
      notificationButton.textContent = 'Push Not Supported';
    }
  }

  initializeApp();

  function initializeUi() {
    notificationButton.addEventListener('click', () => {
      //Do something here
      console.log('click a notification button');
      displayNotification();

    });
  }

  function displayNotification() {
    //Ask user if we show notifications
    if (window.Notification && Notification.permission === 'granted') {
      notification();
      // We will crete this function in a further step.
    }
    // If the user hasn't told whether he wants to be notified or not
    // Note: because of Chrome, we cannot be sure the permission property
    // is set, therefore it's unsafe to check for the "default" value.
    else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission(status => {
        if (status === 'granted') {
          notification();
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

  function notification() {
    const options = {
      body: 'Testing Our Notification',
      icon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png'
    };
    swRegistration.showNotification('PWA Notification!', options);
  }