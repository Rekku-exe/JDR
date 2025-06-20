class Player {
    constructor(type) {
        this.name = 'unamed';
        this.hp = 20;
        this.hpMax = 20;
        this.armor = 5;
        this.armorMax = 5;
        this.mana = 10;
        this.manaMax = 10;
        this.color = 'red';
        this.type = type;
    }

    takeDamage(value) {
        this.armor -= value;
        if (this.armor < 0) {
            this.hp += this.armor;
            this.armor = 0;
        }
    }

    toDom() {
        const li = document.createElement('li');
        if ('enemy' == this.type) {
            li.innerHTML = 
                `<i>V</i>
                <h4>${this.name}</h4>`
        } else {
            li.innerHTML =
                `<i>V</i>
                <h4>${this.name}</h4>
                <div class="entity_stats player_stats">
                    <div class="entity_stat player_stat --health">
                        PV
                        <span class="entity_stat_bar player_stat_bar"></span>
                    </div>
                    <div class="entity_stat player_stat --armor">
                        Armor
                        <span class="entity_stat_bar player_stat_bar"></span>
                    </div>
                    <div class="entity_stat player_stat --mana">
                        Mana
                        <span class="entity_stat_bar player_stat_bar"></span>
                    </div>
                </div>`
        }
        return li;
    }
}
