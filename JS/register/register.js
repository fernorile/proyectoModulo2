class User {
    constructor(nombreCompleto, correo, edad, contraseña, precio, canAccess = true) {
        this.id = new Date().getTime();
        this.fullName = nombreCompleto;
        this.email = correo;
        this.age = edad;
        this.password = contraseña;
        this.canAccess = canAccess;
        this.role = 'CLIENT_ROLE';
        this._usdPrice = precio;
    }
    // sayHello() {
    //     return `Bienvenido nuevamente ${this.fullName}`;
    // }
    // get finalPrice() {
    //     return (this._usdPrice * 205) * 1.21 ;
    // }
    // set updatePrice(price) {
    //     this._usdPrice = price * 1.07;
    }


const registerUser = (evt) => {
    evt.preventDefault();
    const registerUser = document.querySelector(`#registerUser`);
    console.log(registerUser.elements);
    const {formUser, formPassword, formEmail} = registerUser.elements;
    const user = new User (fullName.value, email.value, parseInt(age.value), password.value)
    console.log(`nuevo usuario`, user)

    if(localUsers.some(localUser => localUser.email === user.email)) return alert('El usuario ya existe')
    localUsers.push(user);
    localStorage.setItem('users', JSON.stringify(localUsers))
    registerForm.reset();
    registerForm.elements[0].focus()

}


