// Hago referencia al formulario de creacion del itml 
const gameForm = document.getElementById("gameForm")

// me traigo el aray de juegos del localStorage 
let games = JSON.parse(localStorage.getItem("games")) || []

// hago referencia al modal de juegos para poder darle funciones en js
const modalJuegos = new bootstrap.Modal(document.getElementById("modalJuegos"));

// inicializo la variable existGame, la cual me servirá mas adelante para definir que funcion ejecutar dentro de la funcion saveGame()
let existGame = false

// creo la clase para añadir los juegos 
class Game {
    constructor(codigo, nombre, categoria, descripcion, ingredientes, pasos, publicado, imagen, video, recomendado) {
        this.code = codigo
        this.name = nombre
        this.categorie = categoria
        this.description = descripcion
        this.ingredients = ingredientes
        this.steps = pasos
        this.publicated = publicado
        this.IMG = imagen
        this.video = video
        this.recomended = recomendado
        this.star = false
    }
}

// creo una variable en la cual hago referencia al boton para abrir el modal de juegos
let btnModalOpen = document.getElementById("btnModalOpen")
// a ese boton le agrego un evento onclick, el cual me va a limpiar el formulario y me va a establecer el titulo y otras cosas del modal
btnModalOpen.addEventListener("click", () => {
    clearForm()
    // cambio el titulo del modal por agregar juego
    document.getElementById("modalJuegosLabel").innerHTML = "Agregar juego"
    // inserto el asterisco que asigna al input de codigo como requerido
    document.getElementById("labelCode").innerHTML = `Codigo <span class="text-danger">*</span>`;
    //quito el bloqueo el input del codigo para que pueda ser agregado
    document.getElementById('gameCode').removeAttribute("disabled");
    // modifico el boton para guardar/modificar juego
    document.getElementById("modalSaveBtn").classList.remove("btn-dark")
    document.getElementById("modalSaveBtn").classList.add("btn-success")
    document.getElementById("modalSaveBtn").innerHTML = "Agregar"
})


// FUNCION CREADORA DE JUEGOS

// creo los juegos 
const createGame = (evt) => {


    // me traigo los juegos del LS
    let localGames = JSON.parse(localStorage.getItem('games')) || []

    // Hago referencia al formulario del html
    const gameForm = document.getElementById("gameForm")

    // creo una variable con los valores de los input
    const {
        gameCode,
        gameName,
        gameCategorie,
        gameDescription,
        gameIngredents,
        gameSteps,
        gamePublicated,
        gameIMG,
        gameVideo,
        gameRecomended
    } = gameForm.elements;

    // creo el nuevo juego usando la clase GAME definida anteriormente, asi todos los juegos creados tendrán la misma estructura 
    const game = new Game(gameCode.value, gameName.value, gameCategorie.value, gameDescription.value, gameIngredents.value, gameSteps.value, gamePublicated.checked, gameIMG.value, gameVideo.value, gameRecomended.checked);


    // si el codigo del juego coincide con uno ya creado, disparo un error y dejo de leer el codigo
    if (localGames.some(localGame => localGame.code === gameCode.value)) {
        Swal.fire({
            title: "Error",
            text: "Ya existe un producto con ese código",
            icon: "error",
            timer: 4000,
            timerProgressBar: true,
            allowEscapeKey: true,
        })
        return
    }

    // si todo salio bien, agrego el juego al array de juegos
    localGames.push(game)

    // envio el array de juegos con los nuevos cambios al local storage
    localStorage.setItem("games", JSON.stringify(localGames))

    // lanzo una alerta que indica que el juego se creo correctamente
    Swal.fire({
        title: "Producto agregado",
        text: "El producto se ha agregado correctamente",
        icon: "success",
        timer: 4000,
        timerProgressBar: true,
        allowEscapeKey: true,
    })

    // llamo a una funcion para que me limpie el formulario
    clearForm()

    modalJuegos.hide()

    // llamo a la funcion para que pinte los juegos en la tabla
    RenderGameList()

    pintarJuegosDestacados()

}


