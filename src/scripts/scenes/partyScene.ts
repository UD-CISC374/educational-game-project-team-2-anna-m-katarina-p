import ExampleObject from '../objects/exampleObject';

export default class partyScene extends Phaser.Scene {
    private mapButton: any;
    private background: any;
    private bowl: any;
    private firework: any;
    private greenBalloon: any;
    private hat: any;
    private plate: any;
    private redBalloon: any;
    private streamers: any;
    private utensils: any;
    private paper: any;
    private camisaX: any;
    private basket: any;
    private dragObj: any;

    constructor(){
        super({key: 'partyScene'});
    }

    create(){
        this.background=this.add.image(200, 200, "blue");
        this.background.setScale(3.0);

        //Add paper and shopping list
        this.paper=this.add.image(70, 110, "paper");
        this.paper.setScale(1.2);
        this.add.text(15,5, "Shopping List:",{fill:"#000000", fontSize:"16px"});
        this.camisaX = 40;
        this.add.text(this.camisaX,30, "camisa",{fill:"#000000", fontSize:"16px"});
        this.add.text(40,50, "zapatos",{fill:"#000000", fontSize:"16px"});
        this.add.text(40,70, "falda",{fill:"#000000", fontSize:"16px"});

        this.add.text(5,350,"Drag item to basket.",{fill:"#000000", fontSize:"16px"});

        this.mapButton=this.add.image(70, 300, "mapButton")
        .setInteractive()
        .on('pointerdown', ()=>this.goToMap());
        this.mapButton.setScale(0.6);

        //Make basket
        this.basket=this.physics.add.image(270,360,"basket");
        this.basket.setScale(0.5);

        //Make bowl
        this.bowl=this.physics.add.image(200,60,"bowl");
        this.bowl.setScale(0.15);
        this.bowl.setInteractive();
        this.input.setDraggable(this.bowl);

        //Make firework
        this.firework=this.physics.add.image(320,240,"firework");
        this.firework.setScale(0.15);
        this.firework.setInteractive();
        this.input.setDraggable(this.firework);

        //Make green balloon
        this.greenBalloon=this.physics.add.image(285,60,"greenBalloon");
        this.greenBalloon.setScale(0.1);
        this.greenBalloon.setInteractive();
        this.input.setDraggable(this.greenBalloon);

        //Make hat
        this.hat=this.physics.add.image(230,240,"hat");
        this.hat.setScale(0.15);
        this.hat.setInteractive();
        this.input.setDraggable(this.hat);

        //Make plate
        this.plate=this.physics.add.image(280,140,"plate");
        this.plate.setScale(0.15);
        this.plate.setInteractive();
        this.input.setDraggable(this.plate);

        //Make red balloon
        this.redBalloon=this.physics.add.image(360,140,"redBalloon");
        this.redBalloon.setScale(0.1);
        this.redBalloon.setInteractive();
        this.input.setDraggable(this.redBalloon);

        //Make streamers
        this.streamers=this.physics.add.image(360,60,"streamers");
        this.streamers.setScale(0.15);
        this.streamers.setInteractive();
        this.input.setDraggable(this.streamers);

        //Make shirt
        this.utensils=this.physics.add.image(195,145,"utensils");
        this.utensils.setScale(0.15);
        this.utensils.setInteractive();
        this.input.setDraggable(this.utensils);

        this.input.on('pointerdown', this.startDrag, this);
    }

    update(){
        
    }

    goToMap(){
        this.scene.start('mapScene');
    }

    startDrag(pointer, targets){
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj=targets[0];
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    
      }
      doDrag(pointer){
        this.dragObj.x=pointer.x;
        this.dragObj.y=pointer.y;
      }
    
      stopDrag(){
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
      }
}