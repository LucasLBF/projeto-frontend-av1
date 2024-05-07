const createBackBtn = () => {
    const form = document.getElementById("sign-up-form");
    const backBtn = document.createElement("a");
    backBtn.href = document.referrer;
    backBtn.className = "btn btn-danger";
    backBtn.textContent = "Voltar"
    form.appendChild(backBtn);
}

createBackBtn();