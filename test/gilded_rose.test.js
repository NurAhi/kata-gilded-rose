const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it('Quality degrades once', () => {
    const gildedRose = new Shop([new Item("banana", 20, 5)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(4);
  })
  
  describe('Once the sell by date has passed', () =>{
    it('Quality degrades twice as fast', () => {
      const gildedRose = new Shop([new Item("banana", 0, 5)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].quality).toBe(3);
    })
  })

  it('Quality is never negative', () => {
    const gildedRose = new Shop([new Item("banana", 0, 1)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  })

  describe('when we have `Aged Brie`', () => {
    it('quality increses the older it gets', () => {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 5)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].name).toBe('Aged Brie');
      expect(items[0].quality).toBe(6);
    })

    it('the quality is never more than 50', () => {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(50);
    })
  
    it('sellIn decreses once', () => {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
    })
  })

  describe('when we have `Sulfuras`', () => {
    it('never has to be sold', () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 5)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
      expect(items[0].sellIn).toBe(10);
    })

    it('never decreses in quality', () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 5)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
      expect(items[0].quality).toBe(5);
    })

    
  })

  describe('when we have `Backstage passes`', () => {
    it('increses quality', () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].quality).toBe(6);
    })
   
    describe('sellIn is 10 or less', () => {
      it('increses quality in twice', () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5)]);
        const items = gildedRose.updateQuality();
        
        expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).toBe(7);
      })
    })
  
    describe('sellIn is 5 or less', () => {
      it('increses quality in 3', () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);
        const items = gildedRose.updateQuality();
        
        expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].quality).toBe(8);
      })
   
    })
    it('The quality drops to 0 after the concert', () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);
      const items = gildedRose.updateQuality();
      
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].quality).toBe(0);
    })
  })
});
