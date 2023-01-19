import BasicMonster from "./monster.js"

export default class ScullMonster extends BasicMonster {
    constructor(x, y, move, action, health) {
        super(x, y)
        
        this.name = "Scull"
        this.move = move
        this.action = action
        this.health = health

        this.movementPoints = move
        this.actionPoints = action
        this.healthPoints = health

        this.x = x
        this.y = y
        this.tile = 32*23+23-1
    }

    init() {
        super.init()
        this.sprite.tint = Phaser.Display.Color.GetColor(255,200,200)
    }

    refresh() {
        console.log(`${this.name} refresh() called`)
        this.movementPoints = this.move
        this.actionPoints = this.action
    }

}