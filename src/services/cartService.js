import Parse from 'parse';

// Função para adicionar um item ao carrinho
async function addToCart(productId) {
  const Cart = Parse.Object.extend("Cart");
  const cart = new Cart();

  try {
    const currentUser = Parse.User.current();
    if (!currentUser) throw new Error("Usuário não autenticado");

    cart.set("user", currentUser); // Associando o carrinho ao usuário
    cart.set("product", productId); // Associando o produto ao carrinho

    await cart.save();
    return cart;
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho', error.message);
    throw new Error('Falha ao adicionar ao carrinho');
  }
}

// Função para obter os itens do carrinho
async function getCartItems() {
  const Cart = Parse.Object.extend("Cart");
  const query = new Parse.Query(Cart);

  try {
    const currentUser = Parse.User.current();
    if (!currentUser) throw new Error("Usuário não autenticado");

    query.equalTo("user", currentUser); // Busca carrinho do usuário logado

    const cartItems = await query.find();
    return cartItems.map(item => item.get('product'));
  } catch (error) {
    console.error('Erro ao buscar itens no carrinho', error.message);
    throw new Error('Falha ao buscar itens no carrinho');
  }
}

// Função para remover um item do carrinho
async function removeFromCart(cartItemId) {
  const Cart = Parse.Object.extend("Cart");
  const query = new Parse.Query(Cart);

  try {
    const cartItem = await query.get(cartItemId);
    await cartItem.destroy(); // Remove o item do carrinho
    return cartItemId; // Retorna o ID do item removido
  } catch (error) {
    console.error('Erro ao remover item do carrinho', error.message);
    throw new Error('Falha ao remover item do carrinho');
  }
}

export { getCartItems, addToCart, removeFromCart };