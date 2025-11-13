// Função para enviar os dados POST - CREATE (Cadastro)
function enviarDados() {
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

    // validação mínima
    if (!nome || !sobrenome || !cpf || !email || !senha) {
        alert('Preencha os campos obrigatórios.');
        return;
    }

    fetch('http://localhost:3000/pessoas', {
        method: 'POST',
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
    .then(resposta => resposta.json())
    .then(d => {
        alert('Cadastro realizado com sucesso!');
        // redireciona para tela de boas-vindas
        window.location.href = 'boasvindas.html';
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao cadastrar usuário.');
    });
}
