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
  private dragObj: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.shirt=this.physics.add.image(60,60,"shirt");
    this.shirt.setScale(0.18);
    this.shirt.setInteractive();
    this.input.setDraggable(this.shirt);

    this.pants=this.physics.add.image(180, 200, "pants");
    this.pants.setScale(0.2);
    this.pants.setInteractive();
    this.input.setDraggable(this.pants);

    this.shoes=this.physics.add.image(190,60,"shoes");
    this.shoes.setScale(0.18);
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

    this.skirt=this.physics.add.image(300,60,"skirt");
    this.skirt.setScale(0.2);
    this.skirt.setInteractive();
    this.input.setDraggable(this.pjs);

    this.sweater=this.physics.add.image(120,320,"sweater");
    this.sweater.setScale(0.2);
    this.sweater.setInteractive();
    this.input.setDraggable(this.sweater);


    this.input.on('pointerdown', this.startDrag, this);



    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
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
