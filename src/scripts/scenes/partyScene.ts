import {items} from '../objects/items';
import {checkMarks} from '../objects/checkMarks';

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
    private basket: any;
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
    private pickedList: any;
    private message: any;
    private level: any;
    private stuff: any;

    constructor(){
        super({key: 'partyScene'});
    }

    create(){
        //Create the background
        this.background=this.add.image(200, 200, "blue");
        this.background.setScale(3.0);

        //Add paper and shopping list
        this.paper=this.add.image(70, 110, "paper");
        this.paper.setScale(1.2);
        this.add.text(15,5, "La Lista",{fill:"#000000", fontSize:"16px"});

        //Determine what's on the list based on the level
        if (this.level=="1"){
          this.items = ["shirt", "apple", "plate"];
          this.add.text(40,30, "camisa",{fill:"#000000", fontSize:"16px"});
          this.add.text(40,50, "manzana",{fill:"#000000", fontSize:"16px"});
          this.add.text(40,70, "plato",{fill:"#000000", fontSize:"16px"});
        }

        if (this.level=="2"){
          this.items = ["pants", "hat", "water"];
          this.add.text(35,30, "pantalones azules",{fill:"#000000", fontSize:"11px"});
          this.add.text(35,50, "botella de agua",{fill:"#000000", fontSize:"11px"});
          this.add.text(30,70, "sombrero de fiesta",{fill:"#000000", fontSize:"11px"});
        }

        if (this.level=="3"){
          this.items = ["banana", "greenBalloon", "dress", "pjs", "soda"];
          this.add.text(35,30, "fruta amarilla",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,50, "globo verde",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,70, "vestido roja",{fill:"#000000", fontSize:"12px"});
          this.add.text(35,90, "ropa de noche",{fill:"#000000", fontSize:"12px"});
          this.add.text(25,110,"bebida carbonatada",{fill:"#000000", fontSize:"12px"});
        }

        //Add instructions and return to map button
        this.add.text(5,350,"Drag item to basket.",{fill:"#000000", fontSize:"16px"});

        this.mapButton=this.add.image(70, 300, "mapButton")
        .setInteractive()
        .on('pointerdown', ()=>this.goToMap());
        this.mapButton.setScale(0.6);

        //Add checkmark
        this.checkmark=new checkMarks(this, 30, 30);
        this.checkmark2=new checkMarks(this, 30, 51);
        this.checkmark3=new checkMarks(this, 30, 72);
        this.checkmark4=new checkMarks(this, 30, 93);
        this.checkmark5=new checkMarks(this, 30, 114); 

        //Make basket
        this.basket=this.physics.add.image(270,360,"basket");
        this.basket.setScale(0.5);

        //Make bowl
        this.bowl=new items(this, 200, 60, "bowl", 0.15, "No, es un bol");
        this.firework= new items(this, 320, 240, "firework", 0.15, "No, es un fuegos de artificio");
        this.greenBalloon=new items(this, 285, 60, "greenBalloon", 0.1, "No, es un globo verde");
        this.hat=new items(this, 230, 240, "hat", 0.15, "No, es un sombrero");
        this.plate=new items(this, 280, 140, "plate", 0.15, "No, es un plato");
        this.redBalloon=new items(this, 360, 140, "redBalloon", 0.1, "No, es un globo rojo");
        this.streamers=new items(this, 360, 60, "streamers", 0.15, "No, es una serpentina");
        this.utensils=new items(this, 195, 145, "utensils", 0.15, "No, es el utensilio");

        //Determine what happens when items enter basket
        this.input.on('pointerdown', this.startDrag, this);

        this.stuff=this.physics.add.group([this.bowl, this.utensils, this.firework, this.greenBalloon, this.streamers, this.redBalloon, this.hat, this.plate]);
        this.physics.add.overlap(this.basket, this.stuff, this.pick, undefined, this);
        
        
        //Make array for picked items
        this.picked=new Array();

        //Remove selected items and add checkmarks
        this.removeParty();
        this.addChecks();

        //Create incorrect item message
        this.message=this.add.bitmapText(222,322, "pixelFont", "SCORE ", 16);
        this.message.tint = 0xFF0000;
        this.message.setAlpha(0.0);
      }

    update(){
      //Check if they've gotten everything they need
      this.checkDone();
    }

    //Return to the map
    goToMap(){
        for (let index in this.picked){
          this.pickedList.push(this.picked[index]);
        }
        this.scene.start('mapScene', this.pickedList);
    }

    //Check if they're done the list
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

    //Figure out what happens when you add item to basket
    pick(basket,item){
      var dict = {bowl: "bowl", firework: "firework", greenBalloon: "greenBalloon", hat: "hat", plate: "plate", redBalloon: "redBalloon", streamers: "streamers", utensils: "utensils"};
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

    //Allow dragging of items
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
      
      //Remove items if they've been selected
      removeParty(){
        var parties = {"bowl": this.bowl, "firework": this.firework, "greenBalloon": this.greenBalloon, "hat": this.hat, "plate": this.plate, "redBalloon": this.redBalloon, "streamers": this.streamers, "utensils": this.utensils};
        for (let index in this.pickedList){
          for (let thing in parties){
            if (this.pickedList[index]==thing){
              parties[thing].disableBody(true,true);
            }
          }
        }
      }

      //Hide the message after a bit
      hideMess(){
        this.message.setAlpha(0.0);
      }

      //Add checkmarks if they're selected
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