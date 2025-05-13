const accusativeNumbersTurkish: Record<number, string> = {
  1: 'biri',
  2: 'ikiyi',
  3: 'üçü',
  4: 'dördü',
  5: 'beşi',
  6: 'altıyı',
  7: 'yediyi',
  8: 'sekizi',
  9: 'dokuzu',
  10: 'onu',
  11: 'on biri',
  12: 'on ikiyi',
};

const dativeNumbersTurkish: Record<number, string> = {
  1: 'bire',
  2: 'ikiye',
  3: 'üçe',
  4: 'dörde',
  5: 'beşe',
  6: 'altıya',
  7: 'yediye',
  8: 'sekize',
  9: 'dokuza',
  10: 'ona',
  11: 'on bire',
  12: 'on ikiye',
};

const locativeNumbersTurkish: Record<number, string> = {
  1: 'birde',
  2: 'ikide',
  3: 'üçte',
  4: 'dörtte',
  5: 'beşte',
  6: 'altıda',
  7: 'yedide',
  8: 'sekizde',
  9: 'dokuzda',
  10: 'onda',
  11: 'on birde',
  12: 'on ikide',
};

const numbersTurkish: Record<number, string> = {
  1: 'bir',
  2: 'iki',
  3: 'üç',
  4: 'dört',
  5: 'beş',
  6: 'altı',
  7: 'yedi',
  8: 'sekiz',
  9: 'dokuz',
  10: 'on',
  11: 'on bir',
  12: 'on iki',
  13: 'on üç',
  14: 'on dört',
  15: 'on beş',
  16: 'on altı',
  17: 'on yedi',
  18: 'on sekiz',
  19: 'on dokuz',
  20: 'yirmi',
  21: 'yirmi bir',
  22: 'yirmi iki',
  23: 'yirmi üç',
  24: 'yirmi dört',
  25: 'yirmi beş',
  26: 'yirmi altı',
  27: 'yirmi yedi',
  28: 'yirmi sekiz',
  29: 'yirmi dokuz',
  30: 'otuz',
  31: 'otuz bir',
  32: 'otuz iki',
  33: 'otuz üç',
  34: 'otuz dört',
  35: 'otuz beş',
  36: 'otuz altı',
  37: 'otuz yedi',
  38: 'otuz sekiz',
  39: 'otuz dokuz',
  40: 'kırk',
  41: 'kırk bir',
  42: 'kırk iki',
  43: 'kırk üç',
  44: 'kırk dört',
  45: 'kırk beş',
  46: 'kırk altı',
  47: 'kırk yedi',
  48: 'kırk sekiz',
  49: 'kırk dokuz',
  50: 'elli',
  51: 'elli bir',
  52: 'elli iki',
  53: 'elli üç',
  54: 'elli dört',
  55: 'elli beş',
  56: 'elli altı',
  57: 'elli yedi',
  58: 'elli sekiz',
  59: 'elli dokuz',
  60: 'altmış',
};

// English equivalent: 4:30 -> half past four
export function clockTimeToTurkish(time: { hour: number; minute: number }): string {
  const hourText = numbersTurkish[time.hour];
  const accusativeHourText = accusativeNumbersTurkish[time.hour];
  const dativeHourText = dativeNumbersTurkish[(time.hour % 12) + 1];
  const minuteText = numbersTurkish[time.minute];
  const minuteToText = numbersTurkish[60 - time.minute];

  if (time.minute === 0) {
    return `saat ${hourText}`;
  } else if (time.minute === 15) {
    return `${accusativeHourText} çeyrek geçiyor`;
  } else if (time.minute === 30) {
    return `${hourText} buçuk`;
  } else if (time.minute === 45) {
    return `${dativeHourText} çeyrek var`;
  } else if (time.minute < 30) {
    return `${accusativeHourText} ${minuteText} geçiyor`;
  } else {
    return `${dativeHourText} ${minuteToText} var`;
  }
}

// English equivalent: 4:30 -> _at_ half past four
export function eventTimeToTurkish(time: { hour: number; minute: number }): string {
  const hourText = numbersTurkish[time.hour];
  const accusativeHourText = accusativeNumbersTurkish[time.hour];
  const dativeHourText = dativeNumbersTurkish[(time.hour % 12) + 1];
  const locativeHourText = locativeNumbersTurkish[time.hour];
  const minuteText = numbersTurkish[time.minute];
  const minuteToText = numbersTurkish[60 - time.minute];

  if (time.minute === 0) {
    return `saat ${locativeHourText}`;
  } else if (time.minute === 15) {
    return `${accusativeHourText} çeyrek geçe`;
  } else if (time.minute === 30) {
    return `${hourText} buçukta`;
  } else if (time.minute === 45) {
    return `${dativeHourText} çeyrek kala`;
  } else if (time.minute < 30) {
    return `${accusativeHourText} ${minuteText} geçe`;
  } else {
    return `${dativeHourText} ${minuteToText} kala`;
  }
}

export function generateRandomTime() {
  return {
    hour: Math.floor(Math.random() * 12) + 1,
    minute: Math.floor(Math.random() * 12) * 5,
  };
}
