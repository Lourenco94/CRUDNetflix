// Deleta registro por CPF (procura e deleta o primeiro encontrado)
function deletarDados() {
    var cpf = document.getElementById('identificadorCPF').value;
    if (!cpf) {
        alert('Digite o CPF para deletar.');
        return;
    }

    // Busca por CPF para obter o id
    fetch('pessoas' + encodeURIComponent(cpf))
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            alert('Nenhum usuário encontrado com esse CPF.');
            return;
        }
        var usuario = data[0];
        var id = usuario.id;

        // Confirmação básica
        if (!confirm('Confirma exclusão do usuário: ' + usuario.nome + ' ' + (usuario.sobrenome||'') + ' ?')) return;

        fetch('pessoas' + id, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                alert('Usuário deletado.');
                window.location.href = 'get.html';
            } else {
                alert('Erro ao deletar usuário.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Erro ao conectar com o backend.');
        });
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao buscar usuário para deletar.');
    });
}

// se page recebeu ?cpf=... preenche automaticamente
(function() {
  var params = new URLSearchParams(location.search);
  var cpfParam = params.get('cpf');
  if (cpfParam) {
    document.getElementById('identificadorCPF').value = cpfParam;
  }
})();


