import env from '../env';

export default () => {
  if (env.is_client) {
    const imgDefer = document.getElementsByTagName('img');
    setTimeout(() => {
      for (let i = 0; i < imgDefer.length; i++) {
        if (imgDefer[i].getAttribute('data-src')) {
          imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
        }
      }
    }, 500);
  }
};
