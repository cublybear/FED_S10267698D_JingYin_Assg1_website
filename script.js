// --------------------------- Account Page -------------------------------
var tabs = document.getElementsByClassName("account-page");

// Function to change the active tab
function changetab(name){
    // Remove active class from all tabs
    for (let tab of tabs){
        tab.classList.remove("active");
    }
    // Add active class to the selected tab
    document.getElementById(name).classList.add("active");
}

// Add event listeners to sign in and sign up links
const signinlink = document.querySelector('.signin-link');
const signuplink = document.querySelector('.signup-link');

// Example: Change tabs when these links are clicked
if (signinlink){
    signinlink.addEventListener('click', function(event){
        event.preventDefault(); // Prevent default anchor behavior
        changetab('signin');
    });
}

if (signuplink){
    signuplink.addEventListener('click', function(event){
        event.preventDefault(); // Prevent default anchor behavior
        changetab('signup');
    });
}

// --------------------------Cart Page--------------------------------
// Validation for button quantity
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const quantityInput = document.getElementById('quantity');

decreaseButton.addEventListener('click', function(){
    let value = parseInt(quantityInput.value);
    if (value > 1){ // Prevent going below 1
        quantityInput.value = value - 1;
    }
});

increaseButton.addEventListener('click', function(){
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

// ----------------------------Cart Page------------------------------
function ready(){
    var removeCartItemButtons = document.getElementsByClassName('remove');
    console.log(removeCartItemButtons);
    for (var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('item-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){ // Validation for input of quantity
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartItems = cartItemContainer.getElementsByClassName('cart-item');
    var total = 0;
    for (var i = 0; i < cartItems.length; i++){
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('cart-price')[0];
        var quantityElement = cartItem.getElementsByClassName('item-quantity')[0];
        var price = Number(priceElement.innerText.replace("$", "").replace(" SGD", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total')[0].innerText = 'Total: $ ' + total + ' SGD';
}

// ----------------------------Product Page------------------------------
if (!localStorage.getItem('counter')){
    localStorage.setItem('counter', 0); // Initialize the counter if it doesn't exist
}

let count =localStorage.getItem('counter');

function add(){
    count++;
    localStorage.setItem('counter', count);
    document.getElementById("item-quantity").textContent = count;
}

function minus(){
    count = Math.max(count-1,0);
    localStorage.setItem('counter', count);
    document.getElementById("item-quantity").textContent = count;
}

function updateCounterDisplay(){
    const counterDisplay = document.getElementById('item-quantity');
    if (counterDisplay){
        counterDisplay.textContent = `${localStorage.getItem('counter')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCounterDisplay();
});

function totalquantity(cart){
    let total = 0;
    for (let i = 0; i < cart.length; i++){
        total += cart[i].quantity; // Increase quantity if the item already exists
    }
    let icon = document.getElementById("cart-icon");
    icon.textContent = total;
    if (!total){
        icon.classList.add('empty');
    }
    else{
        icon.classList = "cart-amount";
    }
}