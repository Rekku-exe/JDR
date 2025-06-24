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
        if ('enemy' == this.type) {
            return renderVDom(enemyDom(this.name));
        } else {
            return renderVDom(allyDom(this.name));
        }
    }
}
