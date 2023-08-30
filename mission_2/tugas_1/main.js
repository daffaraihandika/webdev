let totalHarga = 0;
let showCart = false;

class Product{
    constructor(namaProduk, hargaProduk, fotoProduk ){
        this.namaProduk = namaProduk;
        this.hargaProduk = hargaProduk;
        this.fotoProduk = fotoProduk;
        this.quantity = 0;
    }

    static showProduct(products) {
        const container = document.getElementById('product');
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-3');
    
            productCard.innerHTML = `
            <div class="card" style="width: 90%;">
                <img src="${product.fotoProduk}" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title">${product.namaProduk}</h5>
                  <p class="card-text">${product.hargaProduk}</p>
                  <div class="wrapper-box">
                    <span class="minus btn">-</span>
                    <span class="num">0</span>
                    <span class="plus btn">+</span>
                  </div>
                  <a href="#" class="btn btn-success btn-tambahKeranjang">Tambah Keranjang</a>
                </div>
            </div>`;
    
            container.appendChild(productCard);
        });
    }
}

class Cart{
    constructor(){
        this.cartItems = [];
    };
    
    // Inisialisasi Cart
    initCart(){
        const cartContainer = document.getElementById('cartContainer')
        const cartContent = document.createElement('div');
        cartContent.innerHTML = `
            <h1>My Cart</h1>`;
        cartContainer.appendChild(cartContent);


        const cartPembayaran = document.getElementById('cartPembayaran');
        const totalBayarContainer = document.createElement('div');
        totalBayarContainer.innerHTML = 
            `<div class="totalBayar pt-4">
            <p>Total Pembelian : 12000</p>
            <p>Pajak 11% : 200</p>
            <p>Total Bayar : 200</p>
            </div>`
        cartPembayaran.appendChild(totalBayarContainer);
    }

    addToCart(product, quantity){
        const existingProduct = this.cartItems.find(item => item.namaProduk === product.namaProduk);
        const cartItemsContainer = document.getElementById('cartContent');

        cartItemsContainer.innerHTML = '';
        if (existingProduct) {
            // Jika produk sudah ada dalam keranjang, tingkatkan jumlahnya sesuai dengan quantity
            product.quantity += quantity;
        } else {
            // Jika produk belum ada dalam keranjang, tambahkan dengan quantity yang diberikan
            product.quantity = quantity;
            this.cartItems.push(product);
        }
        
        cartItemsContainer.innerHTML = '';

        this.cartItems.forEach(product => {
            const cartItem = document.createElement('div');
            const hargaProduk = product.hargaProduk * product.quantity;
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>${product.namaProduk}</div>
                <div>Harga : ${product.hargaProduk}</div>
                <img src="${product.fotoProduk}" alt="" />
                <div>Quantity : ${product.quantity}</div>
                <div>Harga Produk : ${hargaProduk}</div>
            `;

            // totalHarga += product.hargaProduk;

            cartItemsContainer.appendChild(cartItem);
        });
    }

    updateCartView() {
        const cartItemsContainer = document.getElementById('cartContent');
        cartItemsContainer.innerHTML = '';

        this.cartItems.forEach(product => {
            const cartItem = document.createElement('div');
            const hargaProduk = product.hargaProduk * product.quantity;
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>${product.namaProduk}</div>
                <div>Harga : ${product.hargaProduk}</div>
                <img src="${product.fotoProduk}" alt="" />
                <div>Quantity : ${product.quantity}</div>
                <div>Harga Produk PEPEk : ${hargaProduk}</div>
            `;

            totalHarga += product.hargaProduk;

            cartItemsContainer.appendChild(cartItem);
        });
    }
}

// Gunakan fungsi showProduct untuk menampilkan produk
const produk1 = new Product("New Balance 550 Men's Sneakers - White",  2099000, "assets/img/nb-1.png");
const produk2 = new Product("New Balance Made In USA 990v6", 4499000, "assets/img/nb-2.png");
const produk3 = new Product("New Balance 2002R Men's Sneakers- Grey", 2299000, "assets/img/nb-3.png");
const produk4 = new Product("New Balance 1906 Men's Sneakers Shoes - Grey", 2599000, "assets/img/nb-4.png");
const produk5 = new Product("Nike Air Force 1 Low", 2249000, "assets/img/nike-1.png");
const produk6 = new Product("Nike Dunk Low Gorge Green Navy", 2499000, "assets/img/nike-2.png");
const produk7 = new Product("Nike Blazer Vintage", 2100000, "assets/img/nike-3.png");
const produk8 = new Product("Sepatu Nike Air Jordan 1 Low Light Smoke Grey", 1650000, "assets/img/nike-4.png");

const products = [produk1, produk2, produk3, produk4, produk5, produk6, produk7, produk8];
Product.showProduct(products);

const buttons = document.querySelectorAll('.items .btn-tambahKeranjang')
const cart = new Cart();
// cart.initCart();

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn-tambahKeranjang');
    const cart = new Cart();
    let showCart = false;

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityInput = document.querySelectorAll('.num')[index];
            const quantity = parseInt(quantityInput.textContent);
            const existingProduct = cart.cartItems.find(item => item.namaProduk === products[index].namaProduk);

            if (quantity > 0) {
                if (!showCart) {
                    cart.initCart();
                    showCart = true;
                }

                numValues[index] = 0;
                num[index].textContent = '0';
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                    cart.updateCartView();
                } else {
                    const product = products[index];
                    product.quantity = quantity;
                    cart.addToCart(product, quantity);
                }

                quantityInput.textContent = '0';
            } else {
                alert('Harap masukkan jumlah produk yang valid.');
            }
        });
    });
});

const plus = document.querySelectorAll('.plus');
const num = document.querySelectorAll('.num');
const minus = document.querySelectorAll('.minus');


let numValues = [];



for(let i = 0; i < plus.length; i++){
    numValues.push(0);
}

plus.forEach((element,i) => {
    element.addEventListener("click", function () {
        numValues[i]++;
        num[i].textContent = numValues[i];
        console.log(numValues[i]);
    });
});

minus.forEach((element,i) => {
    element.addEventListener("click", function () {
        numValues[i]--;
        num[i].textContent = numValues[i];
    });
});