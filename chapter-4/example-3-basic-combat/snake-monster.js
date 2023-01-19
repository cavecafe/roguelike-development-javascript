import dungeon from "./dungeon.js"
import ScullMonster from "./scull-monster.js"

export default class SnakeMonster extends ScullMonster {
    constructor(x, y, move, action, health, damage, range) {
        super(x, y, move, action, health)
        this.name = "Snake"
        this.damage = damage
        this.range = range
        this.tile = 32*8+29-1
    }

    init() {
        super.init()
        this.sprite.tint = Phaser.Display.Color.GetColor(90,90,220)

    }

    refresh() {
        console.log(`${this.name} refresh() called`)

        this.movementPoints = this.move
        this.actionPoints = this.action
    }

    turn() {
        console.log(`${this.name} turn() called`)
        let oldX = this.x
        let oldY = this.y

        // https://github.com/qiao/PathFinding.js
        let pX = dungeon.player.x
        let pY = dungeon.player.y
        let grid = new PF.Grid(dungeon.level)
        let finder = new PF.AStarFinder()
        let path = finder.findPath(oldX, oldY, pX, pY, grid)
        let distance = dungeon.distanceBetweenEntities(this, dungeon.player)

        if (distance <= this.range) {
            if (this.movementPoints > 0) {
                if (path.length > 2) {
                    dungeon.moveEntityTo(this, path[1][0], path[1][1])
                }
                this.movementPoints -= 1
            }
    
            if (this.actionPoints > 0) {
                distance = dungeon.distanceBetweenEntities(this, dungeon.player)
                if (distance <= 2) {
                    dungeon.attackEntity(this, dungeon.player)
                }
                this.actionPoints -= 1 
            }
        }
        else {
            this.movementPoints = 0
            this.actionPoints = 0
        }
    }

}