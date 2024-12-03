Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Função para inicializar o dashboard geral
const initializeDashboard = async () => {
  await fetchAllProducts();  // Carrega todos os produtos
};

// Função para buscar todos os produtos
const fetchAllProducts = async () => {
  const currentUser = await Parse.User.currentAsync();  // Obtém o usuário atual de forma assíncrona
  if (!currentUser) {
    alert("Você precisa estar logado para ver os produtos.");
    window.location.href = "../login/index.html";  // Se não estiver logado, redireciona para a página de login
    return;
  }

  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  try {
    const results = await query.find();
    console.log("Produtos gerais:", results);  // Verificar os resultados da query
    const productsGrid = document.getElementById("productsGrid");
    productsGrid.innerHTML = "";  // Limpar a grid antes de renderizar

    results.forEach((product) => {
      const nome = product.get("nome");
      const descricao = product.get("descricao");
      const categoria = product.get("categoria");
      const preco = product.get("preco");
      const quantidade = product.get("quantidade");
      const imagem = product.get("imagem") ? product.get("imagem").url() : "https://via.placeholder.com/150";
      const id = product.id;

      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");
      card.innerHTML = `
        <div class="card">
          <img src="${imagem}" class="card-img-top" alt="${nome}">
          <div class="card-body">
            <h5 class="card-title">${nome}</h5>
            <p class="card-text">${descricao}</p>
            <p><strong>Categoria:</strong> ${categoria}</p>
            <p><strong>Preço:</strong> R$ ${preco.toFixed(2)}</p>
            <p><strong>Quantidade:</strong> ${quantidade}</p>
            <div class="d-flex justify-content-between">
              <div>
                ${currentUser.get("tipo") !== "vendedor" ? 
                  `<button class="btn btn-sm btn-success" onclick="addToCart('${id}')">Adicionar ao Carrinho</button>` : ""}
              </div>
            </div>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
};

// Função para adicionar produto ao carrinho
const addToCart = (productId) => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    alert("Você precisa estar logado para adicionar produtos ao carrinho.");
    return;
  }
  // Implementar a lógica de adicionar o produto ao carrinho do usuário
  alert(`Produto ${productId} adicionado ao carrinho.`);
};

// Função de logout
const logout = async () => {
  await Parse.User.logOut();
  window.location.href = "../login/index.html";
};

window.onload = initializeDashboard();
