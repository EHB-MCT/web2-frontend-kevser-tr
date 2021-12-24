async function getData() {

    let resp = await fetch("https://teambuilderlol.herokuapp.com/teams");

    return await resp.json();
}

async function showData() {
    let data = await getData();
    data.forEach(teamsGet => {
        console.log(teamsGet)
        let teamsId = document.getElementById('teams');

        let html = `<div>
         <p>${teamsGet.member}</p>`
        teamsId.insertAdjacentHTML("beforeend", html);

    })
}


getData();
showData();
