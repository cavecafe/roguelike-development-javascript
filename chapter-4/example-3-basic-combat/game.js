import dungeon from "./dungeon.js"
import tm from "./turnManager.js"
import PlayerCharacter from "./player.js"
import BasicMonster from "./monster.js"
import ScullMonster from "./scull-monster.js"
import SnakeMonster from "./snake-monster.js"

const scene = {
    preload: function () {
        // load tiles ...
        this.load.spritesheet('tiles', 'assets/colored.png', { frameWidth: 16, frameHeight: 16, spacing: 1 })
    },
    create: function () {
        dungeon.initialize(this)

        dungeon.player = new PlayerCharacter(23, 18)
        tm.addEntity(dungeon.player)

        var monsters = [
            new BasicMonster(20,20),
            new BasicMonster(20,10),
            new BasicMonster(76,10),
            new BasicMonster(29,44),
            new BasicMonster(29,40),
            new ScullMonster(10, 10, 2, 1, 3),
            new SnakeMonster(49, 22, 1, 1, 3, 5, 15)
        ];

        for (let monster of monsters) {
            monster.init()
            tm.addEntity(monster)
        }

    },
    update: function () {
        if (tm.over()) {
            tm.refresh()
        }
        tm.turn()
    }
}

const config = {
    type: Phaser.AUTO,
    width: 80 * 16,
    height: 50 * 16,
    backgroundColor: "#000",
    parent: "game",
    pixelArt: true,
    zoom: 2,
    scene: scene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config)