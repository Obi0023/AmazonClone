const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
            $${(element.priceCents / 100).toFixed(2)}
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

let currentCartId = parseInt(localStorage.getItem("currentCartId")) || 0;
let totalQuantity = parseInt(localStorage.getItem("totalQuantity")) || 0;
//Update NavBar Cart
document.querySelector(".cart-quantity").innerHTML = totalQuantity;
function addToCart(id, button){
  /**
   * parentElement : <div class="product-container">
   * Get Value from <select>
   * parseInt : To parse from string to int
   */
  const quantity = parseInt(button.parentElement.querySelector('select').value);
  let found = false;
  products.forEach(function(element){
    if(element.id === id){
      cart.forEach(function(item){
        console.log("item.id ="+item.id+"currentCartId ="+currentCartId);
        if(item.id === currentCartId){
          console.log("Doublant");
          item.quantity++;
          found = true;
        }
      });
      if(found === false){
      //Create New Cart Object and Load Product in it
      cart.push({
        id : ++currentCartId,
        image : element.image,
        name : element.name,
        priceCents : element.priceCents,
        quantity : quantity
        });
      //Save to localStorage
      localStorage.setItem("currentCartId",currentCartId);
      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      //Show Added To Cart Message
      button.parentElement.querySelector(".cart-added").innerHTML = 'Added To Cart!';
      //Hide Message after 3 seconds
      setTimeout(function(){
        button.parentElement.querySelector(".cart-added").innerHTML = '';
      },3000);
      totalQuantity+= quantity;
      //Save to localStorage
      localStorage.setItem("totalQuantity",totalQuantity);
      }
    }
    //Update NavBar Cart
  document.querySelector(".cart-quantity").innerHTML = totalQuantity;
  })
}