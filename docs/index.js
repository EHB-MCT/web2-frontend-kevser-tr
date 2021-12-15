"use strict";

const championApp = {
    initFields() {
        this.extraData();
        this.getChampions();
        // let navbar = document.querySelector(".menu").querySelectorAll(".hover");
        // navbar.forEach(element=>{
        //     element.addEventListener("click", function(){
        //        navbar.forEach(nav=>nav.classList.remove("active"))     
        //        this.classList.add("active");
        //     })
        // });

    },

    getChampions(){
        let championSection = document.querySelector(".champions");
        fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json')
        .then(response => {
            return response.json();
        })
        .then(champs =>{
            console.log(champs)
            for(let champ in champs.data){
                console.log(champ)
                championSection.insertAdjacentHTML("beforeend", `<div class="champ"><img src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg" alt"champ image></div>`)
            }
           
        })
    },

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
                                                    slide.addEventListener("click",function(){
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