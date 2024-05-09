const loginInput = document.getElementById("login");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const validacoes = document.getElementById("validacoes");

const caracteresEspeciaisPerm = [
  "@",
  "#",
  "$",
  "%",
  "&",
  "*",
  "!",
  "?",
  "/",
  "\\",
  "|",
  "-",
  "_",
  "+",
  ".",
  "=",
];
const caracteresEspeciaisNaoPerm = [
  " ̈",
  "{",
  "}",
  "[",
  "]",
  "´",
  "`",
  "~",
  "^",
  ":",
  ";",
  "<",
  ">",
  ",",
  "“",
  "‘",
];

var valArray = [];

function validarEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validaSenha(senha, confirmarSenha) {
  let senhaStr = String(senha);
  let senhaArray = senhaStr.split("");

  if (senhaStr === "") {
    alert("Por favor, preencha o campo de senha.");
    return;
  }

  if (confirmarSenha === "") {
    alert("Por favor, preencha o campo de confirmação de senha.");
    return;
  }

  if (senhaStr.length < 6) {
    let p = document.createElement("p");
    p.innerHTML = "- A senha deve ter pelo menos 6 caracteres";
    valArray.push(p);
  }

  if (senhaStr !== confirmarSenha) {
    let p = document.createElement("p");
    p.innerHTML = "- Senha e Confirmar Senha não são iguais";
    valArray.push(p);
  }

  if (senhaArray.filter((c) => !isNaN(c)).length == 0) {
    let p = document.createElement("p");
    p.innerHTML = "- A senha deve ter pelo menos 1 caractere númerico";
    valArray.push(p);
  }

  if (
    senhaArray.filter((c) => caracteresEspeciaisPerm.includes(c)).length == 0
  ) {
    let p = document.createElement("p");
    p.innerHTML =
      "- A senha deve ter pelo menos 1 caractere especial: @ # $ % & * ! ? / \\ | - _ + . = ";
    valArray.push(p);
  }

  if (senhaArray.filter((c) => c == c.toUpperCase()).length == 0) {
    let p = document.createElement("p");
    p.innerHTML = "- A senha deve ter pelo menos 1 caractere Maiúsculo";
    valArray.push(p);
  }

  if (
    senhaArray.filter((c) => caracteresEspeciaisNaoPerm.includes(c)).length > 0
  ) {
    let p = document.createElement("p");
    p.innerHTML =
      '- A senha não pode conter os caracteres especiais: " { } [ ] ´ ` ~ ^ : ; < > , “ ‘';
    valArray.push(p);
  }

  if (valArray.length != 0) {
    valArray.forEach((el) => {
      validacoes.appendChild(el);
    });
    return false;
  }
  return true;
}

function validarFormulario() {
  const login = loginInput.value.trim();
  const senha = senhaInput.value.trim();
  const confirmarSenha = confirmarSenhaInput.value.trim();

  if (!validarEmail(login)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  if (validaSenha(senha, confirmarSenha)) {
    alert("Validação realizada com sucesso.");
    window.location.href = "/projeto-frontend-av1/src/pages/services.html";
  }
}

function focusLogin() {
  loginInput.focus();
}

function limpaVal() {
  valArray.forEach((c) => validacoes.removeChild(c));
  valArray = [];
}
