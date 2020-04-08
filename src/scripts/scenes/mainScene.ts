import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private shirt: any;
  private pants: any;
  private dragObj: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.shirt=this.physics.add.image(100,100,"shirt");
    this.shirt.setScale(0.2);
    this.shirt.setInteractive();
    this.input.setDraggable(this.shirt);

    this.pants=this.physics.add.image(200, 200, "pants");
    this.pants.setScale(0.2);
    this.pants.setInteractive();
    this.input.setDraggable(this.pants);
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
