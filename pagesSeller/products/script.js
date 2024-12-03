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
    console.log("Produtos retornados:", results);

    const productsGrid = document.getElementById("productsGrid");
    productsGrid.innerHTML = ""; // Limpar a grade

    if (results.length === 0) {
      productsGrid.innerHTML = "<p>Nenhum produto encontrado.</p>";
    }

    results.forEach((product) => {
      const productCard = `
        <div class="col-md-4 mb-3">
          <div class="card">
            <img src="${product.get("imagem") ? product.get("imagem").url() : 'default-image.jpg'}" class="card-img-top" alt="Imagem do Produto">
            <div class="card-body">
              <h5 class="card-title">${product.get("nome")}</h5>
              <p class="card-text">${product.get("descricao")}</p>
              <p class="card-text"><strong>Categoria:</strong> ${product.get("categoria")}</p>
              <p class="card-text"><strong>Preço:</strong> R$${product.get("preco").toFixed(2)}</p>
              <p class="card-text"><strong>Quantidade:</strong> ${product.get("quantidade")}</p>
              <button class="btn btn-primary btn-sm" onclick="openEditModal('${product.id}')">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Excluir</button>
            </div>
          </div>
        </div>
      `;

      productsGrid.innerHTML += productCard;
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    alert("Erro ao carregar os produtos. Tente novamente.");
  }
};

// Função para abrir o modal de edição com os dados do produto
const openEditModal = async (productId) => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  try {
    const product = await query.get(productId);

    // Preencher o modal com os dados do produto
    document.getElementById("editProductId").value = product.id;
    document.getElementById("editProdNome").value = product.get("nome");
    document.getElementById("editProdDescricao").value = product.get("descricao");
    document.getElementById("editProdCategoria").value = product.get("categoria");
    document.getElementById("editProdPreco").value = product.get("preco");
    document.getElementById("editProdQuantidade").value = product.get("quantidade");

    // Abrir o modal
    const editModal = new bootstrap.Modal(document.getElementById("editProductModal"));
    editModal.show();
  } catch (error) {
    console.error("Erro ao abrir modal de edição:", error);
    alert("Erro ao carregar os dados do produto. Tente novamente.");
  }
};

// Função para salvar alterações do produto
document.getElementById("editProductForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const productId = document.getElementById("editProductId").value;
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  try {
    const product = await query.get(productId);

    // Atualizar os valores
    product.set("nome", document.getElementById("editProdNome").value);
    product.set("descricao", document.getElementById("editProdDescricao").value);
    product.set("categoria", document.getElementById("editProdCategoria").value);
    product.set("preco", parseFloat(document.getElementById("editProdPreco").value));
    product.set("quantidade", parseInt(document.getElementById("editProdQuantidade").value, 10));

    // Salvar no Parse
    await product.save();

    // Atualizar a grade e fechar o modal
    fetchVendorProducts();
    bootstrap.Modal.getInstance(document.getElementById("editProductModal")).hide();
    alert("Produto atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar alterações:", error);
    alert("Erro ao salvar as alterações. Tente novamente.");
  }
});

// Função para excluir um produto
const deleteProduct = async (productId) => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  try {
    const product = await query.get(productId);

    // Deletar o produto
    await product.destroy();

    // Atualizar a grade
    fetchVendorProducts();
    alert("Produto excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    alert("Erro ao excluir o produto. Tente novamente.");
  }
};
