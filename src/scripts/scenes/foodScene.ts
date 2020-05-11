import ExampleObject from '../objects/exampleObject';

export default class foodScene extends Phaser.Scene {
    private mapButton: any;
    private background: any;
    private apple: any;
    private banana: any;
    private bread: any;
    private chips: any;
    private cookie: any;
    private hotdog: any;
    private milk: any;
    private soda: any;
    private water: any;
    private basket: any;
    private paper: any;
    private dragObj: any;
    private word: any;
    private item: any;
    private items: any;
    private checkmark: any;
    private checkmark2: any;
    private checkmark3: any;
    private checkmark4: any;
    private checkmark5: any;
    private picked: any;
    private pickedList:any;
    private scoreLabel: any;
    private level: any;

    constructor(){
        super({key: 'foodScene'});
    }

    create(){
        this.background=this.add.image(200, 200, "green");     
        this.background.setScale(3.0);

        this.mapButton=this.add.image(70, 300, "mapButton")
        .setInteractive()
        .on('pointerdown', ()=>this.goToMap());
        this.mapButton.setScale(0.6);

        //Add paper and shopping list
        this.paper=this.add.image(70, 110, "paper");
        this.paper.setScale(1.2);
        this.add.text(15,5, "La Lista",{fill:"#000000", fontSize:"16px"});

        if (this.level=="1"){
          this.items = ["shirt", "apple", "plate"];
          this.add.text(40,30, "camisa",{fill:"#000000", fontSize:"16px"});
          this.add.text(40,50, "manzana",{fill:"#000000", fontSize:"16px"});
          this.add.text(40,70, "plato",{fill:"#000000", fontSize:"16px"});
        }

        if (this.level=="2"){
          this.items=["pants", "hat", "water"];
          this.add.text(35,30, "pantalones azules",{fill:"#000000", fontSize:"11px"});
          this.add.text(35,50, "botella de agua",{fill:"#000000", fontSize:"11px"});
          this.add.text(30,70, "sombrero de fiesta",{fill:"#000000", fontSize:"11px"});
        }

        if (this.level=="3"){
          this.items=["banana", "greenBalloon", "dress", "pjs", "soda"];
          this.add.text(35,30, "fruta amarilla",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,50, "globo verde",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,70, "vestido roja",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,90, "ropa de noche",{fill:"#000000", fontSize:"12px"});
          this.add.text(25,110,"bebida carbonatada",{fill:"#000000", fontSize:"12px"});
        }

        this.add.text(5,350,"Drag item to basket.",{fill:"#000000", fontSize:"16px"});

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

        //Fourth checkmark
        this.checkmark4=this.add.image(30,93,"checkmark");
        this.checkmark4.setScale(0.04);
        this.checkmark4.setAlpha(0.0);

        //Fifth checkmark
        this.checkmark5=this.add.image(30,114,"checkmark");
        this.checkmark5.setScale(0.04);
        this.checkmark5.setAlpha(0.0);

        //Make basket
        this.basket=this.physics.add.image(270,360,"basket");
        this.basket.setScale(0.5);

        //Make apple
        this.apple=this.physics.add.image(200,60,"apple");
        this.apple.setScale(0.2);
        this.apple.setInteractive();
        this.input.setDraggable(this.apple);

        //Make banana
        this.banana=this.physics.add.image(280,240,"banana");
        this.banana.setScale(0.3);
        this.banana.setInteractive();
        this.input.setDraggable(this.banana);

        //Make bread
        this.bread=this.physics.add.image(285,60,"bread");
        this.bread.setScale(0.25);
        this.bread.setInteractive();
        this.input.setDraggable(this.bread);

        //Make soda
        this.soda=this.physics.add.image(195,240,"soda");
        this.soda.setScale(0.03);
        this.soda.setInteractive();
        this.input.setDraggable(this.soda);

        //Make water
        this.water=this.physics.add.image(280,140,"water");
        this.water.setScale(0.08);
        this.water.setInteractive();
        this.input.setDraggable(this.water);

        //Make hotdog
        this.hotdog=this.physics.add.image(360,140,"hotdog");
        this.hotdog.setScale(0.25);
        this.hotdog.setInteractive();
        this.input.setDraggable(this.hotdog);

        //Make cookie
        this.cookie=this.physics.add.image(360,60,"cookie");
        this.cookie.setScale(0.15);
        this.cookie.setInteractive();
        this.input.setDraggable(this.cookie);

        //Make milk
        this.milk=this.physics.add.image(195,145,"milk");
        this.milk.setScale(0.25);
        this.milk.setInteractive();
        this.input.setDraggable(this.milk);

        //Make chips
        this.chips=this.physics.add.image(360,240,"chips");
        this.chips.setScale(0.1);
        this.chips.setInteractive();
        this.input.setDraggable(this.chips);

        this.scoreLabel = this.add.bitmapText(222, 332, "pixelFont", "SCORE ", 16);
        this.scoreLabel.setAlpha(0.0);

        this.input.on('pointerdown', this.startDrag, this);
        this.physics.add.overlap(this.basket, this.apple, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.banana, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.bread, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.soda, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.water, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.hotdog, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.cookie, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.milk, this.pick, undefined, this);
        this.physics.add.overlap(this.basket, this.chips, this.pick, undefined, this);

        this.picked=new Array();
        this.removeFood();

        this.addChecks();

      }

