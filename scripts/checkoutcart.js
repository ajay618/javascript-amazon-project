let cartItemsdata=localStorage.getItem('Cart');

let AllCartdata = JSON.parse(cartItemsdata);

let checkoutCartHTML='';
let allCartQuantity=0;
let orderPrice=0;
let imageSrc;
let productName;
let price;
let initialOrderPrice;
let initialShippingCharge=0;
let initialTotalBeforeTax;
let initialEstimatedTax;

if (AllCartdata===null){
 
  checkoutCartHTML+=`<div class="js-cart-summary cart-summary">
  <div data-testid="empty-cart-message">
    Your cart is empty.
  </div>
  <a class="button-primary view-products-link" href="/javascript-amazon-project/amazon.html" data-testid="view-products-link">
    View products
  </a>
</div>`;

document.querySelector('.js-cart-items').innerHTML=checkoutCartHTML;

document.querySelectorAll('.payment-summary').forEach(function(el) {
  el.style.display = 'none';
});

document.querySelectorAll('.checkout-header-middle-section').forEach(function(el) {
el.style.display = 'none';
});


document.querySelectorAll('.checkout-header-right-section').forEach(function(el) {
el.style.display = 'none';
});

}

else{
//  allCartQuantity=0;

//  orderPrice=0;

AllCartdata.forEach( (element) => {
    allCartQuantity+=Number (element.quantity);
});

document.querySelector('.js-cartquantity-header').innerHTML=`${allCartQuantity} items`;
document.querySelector('.js-item-order').innerHTML=`items(${allCartQuantity})`;



AllCartdata.forEach( (cart) => {
    
    // let imageSrc;
    // let productName;
    // let price;
    

    products.forEach( (product) => {

        if(cart.id===product.id){
          imageSrc=product.image;
          productName=product.name;
          price=product.priceCents;
        }
    });
     
    price=price*cart.quantity;
    orderPrice+=price;

     checkoutCartHTML+=`<div class="cart-item-container" id="${cart.id}">
<div class="cart-item-details-grid">
  <img class="product-image"
    src="${imageSrc}">

  <div class="cart-item-details">
    <div class="product-name">
        ${productName}
    </div>
    <div class="product-price">
      $${(price / 100).toFixed(2)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label js-quantity-${cart.id}" ">${cart.quantity}</span>
      </span>
      <input class="js-new-quantity-input new-quantity-input js-quantity-change-${cart.id}"  min="1" type="number" value=${cart.quantity} data-testid="new-quantity-input">
      <button class="update-quantity-link link-primary js-update-${cart.id}" onclick="UpdateQuantity(this)" data-cart-id="${cart.id}"">
        Update
      </button>
      <button class="save-quantity-link link-primary js-save-${cart.id}" onclick="saveQuantity(this)" data-save-id="${cart.id}"">
        Save
      </button>
      <button class="delete-quantity-link link-primary js-delete-${cart.id}" onclick="DeleteQuantity(this)" data-delete-id="${cart.id}"">
        Delete
      </button>
    </div>
  </div>

  <div class="delivery-options js-delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    <div class="delivery-option">
      <input type="radio" 
        class="delivery-option-input "
        name="checked-button-${cart.id}" value="0">
      <div>
        <div class="delivery-option-price">
          FREE Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input "
        name="checked-button-${cart.id}" value="499" checked="checked">
      <div>
        <div class="delivery-option-price">
          $4.99 - Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="checked-button-${cart.id}" value="999">
      <div>
        <div class="delivery-option-price">
          $9.99 - Fast Shipping
        </div>
      </div>
    </div>
  </div>
</div>
</div>`
});

document.querySelector('.js-cart-items').innerHTML=checkoutCartHTML;
initialOrderPrice=(orderPrice);

document.querySelector('.js-payment-summary-money').innerHTML=`$${(initialOrderPrice/100).toFixed(2)}`;

initialShippingCharge=0;
AllCartdata.forEach( (cart) => {
    
     let radio_ele = document.querySelector(`input[name="checked-button-${cart.id}"]:checked`);
     initialShippingCharge=initialShippingCharge+Number(radio_ele.value);
     
});

document.querySelector('.js-shipping-cost').innerHTML=`$${(initialShippingCharge/100).toFixed(2)}`;
initialTotalBeforeTax=((Number(initialShippingCharge)+Number (initialOrderPrice)));

document.querySelector('.js-total-before-tax').innerHTML=`$${(initialTotalBeforeTax/100).toFixed(2)}`;
initialEstimatedTax=((initialTotalBeforeTax*0.1)/100).toFixed(2);

document.querySelector('.js-estimated-tax').innerHTML=`$${initialEstimatedTax}`;

document.querySelector('.js-grand-total').innerHTML=`$${(((initialEstimatedTax*100)+initialTotalBeforeTax)/100).toFixed(2)}`;

document.querySelectorAll('.js-delivery-options')
.forEach(  (input) => {
    input.addEventListener('change', () => {
       
        initialShippingCharge=0;

        AllCartdata.forEach( (cart) => {
    
            let radio_ele = document.querySelector(`input[name="checked-button-${cart.id}"]:checked`);
            initialShippingCharge=initialShippingCharge+Number(radio_ele.value);
            
       });
       

       document.querySelector('.js-shipping-cost').innerHTML=`$${(initialShippingCharge/100).toFixed(2)}`;

       initialTotalBeforeTax=((Number(initialShippingCharge)+Number (initialOrderPrice)));

       document.querySelector('.js-total-before-tax').innerHTML=`$${(initialTotalBeforeTax/100).toFixed(2)}`;
       initialEstimatedTax=((initialTotalBeforeTax*0.1)/100).toFixed(2);

       document.querySelector('.js-estimated-tax').innerHTML=`$${initialEstimatedTax}`;

       document.querySelector('.js-grand-total').innerHTML=`$${(((initialEstimatedTax*100)+initialTotalBeforeTax)/100).toFixed(2)}`;
    });
});
}

