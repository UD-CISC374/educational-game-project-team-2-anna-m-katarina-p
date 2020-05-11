import ExampleObject from '../objects/exampleObject';

export default class clothingScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
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
  private camisaX: any;
  private checkmark2: any;
  private checkmark3: any;
  private checkmark4: any;
  private checkmark5: any;
  private mapButton: any;
  private yellowBackground: any;
  private listDone: any;
  private itemsSelected: any;
  private pickedList: any;
  private picked: any;
  private x: any;
  private message: any;
  private level: any;
  private level2List: any;
  private level3List: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.listDone=false;
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

    //Make list of items for this level
    this.items = ["shirt", "apple", "plate"];

    //Make list of items for level 2
    this.level2List=["pants, hat, water"];

    this.level3List=["banana, greenBalloon, dress, pjs, soda"];

    //Make list of items selected
    this.itemsSelected = [];
    
    //Make basket
    this.basket=this.physics.add.image(270,360,"basket");
    this.basket.setScale(0.5);
    
    //Make shirt
    this.shirt=this.physics.add.image(200,60,"shirt");
    this.shirt.setScale(0.15);
    this.shirt.setInteractive();
    this.input.setDraggable(this.shirt);

    //Make pants
    this.pants=this.physics.add.image(320, 240, "pants");
    this.pants.setScale(0.2);
    this.pants.setInteractive();
    this.input.setDraggable(this.pants);

    //Make shoes
    this.shoes=this.physics.add.image(285,60,"shoes");
    this.shoes.setScale(0.15);
    this.shoes.setInteractive();
    this.input.setDraggable(this.shoes);

    //Make dress
    this.dress=this.physics.add.image(230,240,"dress");
    this.dress.setScale(0.2);
    this.dress.setInteractive();
    this.input.setDraggable(this.dress);

    //Make shorts
    this.shorts=this.physics.add.image(280,140,"shorts");
    this.shorts.setScale(0.15);
    this.shorts.setInteractive();
    this.input.setDraggable(this.shorts);

    //Make pjs
    this.pjs=this.physics.add.image(360,140,"pjs");
    this.pjs.setScale(0.20);
    this.pjs.setInteractive();
    this.input.setDraggable(this.pjs);

    //Make skirt
    this.skirt=this.physics.add.image(360,60,"skirt");
    this.skirt.setScale(0.12);
    this.skirt.setInteractive();
    this.input.setDraggable(this.pjs);

    //Make sweater
    this.sweater=this.physics.add.image(195,145,"sweater");
    this.sweater.setScale(0.15);
    this.sweater.setInteractive();
    this.input.setDraggable(this.sweater);

    this.message=this.add.bitmapText(222,332, "pixelFont", "SCORE ", 16);
    this.message.setAlpha(0.0);

    //Set up dragging into basket
    this.input.on('pointerdown', this.startDrag, this);
    this.physics.add.overlap(this.basket, this.shirt, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.skirt, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.pjs, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.shoes, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.pants, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.shorts, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.dress, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.sweater, this.pick, undefined, this);

    this.picked=new Array();   
    this.removeClothes(); 

    this.addChecks();
  }

  update() {
    this.checkDone();
  }

  goToMap(){
    
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
    if (item == this.shirt){
      this.word = "shirt";
      if (this.level=="1"&&this.items.indexOf(this.word) != -1){
        this.shirt.disableBody(true,true);
        this.checkmark.setAlpha(1.0);
        this.itemsSelected.push("shirt");
        this.picked.push("shirt");
      }
      else{
        this.shirt.setX(200);
        this.shirt.setY(60);
        this.message.text = "No, es una camisa";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
    }

    if (item == this.skirt){
      this.word = "skirt";
      if (this.items.indexOf(this.word) != -1){
        this.skirt.disableBody(true,true);
        this.itemsSelected.push("skirt");
        this.picked.push("skirt");
      }
      else{
        this.skirt.setX(360);
        this.skirt.setY(60);
        this.message.text = "No, es una falda";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
    }

    if (item == this.pjs){
      this.word = "pjs";
      if (this.level=="3"){
        this.pjs.disableBody(true,true);
        this.checkmark4.setAlpha(1.0);
        this.itemsSelected.push("pjs");
        this.picked.push("pjs");
      }
      else{
        this.pjs.setX(360);
        this.pjs.setY(140);
        this.message.text = "No, es un pijama";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
    }

    if (item == this.sweater){
      this.word = "sweater";
      if (this.items.indexOf(this.word) != -1){
        this.sweater.disableBody(true,true);
        this.itemsSelected.push("sweater");
        this.picked.push("sweater");
      }
      else{
        this.sweater.setX(195);
        this.sweater.setY(145);
        this.message.text = "No, es un sueter";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }

      for (let index in this.picked){
        this.pickedList.push(this.picked[index]);
      }
    }

    if (item == this.shoes){
      this.word = "shoes";
      if (this.items.indexOf(this.word) != -1){
        this.shoes.disableBody(true,true);
        this.itemsSelected.push("shoes");
        this.picked.push("shoes");
      }
      else{
        this.shoes.setX(285);
        this.shoes.setY(60);
        this.message.text = "No, es los zapatos";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
    }

    if (item == this.pants){
      this.word = "pants";
      if (this.level=="2"){
        this.pants.disableBody(true,true);
        this.itemsSelected.push("pants");
        this.picked.push("pants");
        this.checkmark.setAlpha(1.0);
      }
      else{
        this.pants.setX(320);
        this.pants.setY(240);
        this.message.text = "No, es un pantalones";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
    }

    if (item == this.shorts){
      this.word = "shorts";
      if (this.items.indexOf(this.word) != -1){
        this.shorts.disableBody(true,true);
        this.itemsSelected.push("shorts");
        this.picked.push("shorts");
      }
      else{
        this.shorts.setX(280);
        this.shorts.setY(140);
        this.message.text = "No, es los pantalones cortos";
        this.message.setAlpha(1.0);
        this.time.addEvent({
          delay: 800,
          callback: this.hideMess,
          callbackScope: this,
          loop: false
        });
      }
    }

    if (item == this.dress){
      this.word = "dress";
      if (this.level=="3"){
        this.dress.disableBody(true,true);
        this.itemsSelected.push("dress");
        this.picked.push("dress");
        this.checkmark3.setAlpha(1.0);
      }
      else{
        this.dress.setX(230);
        this.dress.setY(240);
        this.message.text = "No, es un vestido";
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

  removeClothes(){
    for (let index in this.pickedList){
      if (this.pickedList[index]=="shirt"){
        this.shirt.disableBody(true, true);
      }
      if (this.pickedList[index]=="shoes"){
        this.shoes.disableBody(true, true);
      }
      if (this.pickedList[index]=="skirt"){
        this.skirt.disableBody(true, true);
      }
      if (this.pickedList[index]=="sweater"){
        this.sweater.disableBody(true, true);
      }
      if (this.pickedList[index]=="pjs"){
        this.pjs.disableBody(true, true);
      }
      if (this.pickedList[index]=="dress"){
        this.dress.disableBody(true, true);
      }
      if (this.pickedList[index]=="shorts"){
        this.shorts.disableBody(true, true);
      }
      if (this.pickedList[index]=="pants"){
        this.pants.disableBody(true, true);
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
