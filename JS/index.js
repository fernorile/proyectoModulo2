let games = JSON.parse(localStorage.getItem("games"))


// const indexSearcher = document.getElementById("indexSearcher")
// const searcherResults = document.getElementById("searcherResults")

// function searchIndex () {
//     searcherResults.innerHTML = `<h3>RESULTADOS: </h3>`
//     let resultsArray = games.map (function(result){
//         return result
//     })

//     let search = resultsArray.filter(function(result){
//         let busqueda = searcherResults.value
//         if(result.includes(busqueda)){
//             return result
//         }
//     })
//     search.map(function(result){
//         searcherResults.innerHTML += `<ul><li>${result.name}</li></ul>`
//     })
// }


function renderMain() {
    let cardMainIMGContainer = document.getElementById("cardMainIMG")
    let cardMainTitle = document.getElementById("mainCardTitle")
    let mainCardDescription = document.getElementById("mainCardDescription")
    let mainCardCategorie = document.getElementById("mainCardCategorie")
    let mainGame = games.find(game => game.star);

    if(!mainGame){
        cardMainIMGContainer.setAttribute("src", "https://preview.free3d.com/img/2017/02/2162604908178572794/ln8m42qx-900.jpg")
        cardMainTitle.innerHTML = "Receta destacado"
        mainCardDescription.innerHTML = "Receta destacado desde la seccion de administracion"
        mainCardCategorie.innerHTML = "Categoria"
        return
    } 

    if (mainGame) {
        cardMainIMGContainer.setAttribute("src", mainGame.IMG)
        console.log(cardMainIMGContainer)
        cardMainTitle.innerHTML = mainGame.name
        mainCardDescription.innerHTML = mainGame.description
        mainCardCategorie.innerHTML = mainGame.categorie
    } else {
        cardMainIMGContainer.setAttribute("src", "https://preview.free3d.com/img/2017/02/2162604908178572794/ln8m42qx-900.jpg")
        cardMainTitle.innerHTML = "Receta destacado"
        mainCardDescription.innerHTML = "Receta destacado desde la seccion de administracion"
        mainCardCategorie.innerHTML = "Categoria"
    }
}

renderMain()

function renderSecondary() {
    let secondaryCard1 = document.getElementById("secondaryCard1")
    let secondaryCard2 = document.getElementById("secondaryCard2")
    let secondaryCard3 = document.getElementById("secondaryCard3")

    let secondaryCards = games.filter(game => game.recomended);

    let secondaryGamesContainer = document.getElementById("secondaryGamesContainerID")

    if(secondaryCards.length < 3 || !secondaryCards[0].publicated || !secondaryCards[1].publicated || !secondaryCards[2].publicated) {
        secondaryGamesContainer.classList.add("visually-hidden")
        return
    }

    if (secondaryCards.length >= 3) {
        secondaryCard1.setAttribute("src", secondaryCards[0].IMG)
        secondaryCard2.setAttribute("src", secondaryCards[1].IMG)
        secondaryCard3.setAttribute("src", secondaryCards[2].IMG)
    } else {
        secondaryCard1.setAttribute("src", "https://preview.free3d.com/img/2017/02/2162604908178572794/ln8m42qx-900.jpg")
        secondaryCard2.setAttribute("src", "https://preview.free3d.com/img/2017/02/2162604908178572794/ln8m42qx-900.jpg")
        secondaryCard3.setAttribute("src", "https://preview.free3d.com/img/2017/02/2162604908178572794/ln8m42qx-900.jpg")
    }
}

renderSecondary()


function renderCategorie1() {
    let categorie1Container = document.getElementById("categorie1Container")
    let categorie1HTML = ""

    let ChocolateCategorie = games.filter(game => game.categorie === "Chocolate")
    
    ChocolateCategorie.map(choco => {
        if(!choco.publicated) return
        categorie1HTML += `<div class="d-flex flex-column">
        <a href="#" class="gameLink me-3">
            <div class="card bg-transparent mb-4 categoriesGameCard border-0"
                style="max-width: 500px;">
                <div class="row g-0 mb-0">
                    <div>
                        <img src="${choco.IMG}"
                            class="img-fluid rounded-start secondaryGamesIMGG" alt="...">
                    </div>
                </div>
            </div>
        </a>
    </div>`
    })
    
    categorie1Container.innerHTML = categorie1HTML
}

renderCategorie1()


function renderCategorie2() {
    let categorie2Container = document.getElementById("categorie2Container")
    let categorie2HTML = ""

    let heladasCategorie = games.filter(game => game.categorie === "Helada")
    console.log(heladasCategorie)
    heladasCategorie.map(hel => {
        if(!hel.publicated) return
        categorie2HTML += `<div class="d-flex flex-column">
        <a href="#" class="gameLink me-3">
            <div class="card bg-transparent mb-4 categoriesGameCard border-0"
                style="max-width: 500px;">
                <div class="row g-0 mb-0">
                    <div>
                        <img src="${hel.IMG}"
                            class="img-fluid rounded-start secondaryGamesIMGG" alt="...">
                    </div>
                </div>
            </div>
        </a>
    </div>`
    })

    categorie2Container.innerHTML = categorie2HTML
}

renderCategorie2()


function renderCategorie3() {
    let categorie3Container = document.getElementById("categorie3Container")
    let categorie3HTML = ""

    let frutalesCategorie = games.filter(game => game.categorie === "Frutal")
    console.log(frutalesCategorie)
    frutalesCategorie.map(frut => {
        if(!frut.publicated) return
        categorie3HTML += `<div class="d-flex flex-column">
        <a href="#" class="gameLink me-3">
            <div class="card bg-transparent mb-4 categoriesGameCard border-0"
                style="max-width: 500px;">
                <div class="row g-0 mb-0">
                    <div>
                        <img src="${frut.IMG}"
                            class="img-fluid rounded-start secondaryGamesIMGG" alt="...">
                    </div>
                </div>
            </div>
        </a>
    </div>`
    })

    categorie3Container.innerHTML = categorie3HTML
}

renderCategorie3()