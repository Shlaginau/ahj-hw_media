export default function parseCoordinates(input) {
  // Удаляем квадратные скобки, если они есть, и пробелы
  const cleanedInput = input.replace(/[[\]\s]/g, '').replace(/−/g, '-');
  const parts = cleanedInput.split(',');

  if (parts.length !== 2 || Number.isNaN(Number(parts[0])) || Number.isNaN(Number(parts[1]))) {
    throw new Error('Неправильный формат координат');
  }

  return {
    latitude: parseFloat(parts[0]),
    longitude: parseFloat(parts[1]),
  };
}

/* export default function parseCoordinates(input) {
  const cleanedInput = input.replace(/[[]\s]/g, '').replace(/−/g, '-');
  const parts = cleanedInput.split(',');

  if (parts.length !== 2 || Number.isNaN(Number(parts[0])) || Number.isNaN(Number(parts[1]))) {
    throw new Error('Неправильный формат координат');
  }
  return {
    latitude: parseFloat(parts[0]),
    longitude: parseFloat(parts[1]),
  };
} */
