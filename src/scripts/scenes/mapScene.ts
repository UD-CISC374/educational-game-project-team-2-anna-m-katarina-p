export default class mapScene extends Phaser.Scene {
    private foodButton: any;
    private partyButton: any;
    private clothesButton: any;
    private picked: any;

    constructor(){
        super({key: 'mapScene'});
    }

    create(){
        //Add labels
        this.add.text(0, 0, "Map", {fill: '#000000', fontSize: '20px'});
        this.add.text(180,5,"Click a store to enter", {fill: '#000000', fontSize: '16px'});

        //Add buttons
        this.clothesButton=this.add.image(100,100,"clothingStore")
        .setInteractive()
        .on('pointerdown', ()=>this.goToClothes());
        this.clothesButton.setScale(0.5);

        this.partyButton=this.add.image(300, 175, "partyStore")
        .setInteractive()
        .on('pointerdown', ()=>this.goToParty());
        this.partyButton.setScale(0.5);

        this.foodButton=this.add.image(100, 300, "foodStore")
        .setInteractive()
        .on('pointerdown', ()=>this.goToFood());
        this.foodButton.setScale(0.5);
    }

    update(){
        //Tell them where they're at in the levels
        if (this.picked[0]=="2"&&this.picked[1]=="false"){
            this.add.text(10, 190, "LEVEL 1 COMPLETE!!", {fill: '#000000', fontSize: '20px'});
            this.picked[1]="true";
        }
        if (this.picked[0]=="3"&&this.picked[1]=="false"){
            this.add.text(10, 190, "LEVEL 2 COMPLETE!!", {fill: '#000000', fontSize: '20px'});
            this.picked[1]="true";
        }
        if (this.picked[0]=="4"&&this.picked[1]=="false"){
            this.goToEnd();
        }        
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

    goToEnd(){
        this.scene.start('finalScene');
    }

    init(data){
        this.picked=data;
        console.log("picked list is: "+ this.picked);
    }
}