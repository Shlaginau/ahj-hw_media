export default function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation не поддерживается вашим браузером'));
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = `[${position.coords.latitude}, ${position.coords.longitude}]`;
        resolve(coords);
      }, () => {
        reject(new Error('Невозможно получить ваше местоположение'));
      });
    }
  });
}
