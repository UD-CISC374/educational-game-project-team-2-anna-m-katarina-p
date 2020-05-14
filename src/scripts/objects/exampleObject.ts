export default class ExampleObject extends Phaser.Physics.Arcade.Image {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "shirt");
        scene.add.existing(this);
    }
}
