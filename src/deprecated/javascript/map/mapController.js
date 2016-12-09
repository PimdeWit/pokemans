import {MAP_LOADED} from '../actions';
import Tile from './tile/tile.js';

const MapConfig = {
  TILESIZE: 64,
  TEXTURE_PATH: '/assets/data/maps/'
};

class MapController {
  constructor(canvas) {
    this.canvas = canvas;
    this.tileArray = [];
  }

  setCurrentMap(maptitle) {
    this.getMapData(maptitle);
  }

  getMapData(maptitle) {
    this.fetchMapJson(MapConfig.TEXTURE_PATH + maptitle + '.json')
      .then(mapData => this.createTileMap(mapData));
  }

  fetchMapJson(url) {
    return fetch(url)
      .then(function(response) {
        return response.json()
      })
  }

  createTileMap(mapData) {
    mapData.forEach(function(tileObject) {
      tileObject.width = MapConfig.TILESIZE;
      tileObject.height = MapConfig.TILESIZE;

      let tile = new Tile(this.canvas.stage, tileObject);
      this.tileArray.push(tile);
    }.bind(this));

    store.dispatch(MAP_LOADED);
  }

  get tiles() {
    return this.tileArray;
  }
}

export default MapController;
