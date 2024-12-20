const { describe, it } = require('vitest');
const { expect } = require('chai');

// Függvények (tesztelendő példák)
const faktorialis = (n) => {
  if (n < 0) throw new Error("Negatív számra nincs faktoriális");
  return n === 0 ? 1 : n * faktorialis(n - 1);
};

const leghosszabbSzo = (mondat) => {
  if (!mondat.trim()) return "";
  return mondat
    .split(/\s+/)
    .reduce((leghosszabb, szo) => (szo.length > leghosszabb.length ? szo : leghosszabb), "");
};

const maganhangzokSzama = (szoveg) => {
  const maganhangzok = /[aeiouáéíóöőúüű]/gi;
  const talalatok = szoveg.match(maganhangzok);
  return talalatok ? talalatok.length : 0;
};

const reszhalmaz = (obj1, obj2) => {
  return Object.keys(obj1).every((kulcs) => obj2[kulcs] === obj1[kulcs]);
};

const kozosObjektumok = (tomb1, tomb2) => {
  return tomb1.filter((obj1) => tomb2.some((obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)));
};

// Tesztek

describe('faktorialis', () => {
  it('Pozitív egész számok', () => {
    expect(faktorialis(5)).to.equal(120);
    expect(faktorialis(3)).to.equal(6);
  });

  it('Nulla', () => {
    expect(faktorialis(0)).to.equal(1);
  });

  it('Negatív számok', () => {
    expect(() => faktorialis(-3)).to.throw("Negatív számra nincs faktoriális");
  });
});

describe('leghosszabbSzo', () => {
  it('Normál mondat', () => {
    expect(leghosszabbSzo("A gyors barna róka átugrik a lusta kutyán")).to.equal("átugrik");
  });

  it('Egy szavas mondat', () => {
    expect(leghosszabbSzo("Helló")).to.equal("Helló");
  });

  it('Üres mondat', () => {
    expect(leghosszabbSzo("")).to.equal("");
  });

  it('Mondat extra szóközökkel', () => {
    expect(leghosszabbSzo(" Egy gyors teszt ")).to.equal("gyors");
  });
});

describe('maganhangzokSzama', () => {
  it('Normál szöveg', () => {
    expect(maganhangzokSzama("Helló Világ")).to.equal(4);
  });

  it('Csak mássalhangzók', () => {
    expect(maganhangzokSzama("bcdfg")).to.equal(0);
  });

  it('Vegyes kis- és nagybetűk', () => {
    expect(maganhangzokSzama("ÁeIoÚ")).to.equal(5);
  });

  it('Üres szöveg', () => {
    expect(maganhangzokSzama("")).to.equal(0);
  });
});

describe('reszhalmaz', () => {
  it('Részhalmaz', () => {
    expect(reszhalmaz({ a: 1 }, { a: 1, b: 2 })).to.be.true;
  });

  it('Nem részhalmaz', () => {
    expect(reszhalmaz({ c: 3 }, { a: 1, b: 2 })).to.be.false;
  });
});

describe('kozosObjektumok', () => {
  it('Közös objektumok vannak', () => {
    expect(
      kozosObjektumok(
        [
          { id: 1, nev: 'Alice' },
          { id: 2, nev: 'Bob' }
        ],
        [
          { id: 2, nev: 'Bob' },
          { id: 3, nev: 'Charlie' }
        ]
      )
    ).to.deep.equal([{ id: 2, nev: 'Bob' }]);
  });

  it('Nincsenek közös objektumok', () => {
    expect(
      kozosObjektumok(
        [{ id: 1, nev: 'Alice' }],
        [{ id: 3, nev: 'Charlie' }]
      )
    ).to.deep.equal([]);
  });

  it('Üres tömbök', () => {
    expect(kozosObjektumok([], [])).to.deep.equal([]);
  });

  it('Egyik tömb üres', () => {
    expect(
      kozosObjektumok(
        [{ id: 1, nev: 'Alice' }],
        []
      )
    ).to.deep.equal([]);
  });
});