// FUNCION PARA LIMPIAR FORMULARIO 


function clearForm() {
    document.getElementById("gameForm").reset()
}

// console.log(games)

// funcion para pintar los juegos en la tabla
function RenderGameList() {

    // traigo el array del local storage
    let games = JSON.parse(localStorage.getItem('games')) || []
    // hago referencia al body de la tabla
    let tableBody = document.getElementById("tableBody")
    // creo la variable donde irán los juegos, si no hay nada esta ira vacia
    let tableHTMLcode = ""


    // recorro el array de juegos, por cada juego iterado agregaré todo este codigo htmnl a la variable tableHTMLcode iniciada anteriormente (que es el juego iterado con todas sus propiedades)
    games.map(game => {
        tableHTMLcode += `<tr>
        <th scope="row" class="border-end border-bottom-0 text-center">${game.code}</th>
        <td scope="row" class="border-end border-bottom-0 text-center">${game.name}</td>
        <td scope="row" class="border-end border-bottom-0 text-center">${game.categorie}</td>
        <td scope="row" class="border-end border-bottom-0 text-center">${game.description}</td>
        <td scope="row" class="border-end border-bottom-0 text-center">INGREDIENTES: ${game.ingredients}</td>
        <td scope="row" class="border-end border-bottom-0 text-center">PASOS: ${game.steps}</td>
        <td scope="row" class="border-end border-bottom-0 text-center">${game.publicated}</td>
        <td scope="row" class="border-end border-bottom-0 text-center">${game.recomended}</td>
        <td scope="row" class="border-end border-bottom-0">
        <div class="tableIMGContainer d-flex justify-content-center">
            <img src ="${game.IMG}">
        </div>
        </td>
        <td class="border-bottom-0 text-center">

        <button class="btn btn-outline-dark adminBTN" onclick="editGame(this)" id="${game.code}">
                <i class="fas fa-edit"></i>
            </button>

            <button class="btn btn-outline-danger adminBTN" onclick="deleteGame(this)" id="${game.code}">
                <i class="fas fa-trash-alt"></i>
            </button>

            <button onclick="destacar(this)" id="${game.code}" class="border-0 bg-transparent px-0">
                <i class="far fa-star fa-2x text-warning btn px-0 pb-3" id="star${game.code}"></i>
            </button>

        </tr>`
    })

    // agrego a la tabla el codigo html del tableHTMLcode y lo inserto en el html
    tableBody.innerHTML = tableHTMLcode
}


// FUNCION BARA BORRAR JUEGOS


function deleteGame(game) {
    // game.id es el code del juego
    // console.log(game.id)

    // llamo a la alerta
    Swal.fire({
        title: '¿Borrar producto?',
        text: "El cambio será permanente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // si en la alerta le doy a borrar, entonces se ejecuta este codigo
        if (result.isConfirmed) {
            // traigo los datos del localStorage
            let juegos = JSON.parse(localStorage.getItem("games")) || []

            // filtro el array traido del LS, el nuevo array que voy a retornar va a tener todos los juegos cuyo codigo NO sea igual al id del boton borrar(traido del html). Así mi nuevo array tendrá todos los juegos menos el que fue presionado para borrar, ya que su codigo coincide con el id del boton. O sea, que cuando se itero ese juego, el metodo filter devolvió un false (no se cumplio la condicion, la cual era que el codio del juego NO SEA IGUAL al id del boton), por lo tanto ese juego no entrará en el nuevo array
            let filteredGames = juegos.filter(juego => juego.code != game.id)

            // subo el array filtrado al localStorage con el nombre de games asi es sobrescrito y se guarden los cambios
            localStorage.setItem("games", JSON.stringify(filteredGames))

            // llamo a la alerta para avisar que el juego se borró correctamente
            Swal.fire(
                '¡Borrado!',
                'El producto fue borrado',
                'success'
            )
        }
        // llamo a la funcion para que se pinten los juegos en la tabla
        RenderGameList()

        pintarJuegosDestacados()
    })

}


