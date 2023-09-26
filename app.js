/* app.js */
const productEl = document.querySelector(".products");
const cartItemsDiv = document.querySelector(".cart-items");
const subTotalDiv = document.querySelector(".subtotal");
const totalInCartDiv = document.querySelector(".total-items-in-cart");

const renderProducts = () => {
  products.forEach((product) => {
    productEl.innerHTML += ` 
    <div class="item">
    <div class="item-container">
        <div class="item-img">
            <img src='${product.imgSrc}' alt="${product.name}">
        </div>
        <div class="desc">
            <h2>${product.name}</h2>
            <h2><small>$</small>${product.price}</h2>
            <p>
            ${product.description}
            </p>
        </div>
        <div class="add-to-wishlist">
            <img src="./icons/heart.png" alt="add to wish list">
        </div>
        <div class="add-to-cart" onclick="addToCart(${product.id})">
            <img src="./icons/bag-plus.png" alt="add to cart">
        </div>
    </div>
</div>`;
  });
};

const renderCartItems = () => {
  cartItemsDiv.innerHTML = "";
  cart.forEach((el) => {
    cartItemsDiv.innerHTML += `
    <div class="cart-item">
    <div class="item-info" onclick="removeItemFromCart(${el.id})">
        <img src="${el.imgSrc}">
        <h4>${el.name}</h4>
    </div>
    <div class="unit-price">
        <small>$</small>${el.price}
    </div>
    <div class="units">
        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${el.id})">-</div>
        <div class="number">${el.numberOfUnits}</div>
        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${el.id})">+</div>           
    </div>
</div>`;
  });
};

const renderSubTotal = () => {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    totalPrice+= item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits
  })

  subTotalDiv.innerHTML = `(Subtotal ${totalItems} items $${totalPrice.toFixed(2)})`;
  totalInCartDiv.innerHTML = totalItems;
}

renderProducts();

const updateCart = () => {
  renderCartItems();
  renderSubTotal();

  localStorage.setItem("CART", JSON.stringify(cart));
};

let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();

const addToCart = (id) => {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits('plus', id);
  } else {
    const item = products.find((product) => id === product.id);
    cart.push({ ...item, numberOfUnits: 1 });
  }

  updateCart();
};

const changeNumberOfUnits = (sign, id) => {
  cart = cart.map((el) => {
    let num = el.numberOfUnits;

    if (el.id === id) {
      if (sign === "plus" && el.numberOfUnits < el.instock) {
        el.numberOfUnits++
      } else if (sign === 'minus' && el.numberOfUnits > 1){
        el.numberOfUnits--
      }
    }

    return {...el, num};  
  });
  updateCart();
};

// Alternative changeNumberOfUnits logic
// const changeNumberOfUnits1 = (sign, id) => {
//  const cartItem = cart.find(el => el.id === id);
//       if (sign === 'plus') {
//         cartItem.numberOfUnits++;
//       } else {
//         cartItem.numberOfUnits--;
//       }
//      updateCart();
// };

const removeItemFromCart = (id)=> {
  cart = cart.filter(item => item.id !== id)
  updateCart()
}


