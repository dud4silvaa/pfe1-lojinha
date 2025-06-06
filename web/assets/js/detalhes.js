
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

axios.get('./assets/dados.json').then(res => {
  const produto = res.data.find(p => p.id == id);
  const container = document.getElementById('detalhes');

  if (!produto) {
    container.innerHTML = '<p>Produto não encontrado.</p>';
    return;
  }

  container.innerHTML = `
    <div class="col-md-6">
      <img src="${produto.imagem}" class="img-fluid" alt="${produto.nome}" />
    </div>
    <div class="col-md-6">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <p class="fw-bold fs-4 text-success">R$ ${produto.preco.toLocaleString('pt-BR')}</p>

      <div class="accordion mb-3" id="accordionDetalhes">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#especificacoes">Especificações Técnicas</button>
          </h2>
          <div id="especificacoes" class="accordion-collapse collapse show">
            <div class="accordion-body">Motor, Câmbio, Airbags, etc.</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#cores">Cores Disponíveis</button>
          </h2>
          <div id="cores" class="accordion-collapse collapse">
            <div class="accordion-body">Prata, Preto, Branco...</div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" onclick='adicionarAoCarrinho(${JSON.stringify(produto)})'>Comprar</button>
    </div>
  `;
});

function adicionarAoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  window.location.href = 'checkout.html';
}
