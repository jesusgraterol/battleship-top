/* eslint-disable no-undef */
import Utilities from './utilities';

/**
 * Coordinates Management
 * Tests that cover the encoding, decoding and identification of coordinates.
 */
describe('Coordinates Management', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can encode a given coordinate', () => {
    expect(Utilities.encodeCoordinate(0, 5)).toBe('r0_c5');
    expect(Utilities.encodeCoordinate(7, 2)).toBe('r7_c2');
  });

  test('can decode a given coordinate', () => {
    expect(Utilities.decodeCoordinate('r0_c5')).toStrictEqual({ row: 0, column: 5 });
    expect(Utilities.decodeCoordinate('r7_c2')).toStrictEqual({ row: 7, column: 2 });
  });

  test('can throw an error if a coordinate is invalid prior to decoding it', () => {
    expect(() => Utilities.decodeCoordinate('r0-c5')).toThrow(/^The provided coordinate string is invalid and therefore it cannot be decoded.$/);
  });

  test('can verify if a given string is a coordinate', () => {
    expect(Utilities.isCoordinate('r0_c5')).toBe(true);
    expect(Utilities.isCoordinate('r0-c5')).toBe(false);
    expect(Utilities.isCoordinate('r,acome')).toBe(false);
  });
});

/**
 * Random Generators
 * Tests that cover the generation of random values such as numbers and booleans.
 */
describe('Random Generators', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  /* ************************
   * Random Numeric Values  *
   ************************ */

  test('can generate a random integer respecting the given range (1)', () => {
    const randomInt = Utilities.generateRandomInt(0, 9);
    expect(randomInt).toBeGreaterThanOrEqual(0);
    expect(randomInt).toBeLessThanOrEqual(9);
    expect(Number.isInteger(randomInt)).toBeTruthy();
  });

  test('can generate a random integer respecting the given range (2)', () => {
    const randomInt = Utilities.generateRandomInt(1000, 2000);
    expect(randomInt).toBeGreaterThanOrEqual(1000);
    expect(randomInt).toBeLessThanOrEqual(2000);
    expect(Number.isInteger(randomInt)).toBeTruthy();
  });

  /* ************************
   * Random Boolean Values  *
   ************************ */

  test('can generate a random boolean', () => {
    let trueCount = 0;
    let falseCount = 0;
    for (let i = 0; i < 100; i += 1) {
      const randomBool = Utilities.generateRandomBoolean();
      expect(typeof randomBool).toBe('boolean');
      if (randomBool) {
        trueCount += 1;
      } else {
        falseCount += 1;
      }
    }
    expect(trueCount).toBeGreaterThan(0);
    expect(falseCount).toBeGreaterThan(0);
  });
});
