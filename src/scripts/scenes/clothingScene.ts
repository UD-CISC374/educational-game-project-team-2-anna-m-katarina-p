import {items} from '../objects/items';
import { checkMarks } from '../objects/checkMarks';

export default class clothingScene extends Phaser.Scene {
  private shirt: any;
  private pants: any;
  private shoes: any;
  private shorts: any;
  private skirt: any;
  private dress: any;
  private pjs: any;
  private sweater: any;
  private basket: any;
  private checkmark: any;
  private word: any;
  private item: any;
  private items: Array<any>;
  private dragObj: any;
  private paper:any;
  private checkmark2: any;
  private checkmark3: any;
  private checkmark4: any;
  private checkmark5: any;
  private mapButton: any;
  private yellowBackground: any;
  private pickedList: any;
  private picked: any;
  private message: any;
  private level: any;
  private stuff: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //Add background and map button
    this.yellowBackground=this.add.image(200, 200, "yellowBackground");

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
      this.items =["pants", "hat", "water"];
      this.add.text(35,30, "pantalones azules",{fill:"#000000", fontSize:"11px"});
      this.add.text(35,50, "botella de agua",{fill:"#000000", fontSize:"11px"});
      this.add.text(30,70, "sombrero de fiesta",{fill:"#000000", fontSize:"11px"});
    }   
    
    if (this.level=="3"){
      this.items =["banana", "greenBalloon", "dress", "pjs", "soda"];
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
    this.checkmark5=new checkMarks(this, 30, 114);  

    //Make basket
    this.basket=this.physics.add.image(270,360,"basket");
    this.basket.setScale(0.5);
    
    //Create the items
    this.shirt=new items(this, 200, 60, "shirt", 0.15, "No, es una camisa");
    this.pants=new items(this, 320, 240, "pants", 0.2, "No, es pantalones");
    this.shoes=new items(this, 285, 60, "shoes", 0.15, "No, son los zapatos");
    this.dress=new items(this, 230, 240, "dress", 0.2, "No, es el vestido");
    this.shorts=new items(this, 280, 140, "shorts", 0.15, "No, son los cortos");
    this.pjs=new items(this, 360, 140, "pjs", 0.20, "No, es un pijama");
    this.skirt=new items(this, 360, 60, "skirt", 0.12, "No, es una falda");
    this.sweater=new items(this, 195, 145, "sweater", 0.15, "No, es un sueter");

    this.message=this.add.bitmapText(222,322, "pixelFont", "SCORE ", 16);
    this.message.tint = 0xFF0000;
    this.message.setAlpha(0.0);

    //Set up dragging into basket
    this.input.on('pointerdown', this.startDrag, this);

    this.stuff = this.physics.add.group([this.shirt, this.pants, this.shoes, this.dress, this.shorts, this.pjs, this.skirt, this.sweater]);
    this.physics.add.overlap(this.basket, this.stuff, this.pick, undefined, this);
    
    this.picked=new Array();   
    
    this.removeClothes(); 

    this.addChecks();
  }

  update() {
    this.checkDone();
  }

  goToMap(){  
    console.log(this.pickedList);
    for (var index in this.picked){
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
      if (this.pickedList.length==7){
        this.scene.start('finalScene');
      }
    }
  }

  pick(basket,item){
    var dict = {shirt: "shirt", skirt: "skirt", pjs: "pjs", sweater: "sweater", shoes: "shoes", pants: "pants", shorts: "shorts", dress: "dress"};
    this.word = dict[item.name];

    if (this.items.indexOf(this.word) != -1){
      item.disableBody(true,true);
      this.picked.push(this.word);
      var add_checks = {0: this.checkmark, 1: this.checkmark2, 2: this.checkmark3, 3: this.checkmark4, 4: this.checkmark5};
      add_checks[this.items.indexOf(this.word)].setAlpha(1.0);
    }
    else{
      item.goBack();
      this.reset(item);
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

  removeClothes(){
    var clothes = {"shirt": this.shirt, "shoes": this.shoes, "skirt": this.skirt, "sweater": this.sweater, "pjs": this.pjs, "dress": this.dress, "shorts": this.shorts, "pants": this.pants};
    for (let index in this.pickedList){
      for (let thing in clothes){
        if (this.pickedList[index]==thing){
          clothes[thing].disableBody(true,true);
        }
      }
    }
  }

  hideMess(){
    this.message.setAlpha(0.0);
  }

  addChecks(){
    var add_checks = {0: this.checkmark, 1: this.checkmark2, 2: this.checkmark3, 3: this.checkmark4, 4: this.checkmark5};
        for (let index in this.pickedList){
          if (this.items.includes(this.pickedList[index])){
            add_checks[this.items.indexOf(this.pickedList[index])].setAlpha(1.0);
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
