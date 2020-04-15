import ExampleObject from '../objects/exampleObject';

export default class otherScene extends Phaser.Scene {

    private box: any;

    constructor() {
        super({ key: 'otherScene' });
    }

    init(data){
        console.log('init',data);
    }

    create(){
        this.box=this.add.image(100, 100, "checkmark");
    }

    update(){

    }


}