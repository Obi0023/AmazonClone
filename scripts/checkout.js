import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
//localStorage.clear();
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalQuantity = parseInt(localStorage.getItem("totalQuantity")) || 0;
const now = dayjs();

console.log(now);

function loadAllCarts(){
  //Reset HTML each time we load the page for CRUDs to work
  let html = "";
  //Load All Products
products.forEach(function(product){
  //Load All Carts
  cart.forEach(function(item){
    // Check if the current product is in the cart
    if (product.id === item.id) {
      html += `
      <div class="cart-item-container">
                  <div class="delivery-date">
                    ${product.name}
                  </div>
      
                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src=${product.image}>
      
                    <div class="cart-item-details">
                      <div class="product-name">
                      ${product.name}
                      </div>
                      <div class="product-price">
                        $${formatCurrency(product.priceCents)}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span onclick="deleteCart('${product.id}')"
                        class="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>
      
                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      <div class="delivery-option">
                        <input type="radio" checked
                          class="delivery-option-input"
                          name="${product.id}">
                        <div>
                          <div class="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div class="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="${product.id}">
                        <div>
                          <div class="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div class="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input type="radio"
                          class="delivery-option-input"
                          name="${product.id}">
                        <div>
                          <div class="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div class="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      </div>
      `;
    }
})
});
document.querySelector(".order-summary").innerHTML = html;
}

loadAllCarts();

function deleteCart(cartId){
  // Not Working Correctly
  // cart.forEach(function(element, index) {
  //   if(cartId === element.id){
  //     totalQuantity = totalQuantity - element.quantity;
  //     cart.splice(index,1);
  //     localStorage.setItem("cart",JSON.stringify(cart));
  //     localStorage.setItem("totalQuantity",totalQuantity);
  //     loadAllCarts();
  //   }
  // });

  //find Index of an element where element.id === cartId
  let index = cart.findIndex(element => element.id === cartId);

  totalQuantity = totalQuantity - cart[index].quantity;
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem("totalQuantity",totalQuantity);
  loadAllCarts();
}



window.deleteCart = deleteCart;

