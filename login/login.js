const loginInput = document.getElementById("login");
const senhaInput = document.getElementById("password");

const validacoes = document.getElementById("validacoes");

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const caracteresEspeciaisPerm = ['@', '#', '$', '%', '&', '*', '!', '?', '/', '\\', '|', '-', '_', '+', '.', '='];
const caracteresEspeciaisNaoPerm = [' ̈', '{', '}', '[', ']', '´', '`', '~', '^', ':', ';', '<', '>', ',', '“', '‘'];

var valArray = [];

function validateEmail(login) {
    return emailPattern.test(login)

}
function validatePassword(senha) {
    let senhaStr = String(senha);
    let senhaArray = senhaStr.split('');

    if (senhaStr === "") {
        alert("Por favor, preencha o campo de senha.");
        return;
    }

    if (senhaStr.length < 6) {
        let p = document.createElement("p");
        p.innerHTML = "- A senha deve ter pelo menos 6 caracteres";
        valArray.push(p);
    }

    if (senhaArray.filter(c => !isNaN(c)).length == 0) {
        let p = document.createElement("p");
        p.innerHTML = "- A senha deve ter pelo menos 1 caractere númerico";
        valArray.push(p);
    }

    if (senhaArray.filter(c => caracteresEspeciaisPerm.includes(c)).length == 0) {
        let p = document.createElement("p");
        p.innerHTML = "- A senha deve ter pelo menos 1 caractere especial: @ # $ % & * ! ? / \\ | - _ + . = ";
        valArray.push(p);
    }

    if (senhaArray.filter(c => c == c.toUpperCase()).length == 0) {
        let p = document.createElement("p");
        p.innerHTML = "- A senha deve ter pelo menos 1 caractere Maiúsculo";
        valArray.push(p);
    }

    if (senhaArray.filter(c => caracteresEspeciaisNaoPerm.includes(c)).length > 0) {
        let p = document.createElement("p");
        p.innerHTML = "- A senha não pode conter os caracteres especiais: \" { } [ ] ´ ` ~ ^ : ; < > , “ ‘";
        valArray.push(p);
    }

    if (valArray.length != 0) {
        valArray.forEach(el => {
            validacoes.appendChild(el);
        });
        return false;
    }
    return true;
}



function validateFormulario() {
    const login = loginInput.value.trim();
    const senha = senhaInput.value.trim();


    if (!validateEmail(login)) {
        alert("Digite um email válido")
    }

    if (validatePassword(senha)) {
        alert("Validação realizada com sucesso.");
    };

}

function limpaVal() {
    valArray.forEach(c => validacoes.removeChild(c));
    valArray = [];
}

function focusLogin() {
    loginInput.focus();
}
