
export class Team {
    constructor(name, memebers, ad, ap) {
        this.name = name;
        this.memebers = memebers;
        this.ad = ad;
        this.ap = ap
    }
    async getChampions() {
        let response = await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json');
        return await response.json();
    }
    async champions(name, memebers, ad, ap) {
        await this.getChampions();
        for (let champion in champion.data) {
            console.log(champion);
        }
    }
}