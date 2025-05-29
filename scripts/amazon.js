const products = [
    {
        img : "images/products/athletic-cotton-socks-6-pairs.jpg",
        title :"Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating : {
            stars : 45,
            count : 87
        },
        priceCent : 1090
    },
    {
        img : "images/products/intermediate-composite-basketball.jpg",
        title :"Intermediate Size Basketball",
        rating : {
            stars : 40,
            count : 127
        },
        priceCent : 2095
    },
    {
        img : "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        title :"Adults Plain Cotton T-Shirt - 2 Pack",
        rating : {
            stars : 45,
            count : 56
        },
        priceCent : 799
    }
]

let html = "";

//loop in the array element : product
products.forEach(function(element) {
    html += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${element.img}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${element.title}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${element.rating.stars}.png">
            <div class="product-rating-count link-primary">
              ${element.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(element.priceCent / 100).toFixed(2)}
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

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
`;
    
    document.querySelector(".products-grid").innerHTML = html;
});
