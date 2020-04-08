export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("shirt", "assets/images/shirt.png");
    this.load.image("pants", "assets/images/pants.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
