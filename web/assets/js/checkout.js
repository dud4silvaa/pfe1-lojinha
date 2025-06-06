document.getElementById('cep').addEventListener('blur', async () => {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  if (cep.length !== 8) return;

  try {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = res.data;
    if (dados.erro) throw new Error("CEP inválido");

    document.getElementById('logradouro').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('cidade').value = dados.localidade;
  } catch (err) {
    alert('Erro ao buscar o CEP');
    console.error(err);
  }
});

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const cliente = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value
  };

  const endereco = {
    cep: document.getElementById('cep').value,
    rua: document.getElementById('logradouro').value,
    numero: document.getElementById('numero').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value
  };

  const cartao = {
    numero: document.getElementById('cartao').value,
    validade: document.getElementById('validade').value,
    cvv: document.getElementById('cvv').value
  };

  const tipoPagamento = cartao.numero.trim() ? 'Cartão de Crédito' : 'PIX';

  const pagamento = {
    tipo: tipoPagamento,
    ...(tipoPagamento === 'Cartão de Crédito' ? cartao : {})
  };

  const pedido = {
    cliente,
    endereco,
    pagamento
  };

  console.log('Pedido enviado:', pedido);

  localStorage.removeItem('carrinho');
  window.location.href = 'concluido.html';
});
