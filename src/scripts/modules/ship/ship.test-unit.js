import Utilities from '../utilities';
import Ship from './ship';

describe('Ship Essentials', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can create a valid ship', () => {
    const ship1 = new Ship(3);
    expect(Utilities.validateID(ship1.id)).toBe(true);
    expect(ship1.length).toBe(3);
    expect(ship1.isSunk()).toBe(false);
  });

  test('can create any number of ships of different sizes', () => {
    const ship1 = new Ship(4);
    expect(ship1.length).toBe(4);
    expect(ship1.isSunk()).toBe(false);

    const ship2 = new Ship(2);
    expect(ship2.length).toBe(2);
    expect(ship2.isSunk()).toBe(false);
  });

  test('can create ships and hit them until they sink', () => {
    const ship1 = new Ship(4);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);

    const ship2 = new Ship(2);
    ship2.hit();
    expect(ship2.isSunk()).toBe(false);
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
  });

  test('a ship that has been sunk cannot be hit again', () => {
    const ship1 = new Ship(2);
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
    expect(() => ship1.hit()).toThrow(/already sunk/);
    expect(() => ship1.hit()).toThrow(/^The ship cannot be hit again as it has already sunk.$/);
    expect(() => ship1.hit()).toThrow(new Error('The ship cannot be hit again as it has already sunk.'));
  });
});
