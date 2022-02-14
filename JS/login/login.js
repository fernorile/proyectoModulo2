const localUsers = JSON.parse(localStorage.getItem("users"));
const loginContainer = document.querySelector("#loginContainer");
const formLogin = document.querySelector("#formLogin").elements;
const userNameAnchor = document.querySelector("#username");
const loginWelcome = document.querySelector('#welcome-user');

window.addEventListener("load", function () {
  const { userLogged } = findUserLogged();

  if (userLogged.length > 0) {
    loginContainer.className += " d-none";
    loginWelcome.innerHTML = 'Welcome ' + userLogged[0].fullName;
    userNameAnchor.innerHTML = userLogged[0].fullName;
  }
});

const loginUser = (event) => {
  event.preventDefault();
  const { email, password } = formLogin;

  const validUser = localUsers.find(
    (user) => user.email === email.value && user.password === password.value
  );
  if (validUser) {
    const newArrUsers = localUsers.map((user) => {
      if (user.id === validUser.id) {
        validUser.isLogged = true;
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(newArrUsers));
    location.reload();
    return;
  }
  alert("Usuario o contraseña incorrectos!");
};

const findUserLogged = () => {
  const userLogged = localUsers.filter((user) => user.isLogged);
  return {
    userLogged,
  };
};
