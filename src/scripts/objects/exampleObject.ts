export default class ExampleObject extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "shirt");
        scene.add.existing(this);
    }
}
