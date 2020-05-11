export default class titleScene extends Phaser.Scene{

    private button: any;

    constructor(){
        super({key: 'titleScene'});
    }

    create(){
        //If they click anywhere it moves on to the tutorial
        this.button=this.add.image(this.scale.width/2, this.scale.height/2, "titleImage")
        .setInteractive()
        .on('pointerdown', ()=>this.goToTutorial());
        this.button.setScale(0.8);
    }

    goToTutorial(){
        this.scene.start('tutorialScene');
    }
}