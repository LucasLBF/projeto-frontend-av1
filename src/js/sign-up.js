function linkBackBtn() {
    const backBtn = document.getElementById("back");
    backBtn.href = document.referrer;
}

function createUser() {
    console.log("Creating user ...");
    if (validateFormFields()) {
        showMessage("success");
        return;
    }

    showMessage("failure");
}

function validateFormFields() {
    var form = new FormData(document.getElementById("sign-up-form"));
    console.log(form.get("email"));
    console.log(form.get("senha"));
    console.log(form.get("confirmar-senha"));
    console.log(form.get("nome"));
    console.log(form.get("cpf"));
    console.log(form.get("data-nascimento"));
    console.log(form.get("telefone"));
    console.log(form.get("estado-civil"));

    return true;
}

function showMessage(status) {
    const msgContainer = document.getElementById("msg-container");
    if (status === "success") {
        msgContainer.textContent = "Validação realizada com sucesso!"

    } else if (status === "failure") {
        msgContainer.textContent = "Ocorreu um erro ao validar os campos"

    }
}

linkBackBtn();
