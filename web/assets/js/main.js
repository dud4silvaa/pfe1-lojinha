const baseURL = './assets/dados.json';

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

axios.get(baseURL).then(res => {
  const produtos = res.data;
  const container = document.getElementById('produtos');

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" />
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">${produto.descricao}</p>
          <p class="fw-bold">${formatarPreco(produto.preco)}</p>
          <a href="detalhes.html?id=${produto.id}" class="btn btn-secondary mb-2">Ver Detalhes do Produto</a>
          <button class="btn btn-primary btn-comprar mt-auto" 
            data-id="${produto.id}"
            data-nome="${produto.nome}"
            data-preco="${produto.preco}"
            data-imagem="${produto.imagem}">
            Comprar
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
});


function abrirCarrinho() {
  const modal = new bootstrap.Modal(document.getElementById('modalCarrinho'));
  const conteudo = document.getElementById('conteudoCarrinho');
  const totalSpan = document.getElementById('totalCarrinho');
  conteudo.innerHTML = '';

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let total = 0;

  if (carrinho.length === 0) {
    conteudo.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalSpan.textContent = '0,00';
    modal.show();
    return;
  }

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-center mb-3';

    div.innerHTML = `
      <img src="${item.imagem}" width="80" alt="${item.nome}">
      <span>${item.nome}</span>
      <span>${formatarPreco(item.preco)}</span>
      <button class="btn btn-danger btn-sm btn-excluir" data-index="${index}">Excluir</button>
    `;
    conteudo.appendChild(div);
    total += item.preco;
  });

  totalSpan.textContent = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  modal.show();

  // Adicionar eventos para excluir itens
  document.querySelectorAll('.btn-excluir').forEach(botao => {
    botao.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      carrinho.splice(idx, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      abrirCarrinho(); // Atualiza modal após exclusão
    });
  });
}


document.querySelector('button[onclick="abrirCarrinho()"]').addEventListener('click', abrirCarrinho);


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-comprar')) {
    const botao = e.target;
    const produto = {
      id: botao.dataset.id,
      nome: botao.dataset.nome,
      preco: parseFloat(botao.dataset.preco),
      imagem: botao.dataset.imagem
    };

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    abrirCarrinho();
  }
});
