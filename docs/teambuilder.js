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
                        console.log("clicked champion is: " + data.data[champName].id)

                        let display = document.querySelector(".generate")
                        display.innerHTML = "";
                        let html = `
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
                       
                        <a href="#down"><button id="button">Generate Team</button></a>
                        </div>
                        </article>
               
                        `;
                        display.insertAdjacentHTML("beforeend", html);

                        let button = document.getElementById("button");
                        button.addEventListener("click", function () {

                            teambuilderApp.teamBuilderCal(champName, data.data[champName].tags);
                        })

                    })
            })

        }


    },
    async teamBuilderCal(champName, tags) {

        //Fetching api data
        let champions = await this.getChampions();

        //When creating a team you alwways have to make sure not more than 1 champion has the same laning position. (you don't wanna end up with 2 mid laners) 
        const usedTags = [];

        //5 chosen Champions will be pushed in this array which will make a suggested team (This can/will be used later)
        const CreatedTeam = [];

        //To access some of the API Data, you have to specify it with the champions name which is not efficient when using Math.number. That is why we are making a new array to make it more easy
        const AllChamps = [];
        for (let champTag in champions.data) {
            AllChamps.push(champTag);
        }

        //Adds the champtag (position) to the array
        usedTags.push(tags[0]);

        //Adds the championName to the array (to you team) 
        CreatedTeam.push(champName);

        //Loops over every champions; Takes one of them randomly; Controls if position is not used more than one time in the usedTags array
        for (let i = 0; i < 157; i++) {

            let randomNumber = Math.floor(Math.random() * 157);
            let randomChamp = AllChamps[randomNumber]

            let tags = champions.data[randomChamp].tags[0];

            if (!usedTags.includes(tags) && tags != "Assassin") {
                usedTags.push(tags);
                CreatedTeam.push(randomChamp);
            }
        }


        console.log(CreatedTeam);
        let team = document.querySelector(".team")
        team.innerHTML = "";
        let html = `<div class="teams" id="down" >
        <p class=""team>Team</p> 
        <div class="flex">
    
        <div class ="teammember">
        <p>${CreatedTeam[0]}</p>
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${CreatedTeam[0]}_0.jpg">
        
        </div>
        <div class ="teammember">
        <p>${CreatedTeam[1]}</p>
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${CreatedTeam[1]}_0.jpg">
        </div>
        <div class ="teammember">
        <p>${CreatedTeam[2]}</p>
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${CreatedTeam[2]}_0.jpg">
        </div>  <div class ="teammember">
        <p>${CreatedTeam[3]}</p>
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${CreatedTeam[3]}_0.jpg">
        </div>  <div class ="teammember">
        <p>${CreatedTeam[4]}</p>
        <img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${CreatedTeam[4]}_0.jpg">
        </div>
        </div>
        </div>`
        team.insertAdjacentHTML("beforeend", html);


    }

}




teambuilderApp.initFields();