// FUNCION PARA MODIFICAR JUEGOS PT 1


function editGame(editBtn) {
    // limpio los datos del formulario
    clearForm()

    // llamo al array del local storage
    let games = JSON.parse(localStorage.getItem("games")) || []

    // busco el juego a modificar a traves del metodo find, la condicion es que el codigo del juego sea igual al id del boton (que viene del html). O sea, que el id del boton del juego que presione sea igual al del juego iterado. Si se cumple la condicion, ese juego se guarda en la variable searchedGame
    let searchedGame = games.find(game => game.code === editBtn.id)

    // console.log(searchedGame)

    // hago referencia a los input del formulario de creacion de juego
    const {
        gameCode,
        gameName,
        gameCategorie,
        gameDescription,
        gameIngredents,
        gameSteps,
        gamePublicated,
        gameIMG,
        gameVideo,
        gameRecomended
    } = gameForm.elements;

    // asigno los datos del juego buscado (a traves del metodo find) a los input del formulario de creacion de juegos
    gameCode.value = searchedGame.code
    gameName.value = searchedGame.name
    gameCategorie.value = searchedGame.categorie
    gameDescription.value = searchedGame.description
    gameIngredents.value = searchedGame.ingredients
    gameSteps.value = searchedGame.steps
    gamePublicated.checked = searchedGame.publicated
    gameIMG.value = searchedGame.IMG
    gameVideo.value = searchedGame.video
    gameRecomended.checked = searchedGame.recomended

    existGame = true

    // cambio el titulo del modal por modificar juego
    document.getElementById("modalJuegosLabel").innerHTML = "Modificar juego"
    // saco el asterisco que asignaba al inputr de codigo como requerido
    document.getElementById("labelCode").innerHTML = "Codigo";
    // bloqueo el input del codigo para que no se pueda modificarlo
    document.getElementById('gameCode').setAttribute("disabled", "");
    // modifico el boton para guardar/modificar juego
    document.getElementById("modalSaveBtn").classList.remove("btn-success")
    document.getElementById("modalSaveBtn").classList.add("btn-dark")
    document.getElementById("modalSaveBtn").innerHTML = "Modificar"
    
    // muestro el modal de creacion/modificacion de juego
    modalJuegos.show()
}

// creo una funcion (esta funcion se ejecutará cuando le de al boton guardar en el formulario de juegos) la cual me va a definir internamente que funcion se va a realizar, la de modificar datos del juego o la de crear juego nuevo. La variable existGame será la que me maneje eso, inicializo la variable al principio del codigo con un valor del false, en la funcion de editGame le asigno un valor true, asi cuando se ejecute esta funcion, el existgame tendra valor de verdadero, por lo cual se ejecutara la funcion de changeGameData. En cambio, si la funcion sigue siendo falsa (no presiono el btn de editar juego) entonces la funcion que se ejecutará será la de crear juego
function saveGame(event) {
    event.preventDefault()

    if (existGame === true) {
        changeGameData()
    } else {
        createGame()
    }
}

//FUNCION PARA MODIFICAR JUEGOS PT 2


