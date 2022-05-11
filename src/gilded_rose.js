class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const maximumQuality = 50;
const minimumQuality = 0;
const minimumSellIn = 0;
const Backstage = 'Backstage passes to a TAFKAL80ETC concert'
const Brie = 'Aged Brie'
const Sulfuras = 'Sulfuras, Hand of Ragnaros'

const degradeQuality = (item) => {
  return  item.quality = item.quality - 1;
}
const degradeSellIn = (item) => {
  return  item.sellIn = item.sellIn - 1;
}


const upgradeQuality = (item) => {
  return  item.quality = item.quality + 1;
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      const name = this.items[i].name;
      const quality = this.items[i].quality;
      const sellIn = this.items[i].sellIn;

      if (name != Brie && name != Backstage) {
       if(quality > minimumQuality && name != Sulfuras){
            degradeQuality(this.items[i])
          }
        }
       else {
        if (quality < maximumQuality) {
          upgradeQuality(this.items[i]);
          if (name == Backstage) {
            if (sellIn < 11 && quality < maximumQuality) {
                upgradeQuality(this.items[i])
            }
            if (sellIn < 6 && quality < maximumQuality) {
                upgradeQuality(this.items[i]);
            }
          }
        }
      }
      if (name != Sulfuras) {
        degradeSellIn(this.items[i])      }
      if (this.items[i].sellIn < minimumSellIn ) {
        if (name != Brie) {
        name != Backstage && this.items[i].quality > 0 && name != Sulfuras ? degradeQuality(this.items[i]) :  this.items[i].quality = this.items[i].quality - this.items[i].quality;
        } else {
          if (quality < maximumQuality) {
            upgradeQuality(this.items[i]);
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
