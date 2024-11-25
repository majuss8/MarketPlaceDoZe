Parse.initialize("uN5Y1aXedE7dEvVvTUbpVSU6nuFBVSNpBVd550kz", "1VeLKickMsxP0RMsuxk7qJu7yKlxnDizSRFsS9P7");
Parse.serverURL = "https://parseapi.back4app.com";

// Função para inicializar o dashboard
const initializeDashboard = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    window.location.href = "../../login/index.html";
    return;
  }
  fetchVendorProducts();
};

// Função para buscar produtos do vendedor
const fetchVendorProducts = async () => {
  const currentUser = await Parse.User.currentAsync();
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  query.equalTo("vendedorId", currentUser);

  try {
    const results = await query.find();
    console.log("Produtos retornados:", results);  // Verificar os resultados da query
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
                <button class="btn btn-sm btn-primary" onclick="openEditModal('${id}')">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${id}')">Excluir</button>
              </div>
              <div>
                ${currentUser.get("tipo") !== "vendedor" ? `<button class="btn btn-sm btn-success" onclick="addToCart('${id}')">Adicionar ao Carrinho</button>` : ""}
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

// Função para adicionar produto
const addProduct = async (nome, descricao, categoria, preco, quantidade, imagemFile) => {
  const Product = Parse.Object.extend("Product");
  const product = new Product();

  product.set("nome", nome);
  product.set("descricao", descricao);
  product.set("categoria", categoria);
  product.set("preco", parseFloat(preco));
  product.set("quantidade", parseInt(quantidade));

  // Obter o usuário atual
  const currentUser = await Parse.User.currentAsync();

  // Atribuir o Pointer do usuário ao vendedorId
  product.set("vendedorId", currentUser);

  if (imagemFile) {
    const file = new Parse.File(imagemFile.name, imagemFile);
    try {
      await file.save();
      console.log("Imagem salva com sucesso:", file.url());
      product.set("imagem", file);
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      alert("Erro ao salvar imagem. Tente novamente.");
      return;
    }
  }

  // Modifique esta parte da função de adicionar produto
  try {
    const savedProduct = await product.save();
    if (savedProduct) {
      console.log("Produto adicionado com sucesso:", savedProduct);
      alert("Produto adicionado com sucesso!");

      // Obtém a instância do modal e o fecha
      const addProductModal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
      if (addProductModal) {
        addProductModal.hide();
      }

      fetchVendorProducts();
    } else {
      throw new Error("Produto não foi salvo corretamente.");
    }
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    alert("Ocorreu um erro ao adicionar o produto. Tente novamente.");
  }

};

// Enviar o formulário de adicionar produto
document.getElementById("addProductForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("prodNome").value;
  const descricao = document.getElementById("prodDescricao").value;
  const categoria = document.getElementById("prodCategoria").value;
  const preco = document.getElementById("prodPreco").value;
  const quantidade = document.getElementById("prodQuantidade").value;
  const imagemFile = document.getElementById("prodImagem").files[0];

  addProduct(nome, descricao, categoria, preco, quantidade, imagemFile);
});