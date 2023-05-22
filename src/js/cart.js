let cart = [];
const productCard = document.querySelectorAll('.product-card');
const productBtnAdd = document.querySelectorAll('.product-card__btn-add');
const productLike = document.querySelectorAll('.product-card__like');

getLocaleStorage();

window.addEventListener('storage', () => {
  getLocaleStorage();
});

//Отримання данних cart із localeStorage
function getLocaleStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart === null);
  if (cart === null || cart.length === 0) return (cart = []);
  updateCartCounter(cart.length);
  updateCartValue(cart);
  productCard.forEach(product => {
    const productId = product.dataset.goodsId;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) setBtnAddCart(product);
    }
  });
}

//Встановлення данних cart у localeStorage
function setLocaleStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter(cart.length);
  updateCartValue(cart);
}

//Подія натискання на кнопку "Додати в кошик"
productBtnAdd.forEach(btn => {
  btn.addEventListener('click', getClickedProduct);
});

//Отримання данних продукту на який було натиснуто "Додати в корзину" і створення об'єкту з даними продукту.
function getClickedProduct(e) {
  const product = e.target.closest('.product-card');
  const productId = product.dataset.goodsId;
  const productName = product.querySelector('.product-card__name');
  const productCost = product.querySelector('.product-card__cost');
  const productData = {
    name: productName.textContent,
    cost: productCost.textContent,
    id: productId,
  };
  setCart(productData);
  setBtnAddCart(product);
}

//Оновлення данних у массиві cart.
function setCart(product) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      //Видалення данних с массиву cart
      cart.splice(i, 1);
      setLocaleStorage();
      return;
    }
  }
  //Додавання данних с массив cart
  cart.push(product);
  setLocaleStorage();
}

//Оновлення статусу кнопки ("Додати в корзину" або "У корзині")
function setBtnAddCart(product) {
  const productBtnAdd = product.querySelector('.product-card__btn-add');
  if (productBtnAdd.classList.contains('product-card__btn-add_active')) {
    productBtnAdd.classList.remove('product-card__btn-add_active');
    productBtnAdd.textContent = 'Додати в корзину';
    return;
  }
  productBtnAdd.classList.add('product-card__btn-add_active');
  productBtnAdd.textContent = 'В корзині';
}

//Оновлення данних кількості товару у кошику
function updateCartCounter(counter) {
  document.querySelector('#productsCount').textContent = counter;
}

//Оновлення данних суми товару у кошику
function updateCartValue(cart) {
  const cartCost = cart.reduce((acc, product) => acc + Number(product.cost), 0);
  document.querySelector('#productsCost').textContent = cartCost;
}
