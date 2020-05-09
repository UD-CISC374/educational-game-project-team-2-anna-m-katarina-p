import 'phaser';
import MainScene from './scenes/clothingScene';
import PreloadScene from './scenes/preloadScene';
import MapScene from './scenes/mapScene';
import PartyScene from './scenes/partyScene';
import FoodScene from './scenes/foodScene';
import TutorialScene from './scenes/tutorialScene';
import TitleScene from './scenes/titleScene';

import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, MapScene, PartyScene, FoodScene, TutorialScene, TitleScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            //gravity: { y: 400 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
