//---------------------------BURGER MENU---------------------//

//Const er som var, bare uden at kunne ændre på parametrene. (block scope)
// () => er shortcode og kalder funktionen [function()]
const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener('click', () => {
        // Toggle
        nav.classList.toggle('nav-active');
        // animation af navlinks
        navLinks.forEach(setStyleLink);
        // burger animationen
        burger.classList.toggle('toggle');
    });
}

function setStyleLink(el, index) {
    if (el.style.animation) {
        el.style.animation = "";
    } else {
        el.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
    }
}

//Kalder funktionen navSlide (Function invocation)
navSlide();


// Her defineres filter og personer ved let-variablen, og der anmodes om at få loadet json
let filter = "alle";
let personer;
document.addEventListener("DOMContentLoaded", loadJSON)

//Her bliver functionen loadJSON defineret, det gøres den ved at indhente data fra et spreadsheet - bliver derudover sent videre til funktionen visOpskrifter
async function loadJSON() {
    const JSONData = await
    fetch("https://spreadsheets.google.com/feeds/list/1ZRMaFLVTV6xPcnaDhh13gnGv5W6iWgllziLCfYcsZGA/od6/public/values?alt=json");
    personer = await JSONData.json();
    visOpskrifter();
    addEventlistenersToButtons();
}


//visOpskrifter indsætter hver opskrift i html - derudover bliver det defineret at der skal vises navn og billede
function visOpskrifter() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector(".content");
    listPointer.innerHTML = "";
    personer.feed.entry.forEach(person => {
        if (filter == "alle" || filter == person.gsx$kategori.$t) {
            console.log(person);
            const minKlon = templatePointer.cloneNode(true).content;
            minKlon.querySelector("h2").textContent = person.gsx$navn.$t;
            minKlon.querySelector("img").src = "imgs/small/" + person.gsx$billede.$t + ".png";
            //            minKlon.querySelector("article").addEventListener("click", () => visDeltaljer(person));
            minKlon.querySelector("article").addEventListener("click", function () {
                visDetaljer(person)
            });

            listPointer.appendChild(minKlon);
        }
    })
}


//Her sørges der for at ved klik på en opskrift, så loades et nyt vindue
function visDetaljer(opskrift) {
    location.href = `single_view.html?id=${opskrift.gsx$id.$t}`;
    console.log("opskrift", opskrift.gsx$navn.$t);

}

//Her ligges der en eventlistner på filtreringsknapperne
function addEventlistenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);

    });
}

//Her defineres funktionen der filterere indholdet i den valgte kategori
function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h3").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visOpskrifter();
}
