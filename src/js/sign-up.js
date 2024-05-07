const linkBackBtn = () => {
    const backBtn = document.getElementById("back");
    backBtn.href = document.referrer;
}

linkBackBtn()