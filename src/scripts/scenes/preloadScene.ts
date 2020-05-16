export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
  
    //title and tutorial
    this.load.image("abuelaBubble", "assets/images/abuelaBubble.png");
    this.load.image("titleImage", "assets/images/titleImage.png");
    this.load.image("basket","assets/images/basket.png");
    this.load.image("paper", "assets/images/paper.png");
    this.load.image("checkmark", "assets/images/checkmark.png");
    this.load.image("mapButton", "assets/images/mapB.png");
    this.load.image("yellowBackground", "assets/images/yellow.png");

    //map
    this.load.image("clothingStore", "assets/images/clothingStore.PNG");
    this.load.image("partyStore", "assets/images/partyStore.PNG");
    this.load.image("foodStore", "assets/images/foodStore.png");

    //clothes
    this.load.image("shirt", "assets/images/shirt.png");
    this.load.image("pants", "assets/images/pants.png");
    this.load.image("shoes", "assets/images/shoes.png");
    this.load.image("skirt", "assets/images/skirt.png");
    this.load.image("pjs", "assets/images/pjs.png");
    this.load.image("sweater", "assets/images/sweater.png");
    this.load.image("shorts", "assets/images/shorts.png");
    this.load.image("dress", "assets/images/dress.png");

    //food
    this.load.image("apple", "assets/images/apple.png");
    this.load.image("banana", "assets/images/banana.png");
    this.load.image("bread", "assets/images/bread.png");
    this.load.image("chips", "assets/images/chips.png");
    this.load.image("cookie", "assets/images/cookie.png");
    this.load.image("hotdog", "assets/images/hotdog.png");
    this.load.image("milk", "assets/images/milk.png");
    this.load.image("soda", "assets/images/soda.png");
    this.load.image("water", "assets/images/waterbottle.png");
    this.load.image("green", "assets/images/green.png");
    
    //party
    this.load.image("bowl", "assets/images/bowl.png");
    this.load.image("firework", "assets/images/firework.png");
    this.load.image("greenBalloon", "assets/images/green balloon.png");
    this.load.image("hat", "assets/images/hat.png");
    this.load.image("plate", "assets/images/plate.png");
    this.load.image("redBalloon", "assets/images/red balloon.png");
    this.load.image("streamers", "assets/images/streamers.png");
    this.load.image("utensils", "assets/images/utensils.png");
    this.load.image("blue", "assets/images/blue.png");

    //end
    this.load.image("finalPic","assets/images/finalPic.PNG");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  }

  create() {
    this.scene.start('titleScene');
  }
}