function changeGameData() {
    // llamo al array del juegos del local storage
    let games = JSON.parse(localStorage.getItem("games")) || []
    
    // creo variables a las cuales les voy a agregar el valor de los inputs del formulario
    let gameCode = document.getElementById("gameCode").value
    let gameName = document.getElementById("gameName").value
    let gameCategorie = document.getElementById("gameCategorie").value
    let gameDescription = document.getElementById("gameDescription").value
    let gameIngredents = document.getElementById("gameIngredents").value
    let gameSteps = document.getElementById("gameSteps").value
    let gamePublicated = document.getElementById("gamePublicated").checked
    let gameIMG = document.getElementById("gameIMG").value
    let gameVideo = document.getElementById("gameVideo").value
    let gameRecomended = document.getElementById("gameRecomended").checked
    
    // itero el array de juegos, si el codigo del juego iterado coincide con el valor del codigo de input (gameCode), entonces igualo cada propiedad del juego a los valores que se encuentran en los inputs del formulario, pudiendo así modificar los valores del juego
    games.map(game => {
        if(game.code === gameCode){
            game.name = gameName
            game.categorie = gameCategorie
            game.description = gameDescription
            game.ingredients = gameIngredents
            game.steps = gameSteps
            game.publicated = gamePublicated
            game.IMG = gameIMG
            game.video = gameVideo
            game.recomended = gameRecomended
        }
    })
    
    // envio los cambios al local storage
    localStorage.setItem("games", JSON.stringify(games))
    
    // limpio el formulario
    clearForm()
    
    // cierro el modal del formulario
    modalJuegos.hide()
    
    // lanzo una alerta avisando que el juego fue modificado
    Swal.fire(
        'Producto modificado!',
        'Los datos del producto han sido modificados',
        'success'
        );
        
        // pinto el array de juegos en la tabla
        RenderGameList()

        existGame = false

        pintarJuegosDestacados()

    }



    // FUNCION PARA DESTACAR JUEGO
    function destacar(star) {
        // Llamo al array del ls
        let games = JSON.parse(localStorage.getItem("games")) || []

        // agrego el juego seleccionado a una variable
        let juegoSeleccionado = games.find(game => game.code === star.id)
        // tomo a la estrella seleccionada y la guardo en una variable
        const estrella = document.getElementById(`star${juegoSeleccionado.code}`)

        // si el juego seleccionado tiene la propiedad star, entonces transformo a esta misma en false y despinto la estrella
        if (juegoSeleccionado.star){
            juegoSeleccionado.star = false
            estrella.classList.remove(`fas`)
            estrella.classList.add(`far`)
            // subo los cambios al ls
            localStorage.setItem("games", JSON.stringify(games))

            // mando una alerta que indica que el juego ya no esta destacado
            Swal.fire({
                title: "El producto ya no está destacado",
                icon: "success",
            })
            return
        }

        // si ya tengo un juego con la propiedad destacado (star) entonces tiro un error y dejo de ejecutar el codigo
        if (games.some(game => game.star)){
            Swal.fire({
                title: "Error",
                text: "Solo puedes destacar un producto a la vez",
                icon: "error",
            })
            return
        }
        
        // recorro el array
        games.map(game => {
            // si el juego iterado coincide con el id del boton apretado, entonces se le agregará a ese juego la propiedad star, la cual significa destacado
            if(game.code === star.id){
                juegoSeleccionado.star = true
                // si eñ juego iterado tiene esa propiedad, entonces la estrella se pintará
            } if (game.star) {
                const estrella = document.getElementById(`star${game.code}`)
                estrella.classList.remove("far")
                estrella.classList.add("fas")
            }
        })
        
        // alerta que avisa q el juego fue destacado
        Swal.fire({
            title: 'Producto destacado!',
            icon: 'success',
        })

        console.log(games)
        // envio todo al local storage
        localStorage.setItem("games", JSON.stringify(games))
    }



    // llamo a la funcion para que se pinten los juegos en la tabla
    RenderGameList()
    
    // FUNCION PARA PINTAR LAS ESTRELLAS DE LOS JUEGOS (se usa esta funcion para q se pinte la estrella seleccionada y no solo la primera como sucedia antes de crear la funcion)
    function pintarJuegosDestacados(){
        // llamo al array del ls
        let games = JSON.parse(localStorage.getItem("games")) || []
        // itero el array, si el juego iterado es el destacado ( el q tiene la propiedad star, entonces pinto la estrella)
        games.map(game => {
            if (game.star) {
                const estrella = document.getElementById(`star${game.code}`)
                estrella.classList.remove("far")
                estrella.classList.add("fas")
            }
        })
    }


    // EJECUTO LA FUNCION
    pintarJuegosDestacados()