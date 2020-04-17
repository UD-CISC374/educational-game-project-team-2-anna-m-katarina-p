import ExampleObject from '../objects/exampleObject';

export default class foodScene extends Phaser.Scene {
    private mapButton: any;
    private background: any;
    constructor(){
        super({key: 'foodScene'});
    }

    create(){
        this.background=this.add.image(200, 200, "green");
        this.add.text(15, 15, "food Scene", {fill: '#000000', fontSize: '20px'});
        
        this.background.setScale(3.0);

        this.mapButton=this.add.image(70, 300, "mapButton")
        .setInteractive()
        .on('pointerdown', ()=>this.goToMap());
        this.mapButton.setScale(0.6);
    }

    update(){

    }

    goToMap(){
        this.scene.start('mapScene');
    }
}