// Carrega todos os usuários e popula a tabela
function carregarTodos() {
    fetch('http://localhost:3000/pessoas')
    .then(res => res.json())
    .then(data => {
        montarTabela(data);
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao carregar dados.');
    });
}

// Monta a tabela com os dados
function montarTabela(lista) {
    var corpo = document.getElementById('tabela-corpo');
    corpo.innerHTML = '';

    if (!lista || lista.length === 0) {
        corpo.innerHTML = '<tr><td colspan="7">Nenhum registro encontrado.</td></tr>';
        return;
    }

    lista.forEach(item => {
        var tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${item.id || ''}</td>
            <td>${item.nome || ''}</td>
            <td>${item.sobrenome || ''}</td>
            <td>${item.cpf || ''}</td>
            <td>${item.email || ''}</td>
            <td>${item.telefone || ''}</td>
            <td class="row-actions">
              <button onclick="irEditar('${item.cpf}')">Editar</button>
              <button onclick="irDeletar('${item.cpf}')">Deletar</button>
            </td>
        `;

        corpo.appendChild(tr);
    });
}

// Busca por CPF (usa query param)
function buscarPorCPF() {
    var cpf = document.getElementById('filtroCPF').value;
    if (!cpf) {
        alert('Digite um CPF para buscar.');
        return;
    }

    fetch('http://localhost:3000/pessoas?cpf=' + encodeURIComponent(cpf))
    .then(res => res.json())
    .then(data => {
        montarTabela(data);
    })
    .catch(err => {
        console.error(err);
        alert('Erro na busca por CPF.');
    });
}

// redireciona para a página de edição (put.html) passando o CPF na query string
function irEditar(cpf) {
    window.location.href = 'put.html?cpf=' + encodeURIComponent(cpf);
}

// redireciona para a página de confirmação de exclusão (delete.html) passando o CPF
function irDeletar(cpf) {
    window.location.href = 'delete.html?cpf=' + encodeURIComponent(cpf);
}

// Ao carregar a página, carrega todos
document.addEventListener('DOMContentLoaded', carregarTodos);
