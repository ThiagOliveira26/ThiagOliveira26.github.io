alert("Bem vindo! Página com formulário de contato realizado (ETAPA 4).");

function AddCadastro() {
    
    var pre = document.getElementById("listaP").innerHTML;
    var txtNome = document.getElementById("nome").value;
    var txtTel = document.getElementById("telefone").value;
    var txtEmail = document.getElementById("email").value;

    if ((txtNome != "") && (txtTel != "") && (txtEmail)){
    
        var cabecalho = "<tr><th>Nome</th><th>Email</th><th>Telefone</th></tr>";
        document.getElementById("cabecalho").innerHTML = cabecalho;

        txt = "<tr><td>" + txtNome + "</td> <td>" + txtEmail + "</td><td>" + txtTel + "</td></tr>" + pre;
        document.getElementById("listaP").innerHTML = txt;
    }
    else{
        alert("Entrada inválida para cadastro.\nPreencha todos os campos!");
    }
}