function UpdateQuantity(updateCartQuantity){
   

      let updateCartItemId = updateCartQuantity.getAttribute("data-cart-id");

     
      let spanElement=document.getElementsByClassName('js-quantity-'+updateCartItemId);
   

        let input=document.getElementsByClassName('js-quantity-change-'+updateCartItemId);
        input[0].style.display = 'inline';
        spanElement[0].style.display='none';

        let saveButton=document.getElementsByClassName('js-save-'+updateCartItemId);
    
        let updateButton=document.getElementsByClassName('js-update-'+updateCartItemId);

        saveButton[0].style.display='inline';
        updateButton[0].style.display='none'; 

        document.getElementsByClassName('js-delete-'+updateCartItemId)[0].disabled = true;
        
}

function saveQuantity(saveCartQuantity){

  let saveCartQuantityId= saveCartQuantity.getAttribute('data-save-id');

    let spanElement=document.getElementsByClassName('js-quantity-'+saveCartQuantityId);
    
    let input=document.getElementsByClassName('js-quantity-change-'+saveCartQuantityId);
 
    let newValue=input[0].valueAsNumber;
   
    input[0].style.display = 'none';
    spanElement[0].innerHTML=newValue;
    
    spanElement[0].style.display='inline';

    document.getElementsByClassName('js-delete-'+saveCartQuantityId)[0].disabled = false;

    let updateButton=document.getElementsByClassName('js-update-'+saveCartQuantityId);
    let saveButton=document.getElementsByClassName('js-save-'+saveCartQuantityId);

    saveButton[0].style.display='none';
    updateButton[0].style.display='inline'; 

  AllCartdata.forEach( (item) => {

    if(saveCartQuantityId === item.id){
      item.quantity=newValue;
    }

  });

  localStorage.setItem('Cart',JSON.stringify(AllCartdata));

  cartItemsdata=localStorage.getItem('Cart');

AllCartdata = JSON.parse(cartItemsdata);

 allCartQuantity=0;

 orderPrice=0;

AllCartdata.forEach( (element) => {
    allCartQuantity+=Number (element.quantity);
});

document.querySelector('.js-cartquantity-header').innerHTML=`${allCartQuantity} items`;
document.querySelector('.js-item-order').innerHTML=`items(${allCartQuantity})`;

 checkoutCartHTML='';

AllCartdata.forEach( (cart) => {
  
    products.forEach( (product) => {

        if(cart.id===product.id){
          imageSrc=product.image;
          productName=product.name;
          price=product.priceCents;
        }
    });
     
    price=price*cart.quantity;
    orderPrice+=price;

    checkoutCartHTML+=`<div class="cart-item-container" id="${cart.id}">
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${imageSrc}">
    
      <div class="cart-item-details">
        <div class="product-name">
            ${productName}
        </div>
        <div class="product-price">
          $${(price / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-${cart.id}" ">${cart.quantity}</span>
          </span>
          <input class="js-new-quantity-input new-quantity-input js-quantity-change-${cart.id}"  min="1" type="number" value=${cart.quantity} data-testid="new-quantity-input">
          <button class="update-quantity-link link-primary js-update-${cart.id}" onclick="UpdateQuantity(this)" data-cart-id="${cart.id}"">
            Update
          </button>
          <button class="save-quantity-link link-primary js-save-${cart.id}" onclick="saveQuantity(this)" data-save-id="${cart.id}"">
            Save
          </button>
          <button class="delete-quantity-link link-primary js-delete-${cart.id}" onclick="DeleteQuantity(this)" data-delete-id="${cart.id}"">
            Delete
          </button>
        </div>
      </div>
    
      <div class="delivery-options js-delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" 
            class="delivery-option-input "
            name="checked-button-${cart.id}" value="0">
          <div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input "
            name="checked-button-${cart.id}" value="499" checked="checked">
          <div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="checked-button-${cart.id}" value="999">
          <div>
            <div class="delivery-option-price">
              $9.99 - Fast Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`
});

document.querySelector('.js-cart-items').innerHTML=checkoutCartHTML;
 initialOrderPrice=(orderPrice);

document.querySelector('.js-payment-summary-money').innerHTML=`$${(initialOrderPrice/100).toFixed(2)}`;

 initialShippingCharge=0;
AllCartdata.forEach( (cart) => {
    
     let radio_ele = document.querySelector(`input[name="checked-button-${cart.id}"]:checked`);
     initialShippingCharge=initialShippingCharge+Number(radio_ele.value);
     
});

document.querySelector('.js-shipping-cost').innerHTML=`$${(initialShippingCharge/100).toFixed(2)}`;
 initialTotalBeforeTax=((Number(initialShippingCharge)+Number (initialOrderPrice)));

document.querySelector('.js-total-before-tax').innerHTML=`$${(initialTotalBeforeTax/100).toFixed(2)}`;
 initialEstimatedTax=((initialTotalBeforeTax*0.1)/100).toFixed(2);

document.querySelector('.js-estimated-tax').innerHTML=`$${initialEstimatedTax}`;

document.querySelector('.js-grand-total').innerHTML=`$${(((initialEstimatedTax*100)+initialTotalBeforeTax)/100).toFixed(2)}`;

document.querySelectorAll('.js-delivery-options')
.forEach(  (input) => {
    input.addEventListener('change', () => {
         
        initialShippingCharge=0;

        AllCartdata.forEach( (cart) => {
    
            let radio_ele = document.querySelector(`input[name="checked-button-${cart.id}"]:checked`);
            initialShippingCharge=initialShippingCharge+Number(radio_ele.value);
            
       });

       document.querySelector('.js-shipping-cost').innerHTML=`$${(initialShippingCharge/100).toFixed(2)}`;

       initialTotalBeforeTax=((Number(initialShippingCharge)+Number (initialOrderPrice)));

       document.querySelector('.js-total-before-tax').innerHTML=`$${(initialTotalBeforeTax/100).toFixed(2)}`;
       initialEstimatedTax=((initialTotalBeforeTax*0.1)/100).toFixed(2);

       document.querySelector('.js-estimated-tax').innerHTML=`$${initialEstimatedTax}`;

       document.querySelector('.js-grand-total').innerHTML=`$${(((initialEstimatedTax*100)+initialTotalBeforeTax)/100).toFixed(2)}`;
    });
});


}

