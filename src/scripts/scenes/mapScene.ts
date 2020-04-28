import ExampleObject from '../objects/exampleObject';

export default class mapScene extends Phaser.Scene {
    private foodButton: any;
    private partyButton: any;
    private clothesButton: any;
    private picked: any;
    private message: any;

    constructor(){
        super({key: 'mapScene'});
    }

    create(){
        let sum = 0;
        for (let index in this.picked){
        if (this.picked[index]=="shirt"){
            sum += 1;
        }
        if (this.picked[index]=="apple"){
            sum += 1;
        }
        if (this.picked[index]=="plate"){
            sum += 1;
        }
        }
        if (sum==3){
            this.add.text(10, 190, "LEVEL 1 COMPLETE!!", {fill: '#000000', fontSize: '20px'});
        }

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
        this.scene.start('MainScene', this.picked);
    }

    goToParty(){
        this.scene.start('partyScene', this.picked);
    }

    goToFood(){
        this.scene.start('foodScene', this.picked);
    }

    init(data){
        this.picked=data;
        console.log("picked list is: "+ this.picked);
    }
}