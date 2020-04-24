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
    private camisaX:any;
    private dragObj: any;
    private word: any;
    private item: any;
    private items: any;
    private itemsSelected: any;
    private listDone: any;
    private checkmark: any;
    private checkmark2: any;
    private checkmark3: any;

    constructor(){
        super({key: 'foodScene'});
    }

    create(){
        this.listDone = false;
        this.items = ["shirt", "shoes", "skirt"];
        this.itemsSelected = [];

        this.background=this.add.image(200, 200, "green");
        this.add.text(15, 15, "food Scene", {fill: '#000000', fontSize: '20px'});
        
        this.background.setScale(3.0);

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
        this.add.text(40,50, "zapatos",{fill:"#000000", fontSize:"16px"});
        this.add.text(40,70, "falda",{fill:"#000000", fontSize:"16px"});

        this.add.text(5,350,"Drag item to basket.",{fill:"#000000", fontSize:"16px"});

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
        this.scene.start('mapScene');
    }

    pick(basket,item){
      if (item == this.apple){
        this.word = "apple";
        if (this.items.indexOf(this.word) != -1){
          this.apple.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("apple");
        }
        else{
          this.apple.setX(200);
          this.apple.setY(60);
        }
      }
  
      if (item == this.banana){
        this.word = "banana";
        if (this.items.indexOf(this.word) != -1){
          this.banana.disableBody(true,true);
          this.checkmark3.setAlpha(1.0);
          this.itemsSelected.push("banana");
        }
        else{
          this.banana.setX(280);
          this.banana.setY(240);
        }
      }
  
      if (item == this.bread){
        this.word = "bread";
        if (this.items.indexOf(this.word) != -1){
          this.bread.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("bread");
        }
        else{
          this.bread.setX(285);
          this.bread.setY(60);
        }
      }
  
      if (item == this.soda){
        this.word = "soda";
        if (this.items.indexOf(this.word) != -1){
          this.soda.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("soda");
        }
        else{
          this.soda.setX(195);
          this.soda.setY(240);
        }
      }
  
      if (item == this.water){
        this.word = "water";
        if (this.items.indexOf(this.word) != -1){
          this.water.disableBody(true,true);
          this.checkmark2.setAlpha(1.0);
          this.itemsSelected.push("water");
        }
        else{
          this.water.setX(280);
          this.water.setY(140);
        }
      }
  
      if (item == this.hotdog){
        this.word = "hotdog";
        if (this.items.indexOf(this.word) != -1){
          this.hotdog.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("hotdog");
        }
        else{
          this.hotdog.setX(360);
          this.hotdog.setY(140);
        }
      }
  
      if (item == this.cookie){
        this.word = "cookie";
        if (this.items.indexOf(this.word) != -1){
          this.cookie.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("cookie");
        }
        else{
          this.cookie.setX(360);
          this.cookie.setY(60);
        }
      }
  
      if (item == this.milk){
        this.word = "milk";
        if (this.items.indexOf(this.word) != -1){
          this.milk.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("milk");
        }
        else{
          this.milk.setX(195);
          this.milk.setY(145);
        }
      }
      
      if (item == this.chips){
        this.word = "chips";
        if (this.items.indexOf(this.word) != -1){
          this.chips.disableBody(true,true);
          this.checkmark.setAlpha(1.0);
          this.itemsSelected.push("chips");
        }
        else{
          this.chips.setX(360);
          this.chips.setY(240);
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
}