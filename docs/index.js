"use strict";
const championApp = {
    initFields() {
        this.extraData();
        this.Champions();
        this.FilterButton();

    },
    async getChampions() {
        let response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json');
        return await response.json();
    },

    ///////////////////////////CHAMPIONS.HTML 
    async Champions() {

        //GET ALL CHAMPIONS IN THE SECTION (list)
        let championSection = document.querySelector(".champions");
        let champions = await this.getChampions();
        for (let champ in champions.data) {
            championSection.insertAdjacentHTML("beforeend", `<div class="champ"><img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg" alt"champ image><p>${champ}</p></div>`);
        }

        championApp.ChampionClick();
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
                championApp.ChampionClick();
            })

        })

    },

    async zoekFunctie() {

    },

    async ChampionClick() {

        //CLICKEVENT OF A CHAMPION IN THE LIST
        let bioChamp = document.querySelectorAll(".champ");
        for (let champ of bioChamp) {
            console
            champ.addEventListener("click", function () {
                let champName = champ.querySelector("p").innerHTML;
                fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion/${champName}.json`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.data[champName].id);
                        document.querySelector(".backgroundImg").style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.data[champName].id}_0.jpg)`;



                        console.log(data);
                        let bio = document.querySelector(".bio");
                        bio.innerHTML = '';
                        let skinsInput = '';
                        let skinsLabel = '';

                        if (data.data[champName].skins.length <= 4) {
                            for (let i = 0; i < data.data[champName].skins.length; i++) {
                                if (i == 0) {
                                    skinsInput += `<input type="radio" name="slider" id="s${i+1}" checked>`
                                } else {
                                    skinsInput += `<input type="radio" name="slider" id="s${i+1}">`
                                }


                            }
                            for (let i = 0; i < data.data[champName].skins.length; i++) {
                                skinsLabel += `<label for="s${i+1}" id="slide${i+1}"><img id="${i}" class="slide"
                            src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.data[champName].id}_${i}.jpg" alt=""></label>`

                            }
                        } else {
                            for (let i = 0; i < 5; i++) {
                                if (i == 0) {
                                    skinsInput += `<input type="radio" name="slider" id="s${i+1}" checked>`
                                } else {
                                    skinsInput += `<input type="radio" name="slider" id="s${i+1}">`
                                }
                            }
                            for (let i = 0; i < 5; i++) {
                                skinsLabel += `<label for="s${i+1}" id="slide${i+1}"><img id="${i}" class="slide"
                            src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.data[champName].id}_${i}.jpg" alt=""></label>`

                            }
                        }


                        let html = `<div>
                        <img class="bioPic" src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.data[champName].id}_0.jpg" alt="bioPic">
                        <p>${data.data[champName].id}</p>
                        <section id="slider">
                        ${skinsInput}
                        ${skinsLabel}

                        </section>
                            
                            </div>
                        <article>
                        <h1 class="bioName">${data.data[champName].id}</h1>
                        <h2 class="bioTitle">${data.data[champName].title}</h2>
                        <p class="description">${data.data[champName].blurb}</p>
                        <h2>Base stats</h2>
                        <p>hp: ${data.data[champName].stats.hp}</p>
                        <p>attack damage: ${data.data[champName].stats.attackdamage}</p>
                        <p>magic damage: ${data.data[champName].stats.mp}</p>
                        <p>movement speed: ${data.data[champName].stats.movespeed}</p>
                        <div class="abilities">
                            <img id="0" class="ability abilityActive" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${data.data[champName].spells[0].id}.png" alt="ability">
                            <img id="1"class="ability" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${data.data[champName].spells[1].id}.png" alt="ability">
                            <img id="2"class="ability" src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${data.data[champName].spells[2].id}.png" alt="ability">
                            <img id="3" class="ability " src="http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${data.data[champName].spells[3].id}.png" alt="ability">
                            <p class="ablityDescription">${data.data[champName].spells[0].description}<p>
                        </div>
                        </article>`;

                        bio.insertAdjacentHTML("beforeend", html); //I LOVE YOU
                        let slides = document.querySelectorAll(".slide");
                        for (let slide of slides) {
                            slide.addEventListener("click", function () {
                                if (data.data[champName].skins[slide.id].name == "default") {
                                    document.querySelector(".bio > div > p").innerHTML = `${data.data[champName].id}`;
                                } else {
                                    document.querySelector(".bio > div > p").innerHTML = `${data.data[champName].skins[slide.id].name}`;
                                }

                                document.querySelector(".bioPic").src = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.data[champName].id}_${slide.id}.jpg`
                            })

                        }

                        let abilities = document.querySelectorAll(".ability");
                        abilities.forEach(abilityButton => {
                            abilityButton.addEventListener("click", function () {
                                abilities.forEach(ability => {
                                    ability.classList.remove("abilityActive")
                                    this.classList.add("abilityActive");
                                    document.querySelector(".ablityDescription").innerHTML = `${data.data[champName].spells[abilityButton.id].description}`
                                });


                            })

                        })

                    });

            })
        }
    },




    //INDEX.HTML

    extraData() {
        let roles = document.querySelectorAll(".role");
        let clickedRole = "";
        roles.forEach(element => {
            element.addEventListener("click", function (e) {
                e.preventDefault();
                clickedRole = element.querySelector(".hulpwoord").innerHTML;

                fetch(`extraData.json`)
                    .then(response => {
                        return response.json();
                    })
                    .then(obj => {

                        var op = 1; // initial opacity
                        var timer = setInterval(function () {
                            if (op <= 0.01) {
                                clearInterval(timer);
                                for (let lane in obj.mapObjective) {
                                    if (lane == clickedRole) {

                                        document.querySelector(".roleExp h1").innerHTML = obj.mapObjective[lane].name;
                                        document.querySelector(".roleExp p").innerHTML = obj.mapObjective[lane].description;
                                        document.querySelector(".mapIndicator").src = obj.mapObjective[lane].picture_url;


                                        fetch(`http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json`)
                                            .then(response => {
                                                return response.json();
                                            })
                                            .then(obj => {
                                                let i = [];
                                                for (let champ in obj.data) {
                                                    i.push(champ);
                                                }
                                                let slides = document.querySelectorAll(".slide");
                                                for (let slide of slides) {
                                                    let randomChamp = Math.floor(Math.random() * i.length);
                                                    slide.addEventListener("click", function () {
                                                        document.querySelector("#slider>p").innerHTML = i[randomChamp];
                                                    })

                                                    slide.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${i[randomChamp]}_0.jpg`;

                                                }


                                            });
                                    }

                                }

                                var timer2 = setInterval(function () {
                                    if (op >= 1.1) {
                                        clearInterval(timer2);
                                    }
                                    let fades = document.querySelectorAll(".fadeEffect");
                                    fades.forEach(fade => {
                                        fade.style.opacity = op;
                                        fade.style.filter = 'alpha(opacity=' + op * 100 + ")";
                                    })

                                    op += op * 0.1;
                                }, 10);

                            }

                            let fades = document.querySelectorAll(".fadeEffect");
                            fades.forEach(fade => {
                                fade.style.opacity = op;
                                fade.style.filter = 'alpha(opacity=' + op * 100 + ")";
                            })

                            op -= op * 0.1;
                        }, 10);

                    });


            });
        });

    }
};

// http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json

championApp.initFields();