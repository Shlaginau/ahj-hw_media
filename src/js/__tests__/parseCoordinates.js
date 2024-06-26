import parseCoordinates from '../coordinates';

describe('parseCoordinates', () => {
  test('должен корректно обрабатывать координаты с пробелом', () => {
    const input = '51.50851, −0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('должен корректно обрабатывать координаты без пробела', () => {
    const input = '51.50851,−0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('должен корректно обрабатывать координаты в квадратных скобках', () => {
    const input = '[51.50851, −0.12572]';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('должен генерировать исключение для неправильного формата', () => {
    const input = 'неправильный формат';
    expect(() => parseCoordinates(input)).toThrow('Неправильный формат координат');
  });
});

/* import parseCoordinates from '../coordinates';

describe('parseCoordinates', () => {
  test('должен корректно обрабатывать координаты с пробелом', () => {
    const input = '51.50851, −0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('должен корректно обрабатывать координаты без пробела', () => {
    const input = '51.50851,−0.12572';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('должен корректно обрабатывать координаты в квадратных скобках', () => {
    const input = '[51.50851, −0.12572]';
    const result = parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('должен генерировать исключение для неправильного формата', () => {
    const input = 'неправильный формат';
    expect(() => parseCoordinates(input)).toThrow('Неправильный формат координат');
  });
}); */
