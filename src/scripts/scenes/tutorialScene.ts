import ExampleObject from '../objects/exampleObject';

export default class tutorialScene extends Phaser.Scene {
    private background: any;
    private paper: any;
    private banana: any;
    private basket: any;
    private abuela: any;
    private checkmark: any;
    private dragObj: any;
    private mapButton: any;

    constructor(){
        super({key: 'tutorialScene'});
    }

    create(){
        this.background=this.add.image(200, 200, "green");
        this.background.setScale(3.0);

        this.mapButton=this.add.image(70, 300, "mapButton")
        .setInteractive()
        .on('pointerdown', ()=>this.goToMap());
        this.mapButton.setScale(0.6);

        this.paper=this.add.image(70, 110, "paper");
        this.paper.setScale(1.2);
        this.add.text(20,10, "La Lista", {fill: "#000000", fontSize: "16px"});
        this.add.text(40, 30, "la banana", {fill: "#000000", fontSize: "16px"});

        this.banana=this.physics.add.image(250, 100, "banana");
        this.banana.setScale(0.4);
        this.banana.setInteractive();
        this.input.setDraggable(this.banana);
        this.input.on('pointerdown', this.startDrag, this);
        this.add.text(175, 25, "Drag the banana to the \nbasket to collect it!", {fill: "#000000", fontSize: "16px"});


        this.checkmark=this.add.image(30,30, "checkmark");
        this.checkmark.setScale(0.04);
        this.checkmark.setAlpha(0.0);

        this.basket=this.physics.add.image(270, 360, "basket");
        this.basket.setScale(0.5);

        this.physics.add.overlap(this.basket, this.banana, this.pick, undefined, this);
        
        
        this.abuela=this.add.image(200, 200, "abuelaBubble");
        this.abuela.setScale(0.5);
        this.abuela.setAlpha(1.0);
        this.time.addEvent({
            delay: 5000,
            callback: this.hideAbuela,
            callbackScope: this,
            loop: false
        });
    }

    update(){

    }

    hideAbuela(){
        this.abuela.setAlpha(0.0);
    }

    goToMap(){
        this.scene.start('mapScene', ["1", "false"]);
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

    pick(){
        this.banana.disableBody(true, true);
        this.checkmark.setAlpha(1.0);
        this.add.text(150, 250, "Nice job, the banana was \nchecked off the list!\nNow click the go to map \nbutton to get started!", {fill: "#000000", fontSize: "16px"});
    }
}