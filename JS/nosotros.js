
const localUsers = JSON.parse(localStorage.getItem("users"));

window.addEventListener("load", function () {
  const { userLogged } = findUserLogged();
  if (userLogged) {
   const userNameAnchor = document.querySelector("#username");
    userNameAnchor.innerHTML = userLogged[0].fullName;
  }
});

const findUserLogged = () => {
  const userLogged = localUsers.filter((user) => user.isLogged);
  return {
    userLogged,
  };
};

