import '../sass/style.sass';
import './cart.js';
import './wishlist.js';

start();

const authBtn = document.getElementById('authButton');

authBtn.addEventListener('click', authFunction);

//Auth
function authFunction() {
  // get data from form
  // send request
  // parse response
  // get authToken 9879845631sf3dfs6df54s6dfs6d5f4s6df

  localStorage.setItem('accessToken', '65sf465s4df6s5d4f8979w6r454fd');
  document.querySelector('.authForm').classList.add('d-none');
  document.querySelector('.store').classList.remove('d-none');
}

function start() {
  if (!localStorage.getItem('accessToken')) {
    document.querySelector('.authForm').classList.remove('d-none');
    return;
  }
  document.querySelector('.store').classList.remove('d-none');
}
//Auth/

// function addNewProduct() {
//   cart.push({
//     name: 'Test',
//     id: new Date().toString(),
//   });
//   localStorage.setItem('cart', JSON.stringify(cart));
//   updateCartCounter(cart.length);
// }

// function updateCartCounter(counter) {
//   document.querySelector('#productsCount').textContent = counter;
// }

// window.addEventListener('storage', event => {
//   console.log(event);
//   cart = JSON.parse(localStorage.getItem('cart'));
//   updateCartCounter(cart.length);
// });

// localStorage.setItem('cart', JSON.stringify(cart))

// document.cookie = "token='544564132154f6s45dfs'; domain:localhost"

// document.cookie = "token='544564132154f6s45df987s'; max-age=10";
