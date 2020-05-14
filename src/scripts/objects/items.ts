export class items extends Phaser.Physics.Arcade.Image{
    private message: string;
    private originalx: number;
    private originaly: number;

    constructor(scene: Phaser.Scene, x: number, y: number, name: string, scale: number, message: string){
        super(scene, x, y, name);
       
        this.setScale(scale);
        this.setInteractive();
        scene.input.setDraggable(this);

        this.message=message;
        this.originalx=x;
        this.originaly=y;

        scene.physics.add.existing(this);
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