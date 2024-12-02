import { getProducts } from '../services/productService';

// Carrega os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts();
  const productList = document.getElementById('product-list');

  // Exibe os produtos na tela
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'mb-3');

    productCard.innerHTML = `
      <div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Preço: R$ ${product.price}</p>
          <a href="#" class="btn btn-primary">Adicionar ao Carrinho</a>
        </div>
      </div>
    `;

    productList.appendChild(productCard);
  });
});