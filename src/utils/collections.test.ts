import { createDefaultObj } from './collections';

describe('DefaultObj', () => {
  it('works with integers', () => {
    const o = createDefaultObj(0);

    expect(o.a).toBe(0);
    expect(o.b).toBe(0);

    o.abc = 1;
    expect(o.abc).toBe(1);

    o.abc++;
    o.abc++;
    o.abc++;
    expect(o.abc).toBe(4);
  });

  it('works with arrays', () => {
    const o = createDefaultObj([]);

    o.a.push('a');
    o.b.push('b');
    o.c.push('c');

    // Can't use to equal because "o" is a Proxy and has additional properties
    expect(o).toMatchObject({
      a: ['a'],
      b: ['b'],
      c: ['c'],
    });
  });

  it('should create a new array for each new key', () => {
    const o = createDefaultObj([]);

    const a = o.a;
    const b = o.b;

    expect(a).toEqual([]);
    expect(b).toEqual([]);
    expect(a).toEqual(b);
    expect(a).not.toBe(b);
  });
});
