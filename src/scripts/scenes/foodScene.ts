import ExampleObject from '../objects/exampleObject';
import {checkMarks} from '../objects/checkMarks';
import {items} from '../objects/items';

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
    private message: any;
    private level: any;
    private stuff: any;

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

        //Add checkmarks
        this.checkmark=new checkMarks(this, 30, 30);
        this.checkmark2=new checkMarks(this, 30, 51);
        this.checkmark3=new checkMarks(this, 30, 72);
        this.checkmark4=new checkMarks(this, 30, 93);
        this.checkmark5=new checkMarks(this, 30, 114)

        //Make basket
        this.basket=this.physics.add.image(270,360,"basket");
        this.basket.setScale(0.5);

        //Make items
        this.apple=new items(this, 200, 60, "apple", 0.2, "No, es una manzana");
        this.banana=new items(this, 280, 240, "banana", 0.3, "No, es una banana");
        this.bread= new items(this, 285, 60, "bread", 0.25, "No, es un pan");
        this.soda=new items(this, 195,240, "soda", 0.03, "No, es una soda");
        this.water=new items(this, 280, 140, "water", 0.15, "No, es una botella de agua");
        this.hotdog=new items(this, 360, 140, "hotdog", 0.25, "No, es un perro caliente");
        this.cookie=new items(this, 360, 60, "cookie", 0.15, "No, es una galleta");
        this.milk=new items(this, 195, 145, "milk", 0.25, "No, es una botella de leche");
        this.chips=new items(this, 360, 240, "chips", 0.1, "No, es una patata frita");

        this.message = this.add.bitmapText(222, 322, "pixelFont", "SCORE ", 16);
        this.message.tint = 0xFF0000;
        this.message.setAlpha(0.0);

        this.stuff=this.physics.add.group([this.apple, this.bread, this.cookie, this.milk, this.water, this.hotdog, this.soda, this.banana, this.chips]);
        this.input.on('pointerdown', this.startDrag, this);

        this.physics.add.overlap(this.basket, this.stuff, this.pick, undefined, this);

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
          this.apple.goBack();
          this.reset(this.apple);
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
          this.banana.goBack();
          this.reset(this.banana);
        }
      }
  
      if (item == this.bread){
        this.word = "bread";
        if (this.items.indexOf(this.word) != -1){
          this.bread.disableBody(true,true);
          this.picked.push("bread");
        }
        else{
          this.bread.goBack();
          this.reset(this.bread);
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
          this.soda.goBack();
          this.reset(this.soda);
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
          this.water.goBack();
          this.reset(this.water);
        }
      }
  
      if (item == this.hotdog){
        this.word = "hotdog";
        if (this.items.indexOf(this.word) != -1){
          this.hotdog.disableBody(true,true);
          this.picked.push("hotdog");
        }
        else{
          this.hotdog.goBack();
          this.reset(this.hotdog);
        }
      }
  
      if (item == this.cookie){
        this.word = "cookie";
        if (this.items.indexOf(this.word) != -1){
          this.cookie.disableBody(true,true);
          this.picked.push("cookie");
        }
        else{
          this.cookie.goBack();
          this.reset(this.cookie);
        }
      }
  
      if (item == this.milk){
        this.word = "milk";
        if (this.items.indexOf(this.word) != -1){
          this.milk.disableBody(true,true);
          this.picked.push("milk");
        }
        else{
          this.milk.goBack();
          this.reset(this.milk);
        }
      }
      
      if (item == this.chips){
        this.word = "chips";
        if (this.items.indexOf(this.word) != -1){
          this.chips.disableBody(true,true);
          this.picked.push("chips");
        }
        else{
          this.chips.goBack();
          this.reset(this.chips);
        }
      }

      for (let index in this.picked){
        this.pickedList.push(this.picked[index]);
        this.picked=[];
      }
    }

    hideMess(){
      this.message.setAlpha(0.0);
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
      reset(item: items){
        this.message.text=item.message;
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay:800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
}