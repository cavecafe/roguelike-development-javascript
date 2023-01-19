import dungeon from "./dungeon.js"

export default class PlayerCharacter {

    healty = Phaser.Display.Color.GetColor(0,255,0)
    warning = Phaser.Display.Color.GetColor(255,255,0)
    critical = Phaser.Display.Color.GetColor(255,0,0)
    
    constructor(x, y) {
        this.name = "The Player"
        this.movementPoints = 2
        this.actionPoints = 1
        this.healthPoints = 20
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys()
        this.x = x
        this.y = y 
        this.tile = 29
        this.moving = false

        dungeon.initializeEntity(this)
    }

    refresh() {
        this.movementPoints = 2
        this.actionPoints = 1
    }

    attack() {
        return 1
    }

    turn() {
        let oldX = this.x
        let oldY = this.y
        let moved = false
        let newX = this.x
        let newY = this.y

        if (this.movementPoints > 0) {
            if (this.cursors.left.isDown) {
                newX -= 1
                moved = true
            }

            if (this.cursors.right.isDown) {
                newX += 1
                moved = true
            }

            if (this.cursors.up.isDown) {
                newY -= 1
                moved = true
            }

            if (this.cursors.down.isDown) {
                newY += 1
                moved = true
            }

            if (moved) {
                this.movementPoints -= 1

                if (!dungeon.isWalkableTile(newX, newY)) {
                    let enemy = dungeon.entityAtTile(newX, newY)

                    if (enemy && this.actionPoints > 0) {
                        dungeon.attackEntity(this, enemy)
                        this.actionPoints -= 1
                    }

                    newX = oldX
                    newY = oldY
                }
                if (newX !== oldX || newY !== oldY) {
                    dungeon.moveEntityTo(this, newX, newY)
                }
            }
        }

        if (this.healthPoints <= 3) {
            this.sprite.tint = this.critical
        } 
        else if (this.healthPoints <= 8) {
            this.sprite.tint = this.warning
        }
        else {
            this.sprite.tint = this.healty
        }
    }

    over() {
        return this.movementPoints == 0 &&  !this.moving
    }

    onDestroy() {
        alert("OMG! you died!")
        location.reload()
    }
}