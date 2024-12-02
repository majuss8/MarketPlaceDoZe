import { Parse } from '../utils/api.js';

// Função para obter todos os produtos (visíveis para todos os usuários)
async function getProducts() {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  query.include("seller"); // Inclui informações do vendedor

  try {
    const products = await query.find();
    return products.map(product => ({
      id: product.id,
      name: product.get('name'),
      description: product.get('description'),
      price: product.get('price'),
      sellerId: product.get('seller').id, // Referência ao vendedor
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos', error.message);
    throw new Error('Falha ao buscar produtos');
  }
}

// Função para adicionar um produto (apenas para o vendedor)
async function addProduct(name, description, price) {
  const Product = Parse.Object.extend("Product");
  const product = new Product();

  try {
    const currentUser = Parse.User.current();
    if (!currentUser) throw new Error("Usuário não autenticado");

    product.set("name", name);
    product.set("description", description);
    product.set("price", price);
    product.set("seller", currentUser); // Vendedor associado ao produto

    await product.save();
    return product; // Retorna o produto salvo
  } catch (error) {
    console.error('Erro ao adicionar produto', error.message);
    throw new Error('Falha ao adicionar produto');
  }
}

// Função para remover um produto
async function removeProduct(productId) {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  try {
    const product = await query.get(productId);
    await product.destroy(); // Deleta o produto
    return productId; // Retorna o ID do produto removido
  } catch (error) {
    console.error('Erro ao remover produto', error.message);
    throw new Error('Falha ao remover produto');
  }
}

export { getProducts, addProduct, deleteProduct };