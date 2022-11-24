import * as utils from "..";


test('test "getFullDate" with correct and incorrect dates', () => {
    const data          = utils.getFullDate('2020-11-21T08:03:00Z');
    const incorrectData = utils.getFullDate('ddfd-11-21T08:03:00Z');

    expect(data).toBe('2020-11-21');
    expect(incorrectData).toBe('');
});

test('test "getRandomInt" in range [1, 5]', () => {
    const result = utils.getRandomInt(5, 1);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5);
});

test('test "getCorrectDate" with date 5 and 10', () => {
    const resultString = utils.getCorrectDate(5);
    const resultNumber = utils.getCorrectDate(10);

    expect(typeof resultString).toBe("string");
    expect(typeof resultNumber).toBe("number");
});

test('test "copyObj" with object { text: \'hello\' }', () => {
    const result = utils.copyObj({ text: 'hello' });

    expect(result).toEqual({ text: 'hello' });
});