function DeleteQuantity(deleteCart){

    const itemTabList=document.querySelectorAll('.cart-item-container');

    let deleteCartItem = deleteCart.getAttribute("data-delete-id");

    for (let i = 0; i < itemTabList.length; i++) {
      let itemTabListId = itemTabList[i].id;
      
      if(itemTabListId===deleteCartItem){
        let j=0;
            for (j = 0; j < AllCartdata.length; ++j) {
              if(AllCartdata[j].id === deleteCartItem){
                AllCartdata.splice(j--, 1);
                }
            }
      }
    }

    checkoutCartHTML='';

    if (AllCartdata.length===0){
      
      checkoutCartHTML+=`<div class="js-cart-summary cart-summary">
      <div data-testid="empty-cart-message">
        Your cart is empty.
      </div>
      <a class="button-primary view-products-link" href="/javascript-amazon-project/amazon.html" data-testid="view-products-link">
        View products
      </a>
    </div>`;

    
   

    document.querySelectorAll('.payment-summary').forEach(function(el) {
        el.style.display = 'none';
    });

    document.querySelectorAll('.checkout-header-middle-section').forEach(function(el) {
      el.style.display = 'none';
    });

  
    document.querySelectorAll('.checkout-header-right-section').forEach(function(el) {
      el.style.display = 'none';
    });

 

    document.querySelector('.js-cart-items').innerHTML=checkoutCartHTML;
    localStorage.removeItem("Cart");
    
    }

    else {
 localStorage.setItem('Cart',JSON.stringify(AllCartdata));
    //location.reload();

cartItemsdata=localStorage.getItem('Cart');

AllCartdata = JSON.parse(cartItemsdata);

 allCartQuantity=0;

 orderPrice=0;

AllCartdata.forEach( (element) => {
    allCartQuantity+=Number (element.quantity);
});

document.querySelector('.js-cartquantity-header').innerHTML=`${allCartQuantity} items`;
document.querySelector('.js-item-order').innerHTML=`items(${allCartQuantity})`;

 checkoutCartHTML='';

AllCartdata.forEach( (cart) => {
    
    // let imageSrc;
    // let name;
    // let price;
  
    products.forEach( (product) => {

        if(cart.id===product.id){
          imageSrc=product.image;
          productName=product.name;
          price=product.priceCents;
        }
    });
     
    price=price*cart.quantity;
    orderPrice+=price;

    checkoutCartHTML+=`<div class="cart-item-container" id="${cart.id}">
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${imageSrc}">
    
      <div class="cart-item-details">
        <div class="product-name">
            ${productName}
        </div>
        <div class="product-price">
          $${(price / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-${cart.id}" ">${cart.quantity}</span>
          </span>
          <input class="js-new-quantity-input new-quantity-input js-quantity-change-${cart.id}"  min="1" type="number" value=${cart.quantity} data-testid="new-quantity-input">
          <button class="update-quantity-link link-primary js-update-${cart.id}" onclick="UpdateQuantity(this)" data-cart-id="${cart.id}"">
            Update
          </button>
          <button class="save-quantity-link link-primary js-save-${cart.id}" onclick="saveQuantity(this)" data-save-id="${cart.id}"">
            Save
          </button>
          <button class="delete-quantity-link link-primary js-delete-${cart.id}" onclick="DeleteQuantity(this)" data-delete-id="${cart.id}"">
            Delete
          </button>
        </div>
      </div>
    
      <div class="delivery-options js-delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" 
            class="delivery-option-input "
            name="checked-button-${cart.id}" value="0">
          <div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input "
            name="checked-button-${cart.id}" value="499" checked="checked">
          <div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="checked-button-${cart.id}" value="999">
          <div>
            <div class="delivery-option-price">
              $9.99 - Fast Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`
});
    }

document.querySelector('.js-cart-items').innerHTML=checkoutCartHTML;
 initialOrderPrice=(orderPrice);

document.querySelector('.js-payment-summary-money').innerHTML=`$${(initialOrderPrice/100).toFixed(2)}`;

 initialShippingCharge=0;
AllCartdata.forEach( (cart) => {
    
     let radio_ele = document.querySelector(`input[name="checked-button-${cart.id}"]:checked`);
     initialShippingCharge=initialShippingCharge+Number(radio_ele.value);
     
});

document.querySelector('.js-shipping-cost').innerHTML=`$${(initialShippingCharge/100).toFixed(2)}`;
 initialTotalBeforeTax=((Number(initialShippingCharge)+Number (initialOrderPrice)));

document.querySelector('.js-total-before-tax').innerHTML=`$${(initialTotalBeforeTax/100).toFixed(2)}`;
 initialEstimatedTax=((initialTotalBeforeTax*0.1)/100).toFixed(2);

document.querySelector('.js-estimated-tax').innerHTML=`$${initialEstimatedTax}`;

document.querySelector('.js-grand-total').innerHTML=`$${(((initialEstimatedTax*100)+initialTotalBeforeTax)/100).toFixed(2)}`;

document.querySelectorAll('.js-delivery-options')
.forEach(  (input) => {
    input.addEventListener('change', () => {
         
        initialShippingCharge=0;

        AllCartdata.forEach( (cart) => {
    
            let radio_ele = document.querySelector(`input[name="checked-button-${cart.id}"]:checked`);
            initialShippingCharge=initialShippingCharge+Number(radio_ele.value);
            
       });

       document.querySelector('.js-shipping-cost').innerHTML=`$${(initialShippingCharge/100).toFixed(2)}`;

       initialTotalBeforeTax=((Number(initialShippingCharge)+Number (initialOrderPrice)));

       document.querySelector('.js-total-before-tax').innerHTML=`$${(initialTotalBeforeTax/100).toFixed(2)}`;
       initialEstimatedTax=((initialTotalBeforeTax*0.1)/100).toFixed(2);

       document.querySelector('.js-estimated-tax').innerHTML=`$${initialEstimatedTax}`;

       document.querySelector('.js-grand-total').innerHTML=`$${(((initialEstimatedTax*100)+initialTotalBeforeTax)/100).toFixed(2)}`;
    });
});

}