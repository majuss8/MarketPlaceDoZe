import { getCartItems, removeFromCart } from '../services/cartService';

document.addEventListener('DOMContentLoaded', async () => {
  const cartList = document.getElementById('cart-list');
  try {
    const items = await getCartItems();

    items.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <h5>${item.name}</h5>
        <p>Preço: R$ ${item.price}</p>
        <button class="btn btn-danger remove-item" data-id="${item.id}">Remover</button>
      `;

      cartList.appendChild(cartItemElement);
    });

    cartList.addEventListener('click', async (e) => {
      if (e.target.classList.contains('remove-item')) {
        const id = e.target.getAttribute('data-id');
        await removeFromCart(id);
        e.target.parentElement.remove(); // Remove o item da lista
      }
    });
  } catch (error) {
    console.error('Erro ao carregar itens do carrinho:', error);
  }
});