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
    private message: any;
    private level: any;
    private level2List: any;
    private level3List: any;

    constructor(){
        super({key: 'partyScene'});
    }

    create(){
        this.listDone = false;
        this.items = ["shirt", "apple", "plate"];
        this.itemsSelected = [];

        this.level2List=["pants, hat, water"];

        this.level3List=["banana, greenBalloon, dress"];

        this.background=this.add.image(200, 200, "blue");
        this.background.setScale(3.0);

        //Add paper and shopping list
        this.paper=this.add.image(70, 110, "paper");
        this.paper.setScale(1.2);
        this.add.text(15,5, "Shopping List:",{fill:"#000000", fontSize:"16px"});

        if (this.level=="1"){
          this.add.text(40,30, "camisa",{fill:"#000000", fontSize:"16px"});
          this.add.text(40,50, "manzana",{fill:"#000000", fontSize:"16px"});
          this.add.text(40,70, "plato",{fill:"#000000", fontSize:"16px"});
        }

        if (this.level=="2"){
          this.add.text(35,30, "pantalones azules",{fill:"#000000", fontSize:"11px"});
          this.add.text(35,50, "botella de agua",{fill:"#000000", fontSize:"11px"});
          this.add.text(30,70, "sombrero de fiesta",{fill:"#000000", fontSize:"11px"});
        }

        if (this.level=="3"){
          this.add.text(35,30, "fruta amarilla",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,50, "globo verde",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,70, "vestido roja",{fill:"#000000", fontSize:"12px"});
        }

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

        this.message=this.add.bitmapText(222,332, "pixelFont", "SCORE ", 16);
        this.message.setAlpha(0.0);

        this.addChecks();
      }

    update(){
      this.checkDone();
    }

    goToMap(){
        for (let index in this.picked){
          this.pickedList.push(this.picked[index]);
        }
        this.scene.start('mapScene', this.pickedList);
    }

    checkDone(){
      if (this.level=="1"){
        if (this.pickedList.length==5){
          this.scene.start('mapScene', ["2", "false"]);
        }
      }
      if (this.level=="2"){
        if (this.pickedList.length==5){
          this.scene.start('mapScene', ["3", "false"]);
        }
      }
      if (this.level=="3"){
        if (this.pickedList.length==5){
          this.scene.start('mapScene', ["4", "false"]);
        }
      }
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
          this.message.text = "No, es un bol";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
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
          this.message.text = "No, es unos fuegos de artificio";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.greenBalloon){
        this.word = "greenBalloon";
        if (this.level=="3"){
          this.greenBalloon.disableBody(true,true);
          this.itemsSelected.push("greenBalloon");
          this.picked.push("greenBalloon");
          this.checkmark2.setAlpha(1.0);
        }
        else{
          this.greenBalloon.setX(285);
          this.greenBalloon.setY(60);
          this.message.text = "No, es un globo verde";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.hat){
        if (this.level=="2"){
          this.hat.disableBody(true,true);
          this.itemsSelected.push("hat");
          this.picked.push("hat");
          this.checkmark3.setAlpha(1.0);
        }
        else{
          this.hat.setX(230);
          this.hat.setY(240);
          this.message.text = "No, es un sombrero";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
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
          this.message.text = "No, es un plato";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
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
          this.message.text = "No, es un globo rojo";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
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
          this.message.text = "No, es un serpentina";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
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
          this.message.text = "No, es los utensilios";
          this.message.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }

      for (let index in this.picked){
        this.pickedList.push(this.picked[index]);
        this.picked=[];
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
        this.level=this.pickedList[0];
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

      hideMess(){
        this.message.setAlpha(0.0);
      }

      addChecks(){
        if (this.level=="1"){
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

        if (this.level=="2"){
          for (let index in this.pickedList){
            if (this.pickedList[index]=="pants"){
              this.checkmark.setAlpha(1.0);
            }
            if (this.pickedList[index]=="water"){
              this.checkmark2.setAlpha(1.0);
            }
            if (this.pickedList[index]=="hat"){
              this.checkmark3.setAlpha(1.0);
            }
          }
        }

        if (this.level=="3"){
          for (let index in this.pickedList){
            if (this.pickedList[index]=="banana"){
              this.checkmark.setAlpha(1.0);
            }
            if (this.pickedList[index]=="greenBalloon"){
              this.checkmark2.setAlpha(1.0);
            }
            if (this.pickedList[index]=="dress"){
              this.checkmark3.setAlpha(1.0);
            }
          }
        }
      }
}