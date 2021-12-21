// import Team from "./team";



const teambuilderApp = {
    initFields() {
        this.getChampions();
        this.Champions();
        this.FilterButton();


    },
    async getChampions() {
        let response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json');
        return await response.json();
    },

    async Champions() {
        //GET ALL CHAMPIONS IN THE SECTION (list)
        let championSection = document.querySelector(".champions");
        let champions = await this.getChampions();
        for (let champ in champions.data) {
            championSection.insertAdjacentHTML("beforeend", `<div class="champ"><img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg" alt"champ image><p>${champ}</p></div>`);
        }
        teambuilderApp.teamBuilderChampionClick();



    },

    async FilterButton() {
        //CLICKEVENT ON FILTERBUTTON 
        const filters = document.querySelectorAll('.cat');
        let championSection = document.querySelector(".champions");
        let champions = await this.getChampions();
        filters.forEach(filterButton => {
            filterButton.addEventListener("click", function () {
                filters.forEach(nav => nav.classList.remove("catActive"))
                this.classList.add("catActive");
                let clickedCat = filterButton.id;
                championSection.innerHTML = "";
                for (let champ in champions.data) {
                    for (let i = 0; i < champions.data[champ].tags.length; i++) {
                        if (clickedCat == champions.data[champ].tags[i]) {
                            championSection.insertAdjacentHTML("beforeend", `<div class="champ"><img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg" alt"champ image><p>${champ}</p></div>`);
                        }
                    }
                }
                teambuilderApp.teamBuilderChampionClick();




            })

        })

    },

    async teamBuilderChampionClick() {
        let bioChamp = document.querySelectorAll(".champ");
        for (let champ of bioChamp) {
            champ.addEventListener("click", function () {
                let champName = champ.querySelector("p").innerHTML;
                fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion/${champName}.json`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.data[champName].id)
                        console.log(data);
                        let display = document.querySelector(".generate")
                        display.innerHTML = "";
                        let html = `<div class="display">
                        <img class="generatePic" src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.data[champName].id}_0.jpg" alt="generatePic">
                        
                        <article class="charh">
                        <p class="title">${data.data[champName].id}</p>
                        <h2 class="bioTitle">${data.data[champName].title}</h2>
                       
                        <div class="stats">
                        <p>${data.data[champName].tags}</p>
                        <p>Base stats</p>
                        <p>hp: ${data.data[champName].stats.hp}</p>
                        <p>attack damage: ${data.data[champName].stats.attackdamage}</p>
                        <p>magic damage: ${data.data[champName].stats.mp}</p>
                        <p>movement speed: ${data.data[champName].stats.movespeed}</p>
                        </div>
                        <button id="button">Genearate Team</button>
                        </article>
               
                        </div>`;
                        display.insertAdjacentHTML("beforeend", html);

                        let button = document.getElementById("button");
                        button.addEventListener("click", function () {

                            teambuilderApp.teamBuilderCal();
                        })

                    })
            })

        }


    },
    async teamBuilderCal() {
        fetch('team.json')
            .then(response => {
                return response.json();
            })
            .then(obj => {
                let ADdamage = obj.team.AD;
                let APdamage = obj.team.AP;
                let members = obj.team.teammembers;
                console.log(ADdamage, APdamage, members);
                fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json')
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        for (let champ in data) {
                            console.log(champ)
                            let roleChamp = champ.querySelector("p").innerHTML;
                            fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion/${roleChamp}.json`)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data.data[roleChamp].tags)
                                    console.log(data);
                                })
                        }
                    })




            })

    }

}




teambuilderApp.initFields();