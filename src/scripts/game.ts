import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import OtherScene from './scenes/otherScene';
import MapScene from './scenes/mapScene';
import PartyScene from './scenes/partyScene';
import FoodScene from './scenes/foodScene';

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
    scene: [PreloadScene, MainScene, OtherScene, MapScene, PartyScene, FoodScene],
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
