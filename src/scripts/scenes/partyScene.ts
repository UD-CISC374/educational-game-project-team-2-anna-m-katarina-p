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
    private word: any;
    private item: any;
    private items: any;
    private itemsSelected: any;
    private listDone: any;
    private checkmark: any;
    private checkmark2: any;
    private checkmark3: any;
    private picked: any;
    private pickedList: any;

    constructor(){
        super({key: 'partyScene'});
    }

    create(){
        this.listDone = false;
        this.items = ["shirt", "apple", "plate"];
        this.itemsSelected = [];

        this.background=this.add.image(200, 200, "blue");
        this.background.setScale(3.0);

        //Add paper and shopping list
        this.paper=this.add.image(70, 110, "paper");
        this.paper.setScale(1.2);
        this.add.text(15,5, "Shopping List:",{fill:"#000000", fontSize:"16px"});
        this.camisaX = 40;
        this.add.text(this.camisaX,30, "camisa",{fill:"#000000", fontSize:"16px"});
        this.add.text(40,50, "manzana",{fill:"#000000", fontSize:"16px"});
        this.add.text(40,70, "plato",{fill:"#000000", fontSize:"16px"});

        this.add.text(5,350,"Drag item to basket.",{fill:"#000000", fontSize:"16px"});

        this.mapButton=this.add.image(70, 300, "mapButton")
        .setInteractive()
        .on('pointerdown', ()=>this.goToMap());
        this.mapButton.setScale(0.6);

        //Add checkmark
        this.checkmark=this.add.image(30, 30, "checkmark");
        this.checkmark.setScale(0.04);
        this.checkmark.setAlpha(0.0);

        //Second checkmark
        this.checkmark2=this.add.image(30, 51, "checkmark");
        this.checkmark2.setScale(0.04);
        this.checkmark2.setAlpha(0.0);

        //Third checkmark
        this.checkmark3=this.add.image(30, 72, "checkmark");
        this.checkmark3.setScale(0.04);
        this.checkmark3.setAlpha(0.0);

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

        //Make utensils
        this.utensils=this.physics.add.image(195,145,"utensils");
        this.utensils.setScale(0.15);
        this.utensils.setInteractive();
        this.input.setDraggable(this.utensils);

        this.input.on('pointerdown', this.startDrag, this);
        this.physics.add.overlap(this.basket, this.bowl, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.firework, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.greenBalloon, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.hat, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.plate, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.redBalloon, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.streamers, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.utensils, this.pick, undefined, this);
    
        this.picked=new Array();
        this.removeParty();

        this.addChecks();
      }

    update(){
      let allThere = 0;
      for (let index = 0; index < this.items.length; index++){
        allThere = this.itemsSelected.includes(this.items[index]) + allThere;
      }
      if (allThere == this.items.length){
        this.listDone == true;
      }
      else{
        this.listDone == false;
      }
    }

    goToMap(){
        for (let index in this.picked){
          this.pickedList.push(this.picked[index]);
        }
        this.scene.start('mapScene', this.pickedList);
    }

    pick(basket,item){
      if (item == this.bowl){
        this.word = "bowl";
        if (this.items.indexOf(this.word) != -1){
          this.bowl.disableBody(true,true);
          this.itemsSelected.push("bowl");
          this.picked.push("bowl");
        }
        else{
          this.bowl.setX(200);
          this.bowl.setY(60);
        }
      }
  
      if (item == this.firework){
        this.word = "firework";
        if (this.items.indexOf(this.word) != -1){
          this.firework.disableBody(true,true);
          this.itemsSelected.push("firework");
          this.picked.push("firework");
        }
        else{
          this.firework.setX(320);
          this.firework.setY(240);
        }
      }
  
      if (item == this.greenBalloon){
        this.word = "greenBalloon";
        if (this.items.indexOf(this.word) != -1){
          this.greenBalloon.disableBody(true,true);
          this.itemsSelected.push("greenBalloon");
          this.picked.push("greenBalloon");
        }
        else{
          this.greenBalloon.setX(285);
          this.greenBalloon.setY(60);
        }
      }
  
      if (item == this.hat){
        this.word = "hat";
        if (this.items.indexOf(this.word) != -1){
          this.hat.disableBody(true,true);
          this.itemsSelected.push("hat");
          this.picked.push("hat");
        }
        else{
          this.hat.setX(230);
          this.hat.setY(240);
        }
      }
  
      if (item == this.plate){
        this.word = "plate";
        if (this.items.indexOf(this.word) != -1){
          this.plate.disableBody(true,true);
          this.checkmark3.setAlpha(1.0);
          this.itemsSelected.push("plate");
          this.picked.push("plate");
        }
        else{
          this.plate.setX(280);
          this.plate.setY(140);
        }
      }
  
      if (item == this.redBalloon){
        this.word = "redBalloon";
        if (this.items.indexOf(this.word) != -1){
          this.redBalloon.disableBody(true,true);
          this.itemsSelected.push("redBalloon");
          this.picked.push("redBalloon");
        }
        else{
          this.redBalloon.setX(360);
          this.redBalloon.setY(140);
        }
      }
  
      if (item == this.streamers){
        this.word = "streamers";
        if (this.items.indexOf(this.word) != -1){
          this.streamers.disableBody(true,true);
          this.itemsSelected.push("streamers");
          this.picked.push("streamers")
        }
        else{
          this.streamers.setX(360);
          this.streamers.setY(60);
        }
      }
  
      if (item == this.utensils){
        this.word = "utensils";
        if (this.items.indexOf(this.word) != -1){
          this.utensils.disableBody(true,true);
          this.itemsSelected.push("utensils");
          this.picked.push("utensils");
        }
        else{
          this.utensils.setX(195);
          this.utensils.setY(145);
        }
      }
      
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

      init(data){
        this.pickedList=Array.from(data);
      }
      
      removeParty(){
        for (let index in this.pickedList){
          if (this.pickedList[index]=="bowl"){
            this.bowl.disableBody(true, true);
          }
          if (this.pickedList[index]=="greenBalloon"){
            this.greenBalloon.disableBody(true, true);
          }
          if (this.pickedList[index]=="streamers"){
            this.streamers.disableBody(true, true);
          }
          if (this.pickedList[index]=="utensils"){
            this.utensils.disableBody(true, true);
          }
          if (this.pickedList[index]=="plate"){
            this.plate.disableBody(true, true);
          }
          if (this.pickedList[index]=="redBalloon"){
            this.redBalloon.disableBody(true, true);
          }
          if (this.pickedList[index]=="hat"){
            this.hat.disableBody(true, true);
          }
          if (this.pickedList[index]=="firework"){
            this.firework.disableBody(true, true);
          }
        }
      }

      addChecks(){
        for (let index in this.pickedList){
          if (this.pickedList[index]=="shirt"){
            this.checkmark.setAlpha(1.0);
          }
          if (this.pickedList[index]=="apple"){
            this.checkmark2.setAlpha(1.0);
          }
          if (this.pickedList[index]=="plate"){
            this.checkmark3.setAlpha(1.0);
          }
        }
      }
}