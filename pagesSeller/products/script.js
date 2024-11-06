
  // Função para inicializar o dashboard
  const initializeDashboard = async () => {
    const currentUser = Parse.User.current();
    if (!currentUser || currentUser.get("tipo") !== "vendedor") {
      window.location.href = "login.html";
      return;
    }
    fetchVendorProducts();
  };

  // Função para buscar produtos do vendedor
  const fetchVendorProducts = async () => {
    const currentUser = Parse.User.current();  // Obtenha o usuário atual
    const Product = Parse.Object.extend("Product");
    const query = new Parse.Query(Product);
    query.equalTo("vendedorId", Parse.User.current());

    try {
      const results = await query.find();
      const productsGrid = document.getElementById("productsGrid");
      productsGrid.innerHTML = ""; // Limpa a grid

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
                  <!-- Botão de CRUD para o vendedor -->
                  <button class="btn btn-sm btn-primary" onclick="openEditModal('${id}')">Editar</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteProduct('${id}')">Excluir</button>
                </div>
                <div>
                  <!-- Botão de adicionar ao carrinho para o cliente -->
                  ${currentUser.get("tipo") !== "vendedor" ? `<button class="btn btn-sm btn-success" onclick="addToCart('${id}')">Adicionar ao Carrinho</button>` : ""}
                </div>
              </div>
            </div>
          </div>
        `;
        productsGrid.appendChild(card);
      });
    } catch (error) {
      console.error("Erro ao carregar produtos: ", error);
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

    // Enviar imagem para Parse Server (se houver)
    if (imagemFile) {
      const file = new Parse.File(imagemFile.name, imagemFile);
      try {
        await file.save();
        console.log("Imagem salva com sucesso:", file.url()); // Verificar se a imagem foi salva corretamente
        product.set("imagem", file);
      } catch (error) {
        console.error("Erro ao salvar imagem:", error);
        alert("Erro ao salvar imagem. Tente novamente.");
        return; // Impede que o produto seja salvo sem imagem
      }
    }

    product.set("vendedorId", Parse.User.current());

    try {
      // Tente salvar o produto no banco de dados
      const savedProduct = await product.save();
      console.log("Produto adicionado com sucesso:", savedProduct);

      // Verifique se o produto foi salvo corretamente
      if (savedProduct) {
        console.log("Produto foi salvo com sucesso no banco de dados!");
        alert("Produto adicionado com sucesso!");

        // Fechar o modal utilizando o Bootstrap 5 sem jQuery
        const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
        addProductModal.hide();  // Fechar o modal corretamente

        fetchVendorProducts(); // Atualizar a lista de produtos
      } else {
        throw new Error("Produto não foi salvo corretamente.");
      }
    } catch (error) {
      // Captura qualquer erro que ocorrer durante o processo de salvar o produto
      console.error("Erro ao adicionar produto:", error);
      alert("Ocorreu um erro ao adicionar o produto. Tente novamente.");
    }
  };


  // Enviar o formulário de adicionar produto
  document.getElementById("addProductForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const nome = document.getElementById("prodNome").value;
    const descricao = document.getElementById("prodDescricao").value;
    const categoria = document.getElementById("prodCategoria").value;
    const preco = document.getElementById("prodPreco").value;
    const quantidade = document.getElementById("prodQuantidade").value;
    const imagemFile = document.getElementById("prodImagem").files[0];

    addProduct(nome, descricao, categoria, preco, quantidade, imagemFile);
  });

