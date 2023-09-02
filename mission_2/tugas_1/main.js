let showCart = false;
let showPayment = false;

class Product {
  constructor(id, namaProduk, hargaProduk, fotoProduk) {
    this.id = id;
    this.namaProduk = namaProduk;
    this.hargaProduk = hargaProduk;
    this.fotoProduk = fotoProduk;
    this.quantity = 0;
  }

  static showProduct(products) {
    const container = document.getElementById("product");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      const hargaProdukFormat = this.formatNumberWithCommas(
        product.hargaProduk
      );
      productCard.classList.add("col-md-3", 'row-product');
      productCard.innerHTML = `
                <div class="card" style="width: 90%;">
                    <img src="${product.fotoProduk}" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title nama-produk">${product.namaProduk}</h5>
                      <p class="card-text harga-produk">Rp ${hargaProdukFormat}</p>
                      <div class="wrapper-box">
                        <span class="minus btn">-</span>
                        <span class="num">0</span>
                        <span class="plus btn">+</span>
                      </div>
                      <a href="#" class="btn btn-success btn-tambahKeranjang">Tambah Keranjang</a>
                    </div>
                </div>
                `;

      container.appendChild(productCard);
    });
  }

  static formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

class Cart {
  constructor() {
    this.cartItems = [];
    this.totalHarga = 0;
  }

  // Inisialisasi Cart
  initCart() {
    const cartContainer = document.getElementById("cartContainer");
    const cartContent = document.createElement("div");
    cartContent.innerHTML = `
    <div class="container">
      <h1 class="title">My Cart</h1>
    </div>`;
    cartContainer.appendChild(cartContent);
  }

  calculatePajak() {
    const pajakRate = 0.11;
    return this.totalHarga * pajakRate;
  }

  calculateTotalBayar() {
    let result;
    const pajak = this.calculatePajak();
    result = pajak + this.totalHarga;
    return result;
  }

  printReceipt(){

    const containerReceipt = document.getElementById("receipt");

    containerReceipt.innerHTML = '';

    this.cartItems.forEach(item => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add('row', 'struk-produk');

      rowDiv.innerHTML = `
            <div class="col-md-8">
              <div class="row">${item.namaProduk}</div>
              <div class="row">
                <p class="info-pembelian"><span class="harga-produk">Rp ${Product.formatNumberWithCommas(item.hargaProduk)}</span> x <span class="quantity">${item.quantity}</span></p>
              </div>
            </div>
            <div class="col-md-4">Rp ${Product.formatNumberWithCommas(item.hargaProduk * item.quantity)}</div>
          `;

      containerReceipt.appendChild(rowDiv);

      
    })

  }

  updateReceipt(){
    const totalPembelian = document.querySelector(".struk-pembayaran .total-pembelian");
    const pajak = document.querySelector(".struk-pembayaran .pajak");
    const totalBayar = document.querySelector(".struk-pembayaran .total-bayar");

    let currentPajak = this.calculatePajak();
    let currentTotalBayar = this.calculateTotalBayar();

    totalPembelian.textContent = Product.formatNumberWithCommas(
      this.totalHarga
    );
    pajak.textContent = Product.formatNumberWithCommas(currentPajak);

    totalBayar.textContent = Product.formatNumberWithCommas(currentTotalBayar);
  }

  updatePayment() {
    const totalPembelian = document.querySelector("#cartPembayaran .total-pembelian");
    const pajak = document.querySelector("#cartPembayaran .pajak");
    const totalBayar = document.querySelector("#cartPembayaran .total-bayar");

    let currentPajak = this.calculatePajak();
    let currentTotalBayar = this.calculateTotalBayar();

    totalPembelian.textContent = Product.formatNumberWithCommas(
      this.totalHarga
    );
    pajak.textContent = Product.formatNumberWithCommas(currentPajak);

    totalBayar.textContent = Product.formatNumberWithCommas(currentTotalBayar);
  }

  addToCart(product, quantity) {
    const existingProduct = this.cartItems.find(
      (item) => item.namaProduk === product.namaProduk
    );
    const cartItemsContainer = document.getElementById("cartContent");

    cartItemsContainer.innerHTML = "";
    if (existingProduct) {
      // Jika produk sudah ada dalam keranjang, tingkatkan jumlahnya sesuai dengan quantity
      product.quantity += quantity;
    } else {
      // Jika produk belum ada dalam keranjang, tambahkan dengan quantity yang diberikan
      product.quantity = quantity;
      this.cartItems.push(product);
    }

    cartItemsContainer.innerHTML = "";
    let totalHargaProduk = 0;
    this.cartItems.forEach((product) => {
      const hargaProdukFormat = Product.formatNumberWithCommas(
        product.hargaProduk
      );
      const cartItem = document.createElement("div");
      const hargaProduk = product.hargaProduk * product.quantity;
      const hargaProdukTotal = Product.formatNumberWithCommas(hargaProduk);
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="row">
            <div class="col-md-3 d-flex justify-content-center">
                <img src="${product.fotoProduk}" alt="" width="50%">
            </div>
            <div class="col-md-6">
                <div class="row">${product.namaProduk}</div>
                <div class="row">Qty : ${product.quantity}</div>
                <div class="row">Harga : Rp ${hargaProdukFormat}</div>
            </div>
            <div class="col-md-2">
                <p>Rp ${hargaProdukTotal}</p>
            </div>
            <div class="col-md-1">
              <a href="#" class="btn btn-danger btn-hapusProduk" data-id="${product.id}">x</a>
            </div>
        </div>
        <hr>
            `;

      totalHargaProduk += hargaProduk;

      cartItemsContainer.appendChild(cartItem);
    });

    this.totalHarga = totalHargaProduk;
  }

  updateCartView() {
    const cartItemsContainer = document.getElementById("cartContent");
    cartItemsContainer.innerHTML = "";

    let totalHargaProduk = 0;
    this.cartItems.forEach((product) => {
      const cartItem = document.createElement("div");
      const hargaProduk = product.hargaProduk * product.quantity;
      const hargaProdukFormat = Product.formatNumberWithCommas(
        product.hargaProduk
      );
      const hargaProdukTotal = Product.formatNumberWithCommas(hargaProduk);
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="row">
            <div class="col-md-3 d-flex justify-content-center">
                <img src="${product.fotoProduk}" alt="" width="50%">
            </div>
            <div class="col-md-6">
                <div class="row">${product.namaProduk}</div>
                <div class="row">Qty : ${product.quantity}</div>
                <div class="row">Harga : Rp ${hargaProdukFormat}</div>
            </div>
            <div class="col-md-2">
                <p>Rp ${hargaProdukTotal}</p>
            </div>
            <div class="col-md-1">
              <a href="#" class="btn btn-danger btn-hapusProduk" data-id="${product.id}">x</a>
            </div>
        </div>
        <hr>
        `;

      totalHargaProduk += hargaProduk;

      cartItemsContainer.appendChild(cartItem);
    });
    this.totalHarga = totalHargaProduk;
  }

  deleteItemFromCart(id){
    // disinii
    console.log(this.cartItems);
    const product = this.cartItems.find(
      (item) => item.id === id
    );
  
    const index = this.cartItems.indexOf(product);
  
    this.cartItems.splice(index,1);
    this.updateCartView();
    this.updatePayment();
  }
}

function scrollPageToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}



const produk1 = new Product(
  1,
  "New Balance 550 Men's Sneakers - White",
  2099000,
  "assets/img/nb-1.png"
);
const produk2 = new Product(
  2,
  "New Balance Made In USA 990v6",
  4499000,
  "assets/img/nb-2.png"
);
const produk3 = new Product(
  3,
  "New Balance 2002R Men's Sneakers- Grey",
  2299000,
  "assets/img/nb-3.png"
);
const produk4 = new Product(
  4,
  "New Balance 1906 Men's Sneakers Shoes - Grey",
  2599000,
  "assets/img/nb-4.png"
);
const produk5 = new Product(
  5,
  "Nike Air Force 1 Low",
  2249000,
  "assets/img/nike-1.png"
);
const produk6 = new Product(
  6,
  "Nike Dunk Low Gorge Green Navy",
  2499000,
  "assets/img/nike-2.png"
);
const produk7 = new Product(
  7,
  "Nike Blazer Vintage",
  2100000,
  "assets/img/nike-3.png"
);
const produk8 = new Product(
  8,
  "Sepatu Nike Air Jordan 1 Low Light Smoke Grey",
  1650000,
  "assets/img/nike-4.png"
);

const products = [
  produk1,
  produk2,
  produk3,
  produk4,
  produk5,
  produk6,
  produk7,
  produk8,
];

Product.showProduct(products);

const cart = new Cart();

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-tambahKeranjang");
  const cartPembayaran = document.getElementById("cartPembayaran");
  const btnStruk = document.querySelector('.btn-struk');
  let showCart = false;

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-hapusProduk")) {
      event.preventDefault();
      const productId = event.target.getAttribute("data-id");
      console.log(cart.cartItems);
      cart.deleteItemFromCart(productId);
      console.log(cart.cartItems);
    }
  });

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      event.preventDefault();
      const quantityInput = document.querySelectorAll(".num")[index];
      const quantity = parseInt(quantityInput.textContent);
      const existingProduct = cart.cartItems.find(
        (item) => item.namaProduk === products[index].namaProduk
      );

      let product;

      if (quantity > 0) {
        if (!showCart) {
          cart.initCart();
          showCart = true;
        }
        cartPembayaran.style.display = "block";
        numValues[index] = 0;
        num[index].textContent = "0";
        if (existingProduct) {
          existingProduct.quantity += quantity;
          cart.updateCartView();
          console.log("existing");
        } else {
          product = products[index];
          product.quantity = quantity;
          cart.addToCart(product, quantity);
          console.log("not existing");
        }
        
        quantityInput.textContent = "0";

        scrollPageToBottom();

      } else {
        alert("Harap masukkan jumlah produk yang valid.");
      }

      cart.updatePayment();
    });
  });

  

  btnStruk.addEventListener("click", () => {
    cart.printReceipt();
    cart.updateReceipt();
  })

  
});

const plus = document.querySelectorAll(".plus");
const num = document.querySelectorAll(".num");
const minus = document.querySelectorAll(".minus");

let numValues = [];

for (let i = 0; i < plus.length; i++) {
  numValues.push(0);
}

plus.forEach((element, i) => {
  element.addEventListener("click", function () {
    numValues[i]++;
    num[i].textContent = numValues[i];
  });
});

minus.forEach((element, i) => {
  element.addEventListener("click", function () {
    numValues[i]--;
    num[i].textContent = numValues[i];
  });
});