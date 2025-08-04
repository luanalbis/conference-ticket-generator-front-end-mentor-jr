let name, email, username, avatar;
const avatarInput = document.getElementById('input-img');


avatarInput.addEventListener('change', e => {
    avatar = e.target.files[0];
    if (avatar) {
        const isValidType = avatar.type === 'image/jpeg' || avatar.type === 'image/png';
        const isValidSize = avatar.size <= 5 * 1024 * 1024;

        if (isValidType && isValidSize) {
            document.getElementById('avatar-image').src = URL.createObjectURL(avatar);
            document.getElementById('conteiner-btns-remove-change').style.display = 'block';
            document.getElementById('txt-upload').style.display = 'none'
        } else {
            e.target.value = '';
        }
    }
});

function removeImage() {
    document.getElementById('input-img').value = '';
    document.getElementById('avatar-image').src = '../../assets/images/icon-upload.svg';
    document.getElementById('conteiner-btns-remove-change').style.display = 'none';
    document.getElementById('txt-upload').style.display = 'flex'
}


function validate(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("form-container"));


    name = formData.get("name").trim();
    email = formData.get("email").trim();
    username = formData.get("username").trim();



    let nameIsValid = /^[a-zA-Z\u00C0-\u017F\s-]+$/.test(name);
    let emailIsValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    let usernameIsValid = /^@[^\s@]{2,}$/.test(username);

    let isFormValid = nameIsValid && emailIsValid && usernameIsValid;
    if (isFormValid) {
        generateTicket();
        return;
    }
    if (!nameIsValid) {
        document.getElementById("conteiner-name").style.display = 'flex'
    }
    if (!emailIsValid) {
        document.getElementById("conteiner-email").style.display = 'flex'
    }
    if (!username) {
        document.getElementById("conteiner-username").style.display = 'flex';
    }

}

function generateTicket() {
    if (avatar) {
        document.getElementById('avatar-ticket').src = URL.createObjectURL(avatar);
    }
    document.getElementById("name-ticket").innerHTML = name;
    document.getElementById("username-ticket").innerHTML = username;
    document.getElementById("form-container").style.display = 'none';
    document.getElementById("container-ticket").style.display = 'block';
    document.getElementById("txt-main").innerHTML = `Congrats,${name}! Your ticket is ready`;
    document.getElementById("txt-sub-main").innerHTML = `We've emailed your ticket to ${email} and will send updates in the run up to the event`;
    document.getElementById('number-ticket').innerHTML = '#00' + Math.floor(Math.random() * 1999)
}
