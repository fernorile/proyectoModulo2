let users = JSON.parse(localStorage.getItem("users")) || [];
localStorage.setItem("users", JSON.stringify(users));
users = localStorage.getItem("users");
users = JSON.parse(users);

class User {
    constructor(fullName, email, password, canAccess = true) 
    {
        this.id = new Date().getTime();
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.canAccess = canAccess;
        this.role = "CLIENT_ROLE";
    }
}

const registerUser = (evt) => {
    evt.preventDefault();
    let localUsers = JSON.parse(localStorage.getItem("users"));
    const formJs = document.querySelector("#formJs");
    const {fullName, email, password} = formJs.elements;
    const user = new User(fullName.value, email.value, password.value);

    if(localUsers.some(localUser => localUser.email === user.email)) return alert("El usuario ya existe")
    localUsers.push(user);
    localStorage.setItem("users", JSON.stringify(localUsers));
}