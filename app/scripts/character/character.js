/**
 *  Generate the world.
 *  @constructor
 */
Pokemon.Character = function() {
  Pokemon.logger('');
  Pokemon.logger('Pokemon.Character');

  this.creationElement = null;
  this.isOpen = false;

  this.init();
};



/**
 *  Character creation init.
 */
Pokemon.Character.prototype.init = function() {
  Pokemon.logger('Character Creation initialised');

  this.creationElement = document.querySelector(
      Pokemon.configCharacter.CREATIONOVERLAY);

  this.addEventListeners();
};


/**
 *  Add event listeners.
 */
Pokemon.Character.prototype.addEventListeners = function() {
  var self = this;

  /* Add keyboard events */
  document.addEventListener('keyup', function(event) {

    /**
     *  Uncomment the next line, and hit random keys in the browser to see
     *  which number belongs to what key. C = 67, ESCAPE = 27, etc.
     */

    // console.log(event.keycode);

    /* Open the character creation module on the C key */
    if ((event.keyCode || event.which) === 67) {
      self.openCharacterCreation();
    }

    /* Close the character creation module on the ESCAPE key */
    if ((event.keyCode || event.which) === 27) {
      self.closeCharacterCreation();
    }
  }, false);
};


/**
 *  Reveal the character creation DOM.
 */
Pokemon.Character.prototype.openCharacterCreation = function() {
  if (this.isOpen) {
    return;
  }

  this.creationElement.classList.add('open');

  this.isOpen = true;
  Pokemon.logger('Opened character creation');
};


/**
 *  Hide the character creation DOM.
 */
Pokemon.Character.prototype.closeCharacterCreation = function() {
  if (!this.isOpen) {
    return;
  }

  this.creationElement.classList.remove('open');
  this.isOpen = false;
  Pokemon.logger('Closed character creation');
};
