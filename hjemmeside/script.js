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









        let filter = "alle";
        let personer;
        document.addEventListener("DOMContentLoaded", loadJSON)

        async function loadJSON() {
            const JSONData = await
            fetch("https://spreadsheets.google.com/feeds/list/1ZRMaFLVTV6xPcnaDhh13gnGv5W6iWgllziLCfYcsZGA/od6/public/values?alt=json");
            personer = await JSONData.json();
            visPersoner();
            addEventlistenersToButtons();
        }




function visPersoner() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector(".content");
    listPointer.innerHTML = "";
    personer.feed.entry.forEach(person => {
        if (filter == "alle" || filter == person.gsx$kategori.$t) {
            console.log(person);
            const minKlon = templatePointer.cloneNode(true).content;
            minKlon.querySelector("h2").textContent = person.gsx$navn.$t;
            minKlon.querySelector("img").src = "imgs/" + person.gsx$billede.$t + ".jpg";
            minKlon.querySelector("article").addEventListener("click", () => visDeltaljer(person));
            listPointer.appendChild(minKlon);
        }
    })
}



function visDeltaljer(person) {
    popop.style.display = "block";
    popop.querySelector("h2").textContent = person.gsx$navn.$t;
    //    popop.querySelector("h2").textContent = person.gsx$efternavn.$t;
    popop.querySelector(".lang").textContent = person.gsx$lang.$t;
    popop.querySelector(".pris").textContent = person.gsx$pris.$t;
    //    popop.querySelector("img").src = person.gsx$billede.$t;
    popop.querySelector("img").src = "imgs" + navn.gsx$billede.$t + ".jpg";
//    popop.querySelector("h2").textContent = person.gsx$efternavn.$t;
//    popop.querySelector(".lang").textContent = person.gsx$lang.$t;
//    popop.querySelector(".pris").textContent = person.gsx$pris.$t;
//    popop.querySelector("img").src = person.gsx$billede.$t;
   popop.querySelector("img").src = "imgs" + navn.gsx$billede.$t + ".jpg";


}



     document.querySelector("#luk").addEventListener("click", ()=>popop.style.display="none");

        function addEventlistenersToButtons() {
            document.querySelectorAll(".filter").forEach((btn) => {
                btn.addEventListener("click", filterBTNs);

            });
        }

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h3").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visPersoner();
}