    update(){   
      this.checkDone();
    }

    goToMap(){
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
        if (this.pickedList.length==7){
          this.scene.start('finalScene');
        }
      }
    }

    pick(basket,item){
      if (item == this.apple){
        this.word = "apple";
        if (this.items.indexOf(this.word) != -1){
          this.apple.disableBody(true,true);
          this.checkmark2.setAlpha(1.0);
          this.picked.push("apple");
        }
        else{
          this.apple.setX(200);
          this.apple.setY(60);
          this.scoreLabel.text = "No, es una manzana";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.banana){
        this.word = "banana";
        if (this.items.indexOf(this.word) != -1){
          this.banana.disableBody(true,true);
          this.picked.push("banana");
          this.checkmark.setAlpha(1.0);
        }
        else{
          this.banana.setX(280);
          this.banana.setY(240);
          this.scoreLabel.text = "No, es una banana";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.bread){
        this.word = "bread";
        if (this.items.indexOf(this.word) != -1){
          this.bread.disableBody(true,true);
          this.picked.push("bread");
        }
        else{
          this.bread.setX(285);
          this.bread.setY(60);
          this.scoreLabel.text = "No, es un pan";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.soda){
        this.word = "soda";
        if (this.items.indexOf(this.word) != -1){
          this.soda.disableBody(true,true);
          this.checkmark5.setAlpha(1.0);
          this.picked.push("soda");
        }
        else{
          this.soda.setX(195);
          this.soda.setY(240);
          this.scoreLabel.text = "No, es una soda";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.water){
        this.word = "water";
        if (this.items.indexOf(this.word) != -1){
          this.water.disableBody(true,true);
          this.picked.push("water");
          this.checkmark2.setAlpha(1.0);
        }        
        else{
          this.water.setX(280);
          this.water.setY(140);
          this.scoreLabel.text = "No, es una botella de agua";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.hotdog){
        this.word = "hotdog";
        if (this.items.indexOf(this.word) != -1){
          this.hotdog.disableBody(true,true);
          this.picked.push("hotdog");
        }
        else{
          this.hotdog.setX(360);
          this.hotdog.setY(140);
          this.scoreLabel.text = "No, es un perro caliente";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.cookie){
        this.word = "cookie";
        if (this.items.indexOf(this.word) != -1){
          this.cookie.disableBody(true,true);
          this.picked.push("cookie");
        }
        else{
          this.cookie.setX(360);
          this.cookie.setY(60);
          this.scoreLabel.text = "No, es una galleta";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
  
      if (item == this.milk){
        this.word = "milk";
        if (this.items.indexOf(this.word) != -1){
          this.milk.disableBody(true,true);
          this.picked.push("milk");
        }
        else{
          this.milk.setX(195);
          this.milk.setY(145);
          this.scoreLabel.text = "No, es una botella de leche";
          this.scoreLabel.setAlpha(1.0);
          this.time.addEvent({
            delay: 800,
            callback: this.hideMess,
            callbackScope: this,
            loop: false
          });
        }
      }
      
      if (item == this.chips){
        this.word = "chips";
        if (this.items.indexOf(this.word) != -1){
          this.chips.disableBody(true,true);
          this.picked.push("chips");
        }
        else{
          this.chips.setX(360);
          this.chips.setY(240);
          this.scoreLabel.text = "No, es una patata frita";
          this.scoreLabel.setAlpha(1.0);
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

    hideMess(){
      this.scoreLabel.setAlpha(0.0);
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

      removeFood(){
        for (let index in this.pickedList){
          if (this.pickedList[index]=="apple"){
            this.apple.disableBody(true, true);
          }
          if (this.pickedList[index]=="bread"){
            this.bread.disableBody(true, true);
          }
          if (this.pickedList[index]=="cookie"){
            this.cookie.disableBody(true, true);
          }
          if (this.pickedList[index]=="milk"){
            this.milk.disableBody(true, true);
          }
          if (this.pickedList[index]=="water"){
            this.water.disableBody(true, true);
          }
          if (this.pickedList[index]=="hotdog"){
            this.hotdog.disableBody(true, true);
          }
          if (this.pickedList[index]=="soda"){
            this.soda.disableBody(true, true);
          }
          if (this.pickedList[index]=="banana"){
            this.banana.disableBody(true, true);
          }
          if (this.pickedList[index]=="chips"){
            this.chips.disableBody(true, true);
          }
        }
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
            if (this.pickedList[index]=="pjs"){
              this.checkmark4.setAlpha(1.0);
            }
            if (this.pickedList[index]=="soda"){
              this.checkmark5.setAlpha(1.0);
            }
          }
        }
      }
}