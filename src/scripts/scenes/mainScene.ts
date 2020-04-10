import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
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

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.camisaX=40;
    this.paper=this.add.image(70, 110, "paper");
    this.paper.setScale(1.2);

    this.checkmark=this.add.image(30, 30, "checkmark");
    this.checkmark.setScale(0.04);
    this.checkmark.setAlpha(0.0);
    this.items = ["shirt", "shoes", "skirt"];
    this.add.text(15,5, "Shopping List:",{fill:"#000000", fontSize:"16px"});
    this.add.text(this.camisaX,30, "camisa",{fill:"#000000", fontSize:"16px"});
    this.add.text(40,50, "zapatos",{fill:"#000000", fontSize:"16px"});
    this.add.text(40,70, "falda",{fill:"#000000", fontSize:"16px"});

    this.basket=this.physics.add.image(150,300,"basket");
    this.basket.setScale(0.5);
    
    this.shirt=this.physics.add.image(150,60,"shirt");
    this.shirt.setScale(0.15);
    this.shirt.setInteractive();
    this.input.setDraggable(this.shirt);

    this.pants=this.physics.add.image(180, 200, "pants");
    this.pants.setScale(0.2);
    this.pants.setInteractive();
    this.input.setDraggable(this.pants);

    this.shoes=this.physics.add.image(245,60,"shoes");
    this.shoes.setScale(0.15);
    this.shoes.setInteractive();
    this.input.setDraggable(this.shoes);

    this.dress=this.physics.add.image(60,190,"dress");
    this.dress.setScale(0.2);
    this.dress.setInteractive();
    this.input.setDraggable(this.dress);

    this.shorts=this.physics.add.image(250,320,"shorts");
    this.shorts.setScale(0.2);
    this.shorts.setInteractive();
    this.input.setDraggable(this.shorts);

    this.pjs=this.physics.add.image(300,200,"pjs");
    this.pjs.setScale(0.25);
    this.pjs.setInteractive();
    this.input.setDraggable(this.pjs);

    this.skirt=this.physics.add.image(340,60,"skirt");
    this.skirt.setScale(0.12);
    this.skirt.setInteractive();
    this.input.setDraggable(this.pjs);

    this.sweater=this.physics.add.image(120,320,"sweater");
    this.sweater.setScale(0.2);
    this.sweater.setInteractive();
    this.input.setDraggable(this.sweater);


    this.input.on('pointerdown', this.startDrag, this);

    this.physics.add.overlap(this.basket, this.shirt, this.pick, undefined, this);
    this.physics.add.overlap(this.basket, this.skirt, this.pick, undefined, this);

    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
  }

  pick(basket,item){
    if (item == this.shirt){
      this.word = "shirt";
      if (this.items.indexOf(this.word) != -1){
        this.shirt.disableBody(true,true);
        this.checkmark.setAlpha(1.0);
      }
    }

    if (item == this.skirt){
      this.word = "skirt";
      if (this.items.indexOf(this.word) != -1){
        this.skirt.disableBody(true,true);
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
