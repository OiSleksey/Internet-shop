console.log('hello');
let wishList = [];
const productCard = document.querySelectorAll('.product-card');
// const productName = document.querySelectorAll('.product-card__name');
// const productCost = document.querySelectorAll('.product-card__cost');
const productLike = document.querySelectorAll('.product-card__like');

getLocaleStorage();

//Отримання данних cart із localeStorage
function getLocaleStorage() {
  wishList = JSON.parse(localStorage.getItem('wishList'));
  if (wishList === null || wishList.length === 0) return (wishList = []);
  updateWishListCounter(wishList.length);
  productCard.forEach(product => {
    const productId = product.dataset.goodsId;
    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i].id === productId) setBtnLike(product);
    }
  });
}

//Встановлення данних wishList у localeStorage
function setLocaleStorage() {
  localStorage.setItem('wishList', JSON.stringify(wishList));
  updateWishListCounter(wishList.length);
}

//Подія натискання на кнопку "Подобається"
productLike.forEach(btn => {
  btn.addEventListener('click', getClickedProduct);
});

//Отримання данних продукту на який було натиснуто "Подобається" і створення об'єкту з даними продукту.
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
  setWishList(productData);
  setBtnLike(product);
}

//Оновлення данних у массиві wishList.
function setWishList(product) {
  for (let i = 0; i < wishList.length; i++) {
    if (wishList[i].id === product.id) {
      //Видалення данних с массиву wishList
      wishList.splice(i, 1);
      setLocaleStorage();
      return;
    }
  }
  //Додавання данних с массив wishList
  wishList.push(product);
  setLocaleStorage();
}

//Оновлення статусу кнопки ("Подобається") Намагався зробити через productLike.src , але webpack знущається зі своїм contenthash)

function setBtnLike(product) {
  const productLike = product.querySelector('.product-card__like');
  const slackImg = productLike.querySelector('.like-slack');
  const activeImg = productLike.querySelector('.like-active');
  if (slackImg.classList.contains('d-none')) {
    slackImg.classList.remove('d-none');
    activeImg.classList.add('d-none');
    return;
  }
  slackImg.classList.add('d-none');
  activeImg.classList.remove('d-none');
}

//Оновлення данних кількості товару у wishList
function updateWishListCounter(counter) {
  document.querySelector('#likesCount').textContent = counter;
}
