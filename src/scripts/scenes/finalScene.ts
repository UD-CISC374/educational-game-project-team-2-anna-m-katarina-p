export default class finalScene extends Phaser.Scene{
    private background: any;

    constructor(){
        super({key: 'finalScene'});
    }

    create(){
        this.background = this.add.image(200, 200, "finalPic");
        this.background.setScale(0.6);
        
        
    }

}