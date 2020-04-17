import ExampleObject from '../objects/exampleObject';

export default class mapScene extends Phaser.Scene {
    private foodButton: any;
    private partyButton: any;
    private clothesButton: any;

    constructor(){
        super({key: 'mapScene'});
    }

    create(){
        this.add.text(0, 0, "Map", {fill: '#000000', fontSize: '20px'});
        
        this.clothesButton=this.add.image(100,100,"clothesButton")
         .setInteractive()
         .on('pointerdown', ()=>this.goToClothes());
        this.clothesButton.setScale(0.75);

        this.partyButton=this.add.image(300, 175, "partyButton")
         .setInteractive()
         .on('pointerdown', ()=>this.goToParty());
        this.partyButton.setScale(0.6);

        this.foodButton=this.add.image(100, 300, "foodButton")
         .setInteractive()
         .on('pointerdown', ()=>this.goToFood());
        this.foodButton.setScale(0.6);


    }

    update(){
        
    }

    goToClothes(){
        this.scene.start('MainScene');
    }

    goToParty(){
        this.scene.start('partyScene');
    }

    goToFood(){
        this.scene.start('foodScene');
    }
}