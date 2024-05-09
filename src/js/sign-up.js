class SignupValidator {
    constructor() {
        this.validations = {
            "isValid": true,
            "email": [],
            "senha": [],
            "confirmar-senha": [],
            "nome": [],
            "cpf": [],
            "data-nascimento": [],
            "telefone": [],
        }

        this.allowedSpecialChars = [
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

        this.notAllowedSpecialChars = [
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
    }

    validateFormFields() {
        var form = new FormData(document.getElementById("sign-up-form"));
        const fieldsValid = [];

        const emailEl = form.get("email");
        const passwordEl = form.get("senha");
        const confirmPasswordEl = form.get("confirmar-senha");
        const nameEl = form.get("nome");
        const cpfEl = form.get("cpf")
        const birthdayEl = form.get("data-nascimento");
        const phone = form.get("telefone");
        const maritalStatus = form.get("estado-civil");

        fieldsValid.push(this.validateName(nameEl));
        fieldsValid.push(this.validateEmail(emailEl));
        fieldsValid.push(this.validatePassword(passwordEl, confirmPasswordEl));
        fieldsValid.push(this.validateCpf(cpfEl));
        fieldsValid.push(this.validateBirthday(birthdayEl));
        fieldsValid.push(this.validatePhone(phone));

        this.validations.isValid = fieldsValid.every(fieldValid => fieldValid === true);
        return this.validations;
    }

    validateEmail(email) {
      if (email.length === 0) {
        this.validations["email"].push("Por favor, preencha o campo de email.");
        return false;
      }

      const re = /\S+@\S+\.\S+/;

      if(!re.test(email)) {
        this.validations["email"].push("Formato de email inválido.");
        return false;
      }

      return true;
    }

    validatePassword(password, confirmPassword) {
      let passwordArray = password.split("");

      if (password === "") {
        this.validations["senha"].push("Por favor, preencha o campo de senha.");
        return false;
      }

      if (password.length < 6) {
        this.validations["senha"].push("A senha deve ter pelo menos 6 caracteres");
        return false;
      }

      if (!passwordArray.some((c) => !isNaN(c))) {
        this.validations["senha"].push("A senha deve ter pelo menos 1 caractere númerico");
        return false;
      }

      if (!passwordArray.some((c) => this.allowedSpecialChars.includes(c))) {
        this.validations["senha"].push("A senha deve ter pelo menos 1 caractere especial: @ # $ % & * ! ? / \\ | - _ + . = ");
        return false;
      }

      if (!passwordArray.some((c) => c == c.toUpperCase())) {
        this.validations["senha"].push( "A senha deve ter pelo menos 1 caractere Maiúsculo");
        return false;
      }

      if (passwordArray.some((c) => this.notAllowedSpecialChars.includes(c))) {
        this.validations["senha"].push( "A senha não pode conter os caracteres especiais: ' { } [ ] ´ ` ~ ^ : ; < > , “ ‘");
        return false;
      }

      if (confirmPassword === "") {
        this.validations["confirmar-senha"].push("Por favor, preencha o campo de confirmação de senha.");
        return false;
      }

      if (password !== confirmPassword) {
        this.validations["confirmar-senha"].push("Senha e Confirmar Senha não são iguais");
        return false;
      }

      return true;
    }

    validateName(name) {
        const nameArray = name.split(" ");
        const nameWordsArray = name.split("");

        if (name.length === 0) {
            this.validations["nome"].push( "Por favor, preencha o nome.");
            return false;
        }

        if (nameArray.length < 2) {
            this.validations["nome"].push("O nome deve conter pelo menos duas palavras.");
            return false;
        }

        if (nameArray[0].length < 2) {
            this.validations["nome"].push("O primeiro nome deve ter pelo menos dois caracteres.");
            return false;
        }

        if (
            nameWordsArray.some((c) => this.allowedSpecialChars.includes(c)) ||
            nameWordsArray.some((c) => this.notAllowedSpecialChars.includes(c))
    ) {
        this.validations["nome"].push("O nome não deve conter caracteres especiais.")
        return false;
      }

      return true;
    }

    validateCpf(cpf) {
      console.log(cpf);
      if (cpf.length === 0) {
            this.validations["cpf"].push( "Por favor, preencha o CPF.");
            return false;
      }

      cpf = cpf.replace(/\D/g, '');

      if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
        this.validations["cpf"].push("CPF inválido.");
        return false;
      }

      var result = true;

      [9,10].forEach((j) => {
          var sum = 0, r;
          cpf.split(/(?=)/).splice(0,j).forEach((e, i) => {
              sum += parseInt(e) * ((j+2)-(i+1));
          });
          r = sum % 11;
          r = (r < 2) ? 0 : 11-r;

          if (r != cpf.substring(j, j + 1)) {
            result = false;
          } 
      });

      if (!result) {
        this.validations["cpf"].push( "CPF inválido.");
      }

      return result;
    }

    validateBirthday(birthday) {
      if (birthday.length === 0) {
        this.validations["data-nascimento"].push("Por favor, preencha a data de nascimento.");
        return false;
      }

      const birthDate = new Date(birthday);
      const today = new Date();
      const diffInYears = today.getFullYear() - birthDate.getFullYear();

      if (diffInYears < 18) {
        this.validations["data-nascimento"].push("Você deve ser maior de 18 anos para se cadastrar.");
        return false;
      }

      return true;
    }

    validatePhone(phone) {
      if (phone.length > 0) {
        const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
        const result = regex.test(phone);
        
        if (!result) {
          this.validations["telefone"].push("Número de telefone inválido.");
          return false;
        }
      }

      return true;
    } 
}

function linkBackBtn() {
    const backBtn = document.getElementById("back");
    backBtn.href = document.referrer;
}

function createUser() {
    const formValidator = new SignupValidator();

    const validations = formValidator.validateFormFields()

    showMessage(validations);
}

function showMessage(validations) {
    const msgContainer = document.getElementById("msg-container");

    if (validations.isValid) {
        const formEl = document.querySelector("form");
        formEl.reset();
        removeValidationMessages()
        msgContainer.className = "alert alert-success";
        msgContainer.textContent = "Validação realizada com sucesso!";
    } else {
        msgContainer.className = "alert alert-danger";
        msgContainer.textContent = "Ocorreu um erro ao validar os campos";
        populateValidations(validations);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function populateValidations(validations) {
        delete validations["isValid"];
        removeValidationMessages()

        Object.keys(validations).forEach(validation => {
          var field = document.getElementById(validation);

          if (validations[validation].length > 0) {
            
            const validatorAlert = document.createElement("div");
            validatorAlert.className = "field-validators text-danger";
            field.parentNode.insertBefore(validatorAlert, field.nextSibling);

            validations[validation].forEach(textMsg => {
              const validationTextEl = document.createElement("p");
              validationTextEl.textContent = textMsg;
              validatorAlert.appendChild(validationTextEl);
            });
          }
        });

}

function focusOnEmail() {
  document.getElementById("email").focus();
  removeValidationMessages()

  const msgContainer = document.getElementById("msg-container");
  msgContainer.textContent = "";
  msgContainer.className = "";
}

function removeValidationMessages() {
  const validators = document.querySelectorAll(".field-validators");

  for (var validator of validators) {
    validator.remove();
  }
}

function cpfMask() {
  const cpfEl = document.getElementById("cpf");

  cpfEl.addEventListener("input", () => {
    var i = cpfEl.value.length;
    var str = cpfEl.value
    if (isNaN(Number(str.charAt(i - 1)))) {
      document.getElementById("cpf").value = str.substr(0, i - 1)
    }
  });

  document.addEventListener('keydown', (event) => { 
    if(event.keyCode != 46 && event.keyCode != 8) {
    var i = cpfEl.value.length;
    if (i === 3 || i === 7)
      cpfEl.value = cpfEl.value + ".";
    else if (i === 11) 
      cpfEl.value = cpfEl.value + "-";
    }
  });
}

linkBackBtn();
cpfMask();
