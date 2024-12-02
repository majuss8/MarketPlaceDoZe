import { getProducts } from '../services/productService';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts();
  const productListElement = document.getElementById('product-list');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('card');
    productCard.innerHTML = `
      <img src="${product.image}" class="card-img-top" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.price}</p>
        <a href="/product-details?id=${product.id}" class="btn btn-primary">Ver Detalhes</a>
      </div>
    `;
    productListElement.appendChild(productCard);
  });
});