import { getProducts } from '../services/productService';

document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');

  try {
    const products = await getProducts();
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'col-md-4 mb-3';
      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Preço: R$ ${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });

    productList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('add-to-cart')) {
        const id = e.target.getAttribute('data-id');
        console.log('Produto adicionado ao carrinho:', id);
      }
    });
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
});