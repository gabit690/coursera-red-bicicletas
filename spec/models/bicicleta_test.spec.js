var Bicicleta = require('./../../models/bicicleta');

beforeEach(() => {
  Bicicleta.allBicis = [];
});

describe("Bicicleta.allBicis", () => {
  it("Comienza vacía", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe("Bicicleta.add", () => {
  it("Agrega una bici", () => {
    expect(Bicicleta.allBicis.length).toBe(0);

    var a = new Bicicleta(1, 'rojo', 'urbana', [-34.618091, -58.366523]);
    Bicicleta.add(a);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);
  });
});

describe("Bicicleta.findById", () => {
  it("Debe devolver la bici con Id 1", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var aBici1 = new Bicicleta(1, 'verde', 'urbana');
    var aBici2 = new Bicicleta(2, 'roja', 'urbana');

    Bicicleta.add(aBici1);
    Bicicleta.add(aBici2);

    var targetBici = Bicicleta.findById(1);

    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe('verde');
    expect(targetBici.modelo).toBe('urbana');

  });
});

describe("Bicicleta.removeById", () => {
  it("Debe quitar la bici con Id 1", () => {
    expect(Bicicleta.allBicis.length).toBe(0);
    var aBici1 = new Bicicleta(1, 'verde', 'urbana');

    Bicicleta.add(aBici1);
    Bicicleta.removeById(1);

    expect(Bicicleta.allBicis.length).toBe(0);

  });
});