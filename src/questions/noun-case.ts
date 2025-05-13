export const nounCases = ['nominative', 'accusative', 'dative', 'locative', 'ablative'] as const;
export type NounCase = (typeof nounCases)[number];

type NounDatum = {
  [key in NounCase]: string;
};

const nounData: Map<string, NounDatum> = new Map([
  [
    'kitap',
    {
      nominative: 'kitap',
      accusative: 'kitabı',
      dative: 'kitaba',
      locative: 'kitapta',
      ablative: 'kitaptan',
    },
  ],
]);

export function generateNounCaseQuestion(): { baseNoun: string; case: NounCase } {
  const baseNoun = randomNoun();
  const nounCase = randomCase();
  return { baseNoun, case: nounCase };
}

function randomNoun(): string {
  const nouns = Array.from(nounData.keys());
  return nouns[Math.floor(Math.random() * nouns.length)];
}

function randomCase(): NounCase {
  return nounCases[Math.floor(Math.random() * nounCases.length)];
}

export function getNounInCase(noun: string, nounCase: NounCase): string | undefined {
  return nounData.get(noun)?.[nounCase];
}

export function nounCaseToTurkish(nounCase: NounCase): string {
  switch (nounCase) {
    case 'nominative':
      return 'yalın hâl';
    case 'accusative':
      return 'belirtme hâli';
    case 'dative':
      return 'yönelme hâli';
    case 'locative':
      return 'bulunma hâli';
    case 'ablative':
      return 'ayrılma hâli';
  }
}

export function checkNounCaseAnswer(
  userAnswer: string,
  correctAnswer: { baseNoun: string; case: NounCase }
): boolean {
  const correctCase = nounData.get(correctAnswer.baseNoun)?.[correctAnswer.case];
  return userAnswer.toLowerCase() === correctCase?.toLowerCase();
}
