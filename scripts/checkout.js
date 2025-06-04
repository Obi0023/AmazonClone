import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

//localStorage.clear();
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalQuantity = parseInt(localStorage.getItem("totalQuantity")) || 0;

const today = dayjs();

const freeShippingDate = today.add(7,'day');
const standardShippingDate = dayjs().add(5,'day');
const expressShippingDate = dayjs().add(2,'day');

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
                              ${freeShippingDate.format("dddd, MMMM DD")}
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
                            ${standardShippingDate.format("dddd, MMMM DD")}
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
                            ${expressShippingDate.format("dddd, MMMM DD")}
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
function loadOrderSummary(){
  let html = '';
  html = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$42.75</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$4.99</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$47.74</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$52.51</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
        `;

      document.querySelector(".payment-summary").innerHTML = html;
}

loadAllCarts();
loadOrderSummary();

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

