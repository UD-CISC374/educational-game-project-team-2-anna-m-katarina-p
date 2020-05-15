export class checkMarks extends Phaser.Physics.Arcade.Image{
    
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "checkmark");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.04);
        this.setAlpha(0.0);
    }
}