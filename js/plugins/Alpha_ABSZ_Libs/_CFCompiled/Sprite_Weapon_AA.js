// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Weapon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Weapon.prototype;
  // * Настройки анимации оружия для ABS карты
  //TODO: settings to user for each type (scale, dx, dy)
  _.aaSetDirection = function(direction) {
    this.scale.x = 0.7;
    this.scale.y = this.scale.x;
    this.x = this.y = 0;
    switch (direction) {
      case 6:
        this.x = 12;
        this.scale.x *= -1;
        break;
      case 4:
        this.x = -12;
        break;
      case 2:
        this.y = 0;
        break;
      default:
        this.y = -10;
    }
    // * Начало в прозрачности (небольшой эффект)
    //TODO: тоже опция
    this._aaOpChanger = new AA.Changer(this);
    this._aaOpChanger.change('opacity').from(60).to(255).step(20).speed(1);
    this._aaOpChanger.start().done(() => {
      return this._aaOpChanger = null;
    });
  };
})();

// ■ END Sprite_Weapon.coffee
//---------------------------------------------------------------------------