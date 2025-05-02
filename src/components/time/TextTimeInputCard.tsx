import { createEffect } from 'solid-js';
import { AnswerCard } from '../qa/QA';

const TURKISH_CHARS = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü'];

export const TextTimeInputCard: AnswerCard<{ hour: number; minute: number }, string> = ({
  userAnswer: [userAnswer, setUserAnswer],
}) => {
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    inputRef?.focus();
  });

  const insertChar = (char: string) => {
    if (!inputRef) return;

    const start = inputRef.selectionStart || 0;
    const end = inputRef.selectionEnd || 0;
    const currentValue = userAnswer();

    const newValue = currentValue.substring(0, start) + char + currentValue.substring(end);
    setUserAnswer(newValue);

    // Set cursor position after the inserted character
    setTimeout(() => {
      inputRef?.setSelectionRange(start + 1, start + 1);
      inputRef?.focus();
    }, 0);
  };

  return (
    <div class={`flex h-full flex-col items-center justify-center gap-4`}>
      <div class={`flex w-full items-center justify-center gap-4`}>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer()}
          onInput={e => setUserAnswer(e.currentTarget.value)}
          class={`w-full rounded border p-2 text-center`}
          placeholder="Saat"
        />
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        {TURKISH_CHARS.map(char => (
          <button
            type="button"
            onClick={() => insertChar(char)}
            class="rounded border bg-white px-3 py-1 text-lg hover:bg-gray-100 active:bg-gray-200"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
