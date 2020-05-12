
class CharClass {
  constructor() {
      this.hitDice = "";
    //   this.hp = 
  }
  getModifier() {}
}

class Barbarian extends CharClass {
  constructor() {}
  getModifier() {
    return '';
}

class Bard extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}

class Cleric extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}

class Druid extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
class Fighter extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
class Monk extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
class Paladin extends CharClass {
    constructor() {}
    getModifier() {
        return '1d2';
    }
}
class Ranger extends CharClass {
    constructor() {}
    getModifier() {
        return '1d2';
    }
}
class Rogue extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
class Sorcerer extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
class Warlock extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
class Wizard extends CharClass {
    constructor() {}
    getModifier() {
        return '';
    }
}
const barbarian = new Barbarian();

class Character {
  constructor(name, race, class) {
  }
}