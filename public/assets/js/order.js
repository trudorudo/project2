// console.log("inside order")
if (document.readyState == 'loading') {
    // console.log("in loading");
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // console.log("inside order js ready");
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


    // console.log("***");
    // console.log( document.getElementsByClassName('shop-item-button'))


    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}



function purchaseClicked() {

    // alert('Thank you');
    // console.log("This button works.");
    // $(".btn-purchase").on("click", function (event) {
    event.preventDefault();
    // console.log("total price")
    // console.log($(".card-title").text());
    console.log($(".cart-items.text"));
    var inputs = $(".cart-item-title");
    var quantityinputs=$(".cart-quantity-input")
    console.log("cart-items");
    for(var i = 0; i < inputs.length; i++){
        console.log($(inputs[i]).text());
        console.log($(quantityinputs[i]).val().trim());
        var newItem = {
            // user_id: "1",
            total_price: parseFloat($(".cart-total-price").text().slice(1)),
            item_name: $(inputs[i]).text(),
            quantity: $(quantityinputs[i]).val().trim(),
        };
        $.ajax("/api/order", {
            type: "POST",
            data: newItem
        }).then(function () {
            console.log("new item was added");
        })
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    // console.log(buttonClicked);
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    // console.log("inside addToCartClicked")
    var button = event.target
    // console.log(button);
    var shopItem = button.parentElement.parentElement.parentElement
    // console.log(shopItem);

    var title = shopItem.getElementsByClassName('card-title')[0].innerText
    //var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    // console.log(title);
    // console.log(imageSrc);
    var itemname = title.split(" - ")[0];
    var price = title.split(" - ")[1];
    addItemToCart(itemname, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            // alert('This item is already added to the cart')
            M.toast({html: 'This item is already added to the cart.'});
            return
        }
    }

     //alert('Item added.')
     M.toast({html: 'Item added.'});
     
    var cartRowContents = `
    <div class="row">
    <div class="col s2 cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
  
        </div>
        <div class="col s6 cart-item cart-column ">
           <!-- <img class="cart-item-image" src="${imageSrc}" width="100" height="100">-->
            <span class="cart-item-title">${title}</span>

        </div>
        <div class="col s2 cart-column">
      
        <span class="cart-price cart-column">${price}</span>
       <!-- <button class="btn btn-danger" type="button"><img src="/assets/images/delete_item.png"/></button>-->
        </div>
        <div class="col s2 cart-column">
        <button class="btn btn-danger delete" type="button">Remove</button>
        </div>

        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('delete')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    // console.log("cartItemContainer");
    // console.log(cartItemContainer);
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    // console.log("cartRows");
    // console.log(cartRows);
    var total = 0
    // if(cartRows.length>1)
    // {
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // console.log(cartRow);
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        // console.log("price");
        // console.log(priceElement);
        if (priceElement) {
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.textContent.replace('$', ''))
            var quantity = quantityElement.value

            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100

    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
};