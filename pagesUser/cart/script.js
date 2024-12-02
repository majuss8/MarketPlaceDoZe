// Função para inicializar o carrinho
const initializeCart = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }
  renderCart();
};

// Função para renderizar o carrinho
const renderCart = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const productIds = Object.keys(cart);

  if (productIds.length === 0) {
    document.getElementById("cartTable").getElementsByTagName('tbody')[0].innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Seu carrinho está vazio.</td>
      </tr>
    `;
    document.getElementById("totalAmount").innerText = "Total: R$ 0,00";
    return;
  }

  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  query.containedIn("objectId", productIds);

  try {
    const products = await query.find();
    const cartTableBody = document.getElementById("cartTable").getElementsByTagName('tbody')[0];
    cartTableBody.innerHTML = ""; // Limpa a tabela

    let total = 0;

    products.forEach((product) => {
      const id = product.id;
      const nome = product.get("nome");
      const preco = product.get("preco");
      const quantidade = cart[id];
      const totalItem = preco * quantidade;
      total += totalItem;

      const row = cartTableBody.insertRow();

      row.innerHTML = `
        <td>${nome}</td>
        <td>R$ ${preco.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${quantidade}" class="form-control form-control-sm" 
                 onchange="updateQuantity('${id}', this.value)">
        </td>
        <td>R$ ${totalItem.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart('${id}')">Remover</button>
        </td>
      `;
    });

    document.getElementById("totalAmount").innerText = `Total: R$ ${total.toFixed(2)}`;
  } catch (error) {
    console.error("Erro ao buscar produtos do carrinho:", error);
    alert("Erro ao carregar carrinho.");
  }
};

// Função para atualizar a quantidade de um item no carrinho
const updateQuantity = (productId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (newQuantity < 1) {
    delete cart[productId];
  } else {
    cart[productId] = parseInt(newQuantity);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// Função para remover um item do carrinho
const removeFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  delete cart[productId];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

// Função para finalizar o pedido
const checkout = async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const productIds = Object.keys(cart);

  if (productIds.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  query.containedIn("objectId", productIds);

  try {
    const products = await query.find();
    let mensagem = "Pedido:%0A";
    let total = 0;

    products.forEach((product) => {
      const id = product.id;
      const nome = product.get("nome");
      const preco = product.get("preco");
      const quantidade = cart[id];
      const totalItem = preco * quantidade;
      total += totalItem;
      mensagem += `Produto: ${nome} - Quantidade: ${quantidade} - Total: R$ ${totalItem.toFixed(2)}%0A`;
    });

    mensagem += `Total Geral: R$ ${total.toFixed(2)}`;

    const numeroGustavo = "5511999999999"; // Substitua pelo número correto
    const linkWhatsApp = `https://wa.me/${numeroGustavo}?text=${mensagem}`;
    window.open(linkWhatsApp, "_blank");
  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
    alert("Erro ao finalizar pedido.");
  }
};