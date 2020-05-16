export class items extends Phaser.Physics.Arcade.Image{
    message: string;
    originalx: number;
    originaly: number;
    name: string;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string, scale: number, message: string){
        super(scene, x, y, name);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(scale);
        this.setInteractive();
        scene.input.setDraggable(this);

        this.message=message;
        this.originalx=x;
        this.originaly=y;
        this.name=name;
    }

    updateCoordinates(pointer){
        this.x=pointer.x;
        this.y=pointer.y;
    }

    goBack(){
        this.x=this.originalx;
        this.y=this.originaly;
    }
}