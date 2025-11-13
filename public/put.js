var usuarioIdAtual = null;

// Busca por CPF e popula o formulário para edição
function buscarParaEditar() {
    var cpfBuscar = document.getElementById('identificadorCPF_busca').value;
    if (!cpfBuscar) {
        alert('Digite o CPF para carregar dados.');
        return;
    }

    fetch('pessoas' + encodeURIComponent(cpfBuscar))
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            alert('Nenhum usuário encontrado com esse CPF.');
            return;
        }
        var usuario = data[0];
        usuarioIdAtual = usuario.id;

        // preenche os campos (mesmos IDs usados no cadastro)
        document.getElementById('nome').value = usuario.nome || '';
        document.getElementById('sobrenome').value = usuario.sobrenome || '';
        document.getElementById('identificadorCPF').value = usuario.cpf || '';
        document.getElementById('email').value = usuario.email || '';
        document.getElementById('senha').value = usuario.senha || '';
        document.getElementById('rua').value = usuario.rua || '';
        document.getElementById('cep').value = usuario.cep || '';
        document.getElementById('cidade').value = usuario.cidade || '';
        document.getElementById('estado').value = usuario.estado || '';
        document.getElementById('telefone').value = usuario.telefone || '';
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao buscar usuário.');
    });
}

// Salva as alterações via PUT
function salvarEdicao() {
    if (!usuarioIdAtual) {
        alert('Carregue um usuário primeiro.');
        return;
    }

    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var cpf = document.getElementById('identificadorCPF').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var rua = document.getElementById('rua').value;
    var cep = document.getElementById('cep').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;
    var telefone = document.getElementById('telefone').value;

    fetch('pessoas' + usuarioIdAtual, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            email: email,
            senha: senha,
            rua: rua,
            cep: cep,
            cidade: cidade,
            estado: estado,
            telefone: telefone
        })
    })
    .then(res => res.json())
    .then(d => {
        alert('Usuário atualizado com sucesso.');
        window.location.href = 'get.html';
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao salvar alterações.');
    });
}

// Se a página for acessada com ?cpf=xxx (vindo da lista), já carrega automaticamente
(function() {
  var params = new URLSearchParams(location.search);
  var cpfParam = params.get('cpf');
  if (cpfParam) {
    document.getElementById('identificadorCPF_busca').value = cpfParam;
    buscarParaEditar();
  }
})();


