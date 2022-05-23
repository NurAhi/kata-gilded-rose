class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const maximumQuality = 50;
const minimumQuality = 0;
const minimumSellIn = 0;

const degradeQuality = (item) => {
  if (item.quality > minimumQuality) {
    return (item.quality -= 1);
  }
};
const degradeSellIn = (item) => {
  if (!Sulfuras(item)) {
    return (item.sellIn -= 1);
  }
};

const upgradeQuality = (item) => {
  if (item.quality < maximumQuality) {
    return (item.quality += 1);
  }
};

const reduceQuality = (item) => {
  item.quality -= item.quality;
};

const Backstage = (item) => {
  return item.name === "Backstage passes to a TAFKAL80ETC concert";
};
const Brie = (item) => {
  return item.name === "Aged Brie";
};
const Sulfuras = (item) => {
  return item.name === "Sulfuras, Hand of Ragnaros";
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const items = this.items[i];
      const sellIn = items.sellIn;

      if (!Brie(items) && !Backstage(items)) {
        if (!Sulfuras(items)) {
          degradeQuality(items);
        }
      } else {
        upgradeQuality(items);
        if (Backstage(items)) {
          if (sellIn < 11) {
            upgradeQuality(items);
          }
          if (sellIn < 6) {
            upgradeQuality(items);
          }
        }
      }
      degradeSellIn(items);
      if (items.sellIn < minimumSellIn) {
        if (!Brie(items)) {
          !Backstage(items) && !Sulfuras(items)
            ? degradeQuality(items)
            : reduceQuality(items);
        } else {
          upgradeQuality(items);
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
