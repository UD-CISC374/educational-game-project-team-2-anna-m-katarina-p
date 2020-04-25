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
  private mapButton: any;
  private yellowBackground: any;
  private listDone: any;
  private itemsSelected: any;
  private pickedList: any;
  private picked: any;
  private previouslyPicked: any;

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
    this.add.text(15,5, "Shopping List:",{fill:"#000000", fontSize:"16px"});
    this.camisaX = 40;
    this.add.text(this.camisaX,30, "camisa",{fill:"#000000", fontSize:"16px"});
    this.add.text(40,50, "manzana",{fill:"#000000", fontSize:"16px"});
    this.add.text(40,70, "plato",{fill:"#000000", fontSize:"16px"});

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

    //Make list of items for this level
    this.items = ["shirt", "apple", "plate"];

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
    
    for (var index in this.picked){
      this.pickedList.push(this.picked[index]);
    }

    this.scene.start('mapScene', this.pickedList);

  }

  pick(basket,item){
    if (item == this.shirt){
      this.word = "shirt";
      if (this.items.indexOf(this.word) != -1){
        this.shirt.disableBody(true,true);
        this.checkmark.setAlpha(1.0);
        this.itemsSelected.push("shirt");
        this.picked.push("shirt");
      }
      else{
        this.shirt.setX(200);
        this.shirt.setY(60);
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
      }
    }

    if (item == this.pjs){
      this.word = "pjs";
      if (this.items.indexOf(this.word) != -1){
        this.pjs.disableBody(true,true);
        this.itemsSelected.push("pjs");
        this.picked.push("pjs");
      }
      else{
        this.pjs.setX(360);
        this.pjs.setY(140);
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
      }
    }

    if (item == this.pants){
      this.word = "pants";
      if (this.items.indexOf(this.word) != -1){
        this.pants.disableBody(true,true);
        this.itemsSelected.push("pants");
        this.picked.push("pants");
      }
      else{
        this.pants.setX(320);
        this.pants.setY(240);
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
      }
    }

    if (item == this.dress){
      this.word = "dress";
      if (this.items.indexOf(this.word) != -1){
        this.dress.disableBody(true,true);
        this.itemsSelected.push("dress");
        this.picked.push("dress");
      }
      else{
        this.dress.setX(230);
        this.dress.setY(240);
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
