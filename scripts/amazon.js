import {products} from '../data/products.js';
import { formatCurrency } from '../utils/money.js';
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalQuantity = parseInt(localStorage.getItem("totalQuantity")) || 0;

//localStorage.clear();
let html = "";
products.forEach(function(element) {
    html += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${element.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${element.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${element.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(element.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <p class="cart-added"></p>
          <button class="add-to-cart-button button-primary"
          onclick="addToCart('${element.id}',this)">
            Add to Cart
          </button>
        </div>
`;
    document.querySelector(".products-grid").innerHTML = html;
});

//Update NavBar Cart
document.querySelector(".cart-quantity").innerHTML = totalQuantity;

function addToCart(productId, button){
  /**
   * parentElement : <div class="product-container">
   * Get Value from <select>
   * parseInt : To parse from string to int
   */
  const quantity = parseInt(button.parentElement.querySelector('select').value);
  let found = false;
  
  cart.forEach(function(item){
    //Check if product in Cart List
    if(item.id === productId){
      //if yes, update quantity
      item.quantity = item.quantity + quantity;
      found = true;
    };
  })
  //if no, Create new cart
  if(found === false){
    cart.push ({
      id : productId,
      quantity : quantity
    });
  }

  console.log(cart);
  //Save Cart in LocalStorage
  localStorage.setItem("cart",JSON.stringify(cart));
  //Show Added To Cart Message
  button.parentElement.querySelector(".cart-added").innerHTML = 'Added To Cart!';
  //Hide Message after 3 seconds
  setTimeout(function(){
    button.parentElement.querySelector(".cart-added").innerHTML = '';
  },3000);
  //Update Nav Bar Total Quantity
  totalQuantity+= quantity;
  //Save totalQuantity in localStorage
  localStorage.setItem("totalQuantity",totalQuantity);
  //Display New TotalQuantity Nav Bar
  document.querySelector(".cart-quantity").innerHTML = totalQuantity;

}

// Expose to global scope so `onclick="addToCart(...)"` works
window.addToCart = addToCart;