let showCart = false;
let showPayment = false;

class Product {
  constructor(namaProduk, hargaProduk, fotoProduk) {
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
      productCard.classList.add("col-md-3");
      productCard.innerHTML = `
                <div class="card" style="width: 90%;">
                    <img src="${product.fotoProduk}" class="card-img-top" alt="">
                    <div class="card-body">
                      <h5 class="card-title">${product.namaProduk}</h5>
                      <p class="card-text">Rp ${hargaProdukFormat}</p>
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
            <h1>My Cart</h1>`;
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

  updatePayment() {
    const totalPembelian = document.querySelector(".total-pembelian");
    // const totalPembelianFormat = Product.formatNumberWithCommas(totalPembelian);
    const pajak = document.querySelector(".pajak");
    // const pajakFormat = Product.formatNumberWithCommas(pajak);
    const totalBayar = document.querySelector(".total-bayar");
    // const totalBayarFormat = Product.formatNumberWithCommas(totao);

    let currentPajak = this.calculatePajak();
    let currentTotalBayar = this.calculateTotalBayar();

    // console.log("current total bayar : " + currentTotalBayar);

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
            <div class="col-md-3">
                <p>Rp ${hargaProdukTotal}</p>
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
            <div class="col-md-3">
                <p>Rp ${hargaProdukTotal}</p>
            </div>
        </div>
        <hr>
        `;

      totalHargaProduk += hargaProduk;

      // totalHarga += product.hargaProduk;
      cartItemsContainer.appendChild(cartItem);
    });
    this.totalHarga = totalHargaProduk;
  }
}

// Gunakan fungsi showProduct untuk menampilkan produk
// const produk1 = new Product(
//   "New Balance 550 Men's Sneakers - White",
//   100,
//   "assets/img/nb-1.png"
// );
// const produk2 = new Product(
//   "New Balance Made In USA 990v6",
//   200,
//   "assets/img/nb-2.png"
// );
// const produk3 = new Product(
//   "New Balance 2002R Men's Sneakers- Grey",
//   300,
//   "assets/img/nb-3.png"
// );
// const produk4 = new Product(
//   "New Balance 1906 Men's Sneakers Shoes - Grey",
//   400,
//   "assets/img/nb-4.png"
// );
const produk1 = new Product(
  "New Balance 550 Men's Sneakers - White",
  2099000,
  "assets/img/nb-1.png"
);
const produk2 = new Product(
  "New Balance Made In USA 990v6",
  4499000,
  "assets/img/nb-2.png"
);
const produk3 = new Product(
  "New Balance 2002R Men's Sneakers- Grey",
  2299000,
  "assets/img/nb-3.png"
);
const produk4 = new Product(
  "New Balance 1906 Men's Sneakers Shoes - Grey",
  2599000,
  "assets/img/nb-4.png"
);
const produk5 = new Product(
  "Nike Air Force 1 Low",
  2249000,
  "assets/img/nike-1.png"
);
const produk6 = new Product(
  "Nike Dunk Low Gorge Green Navy",
  2499000,
  "assets/img/nike-2.png"
);
const produk7 = new Product(
  "Nike Blazer Vintage",
  2100000,
  "assets/img/nike-3.png"
);
const produk8 = new Product(
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

const buttons = document.querySelectorAll(".items .btn-tambahKeranjang");
const cart = new Cart();

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-tambahKeranjang");
  const cartPembayaran = document.getElementById("cartPembayaran");
  const cart = new Cart();
  let showCart = false;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const quantityInput = document.querySelectorAll(".num")[index];
      const quantity = parseInt(quantityInput.textContent);
      const existingProduct = cart.cartItems.find(
        (item) => item.namaProduk === products[index].namaProduk
      );

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
        } else {
          const product = products[index];
          product.quantity = quantity;
          cart.addToCart(product, quantity);
        }

        quantityInput.textContent = "0";
      } else {
        alert("Harap masukkan jumlah produk yang valid.");
      }
      cart.updatePayment();
    });
  });
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
