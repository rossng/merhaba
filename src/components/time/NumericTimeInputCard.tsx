import { createEffect, createSignal } from 'solid-js';
import { AnswerCard } from '../qa/QA';

const NumericTimeInputCard: AnswerCard<
  { hour: number; minute: number },
  { hour?: number; minute?: number }
> = ({ userAnswer: [, setUserAnswer], correctAnswer }) => {
  let hourInputRef: HTMLInputElement | undefined;

  const [userHour, setUserHour] = createSignal<string>('');
  const [userMinute, setUserMinute] = createSignal<string>('');

  createEffect(() => {
    correctAnswer();
    hourInputRef?.focus();
    setUserHour('');
    setUserMinute('');
  });

  const validHour = () =>
    Boolean(userHour().match(/^\d+$/)) && parseInt(userHour()) <= 12 && parseInt(userHour()) >= 1;

  const validMinute = () =>
    Boolean(userMinute().match(/^\d+$/)) &&
    parseInt(userMinute()) <= 59 &&
    parseInt(userMinute()) >= 0;

  createEffect(() => {
    if (validHour()) {
      setUserAnswer(prev => ({ ...prev, hour: parseInt(userHour()) }));
    } else {
      setUserAnswer(prev => ({ ...prev, hour: undefined }));
    }
  });

  createEffect(() => {
    if (validMinute()) {
      setUserAnswer(prev => ({ ...prev, minute: parseInt(userMinute()) }));
    } else {
      setUserAnswer(prev => ({ ...prev, minute: undefined }));
    }
  });

  return (
    <div class={`flex h-full flex-col items-center justify-center gap-4`}>
      <div class={`flex items-center justify-center gap-4`}>
        <input
          ref={hourInputRef}
          type="number"
          min="1"
          max="12"
          value={userHour()}
          onInput={e => setUserHour(e.currentTarget.value)}
          class={`${!validHour() && userHour() !== '' ? 'bg-red-200' : ''} w-24 rounded border p-2 text-center`}
          placeholder="Saat"
        />
        <span class="text-2xl">:</span>
        <input
          type="number"
          min="0"
          max="59"
          step="5"
          value={userMinute()}
          onInput={e => setUserMinute(e.currentTarget.value)}
          class={`${!validMinute() && userMinute() !== '' ? 'bg-red-200' : ''} w-24 rounded border p-2 text-center`}
          placeholder="Dakika"
        />
      </div>
    </div>
  );
};

export default NumericTimeInputCard;
