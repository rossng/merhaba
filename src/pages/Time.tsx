import { Accessor, createEffect, createSignal, Signal, type Component } from 'solid-js';
import Header from '../components/Header';
import { Results } from '../components/Results';
import { generateRandomTime, timeToTurkish } from '../time/time-utils';

/*
  TODO:
  - Inverse mode: get a numeric time, type the words
  - Enable/disable different time types (e.g. half past, to/past, morning/evening)
*/

const Time: Component = () => {
  const [currentTime, setCurrentTime] = createSignal<{ hour: number; minute: number }>(
    generateRandomTime()
  );
  const [userAnswer, setUserAnswer] = createSignal<{ hour: string; minute: string }>({
    hour: '',
    minute: '',
  });

  const [results, setResults] = createSignal<boolean[]>([]);

  const validUserAnswer = () =>
    Boolean(userAnswer().hour.match(/^\d+$/) && userAnswer().minute.match(/^\d+$/));

  const [state, setState] = createSignal<'question' | 'answer'>('question');

  function handleNext() {
    setCurrentTime(generateRandomTime());
    setUserAnswer({ hour: '', minute: '' });
    setState('question');
  }

  const [nextButtonRef, setNextButtonRef] = createSignal<HTMLButtonElement>();

  function handleSubmit() {
    const userHour = parseInt(userAnswer().hour);
    const userMinute = parseInt(userAnswer().minute);

    if (userHour === currentTime().hour && userMinute === currentTime().minute) {
      setResults([...results(), true]);
      handleNext();
    } else {
      setResults([...results(), false]);
      setState('answer');
      nextButtonRef()?.focus();
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (state() === 'question' && validUserAnswer()) {
        handleSubmit();
      } else if (state() === 'answer') {
        handleNext();
      }
    }
  };

  return (
    <div class="flex h-screen flex-col items-center">
      <Header />
      <div class="flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 p-8">
        <div class="flex flex-col items-center gap-0">
          <h2 class="text-2xl font-bold">Saat kaç?</h2>
          <p class="text-sm text-gray-500">What time is it?</p>
        </div>
        <div class="flex h-10 w-full flex-grow items-stretch justify-between gap-8">
          <div class="w-1/2 flex-1 text-2xl font-bold">
            <LeftCard currentTime={currentTime} className="h-full" />
          </div>
          <div class="w-1/2 flex-1" onKeyPress={handleKeyPress}>
            <RightCard
              userAnswer={[userAnswer, setUserAnswer]}
              state={[state, setState]}
              currentTime={currentTime}
              className="h-full"
            />
          </div>
        </div>
        {state() === 'question' && (
          <button
            onClick={handleSubmit}
            class="flex flex-row items-center justify-between gap-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400 disabled:hover:bg-gray-400"
            disabled={!validUserAnswer()}
          >
            <span>Check</span> <span class="text-sm opacity-50">⏎</span>
          </button>
        )}
        {state() === 'answer' && (
          <button
            ref={setNextButtonRef}
            onClick={handleNext}
            class="flex flex-row items-center justify-between gap-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <span>Next</span> <span class="text-sm opacity-50">⏎</span>
          </button>
        )}
        <Results results={results} />
      </div>
    </div>
  );
};
export default Time;

const LeftCard: Component<{
  currentTime: Accessor<{ hour: number; minute: number }>;
  className?: string;
}> = ({ currentTime, className }) => {
  return (
    <div class={`flex flex-col justify-center ${className}`}>
      <p class="text-center">{timeToTurkish(currentTime())}</p>
    </div>
  );
};

const RightCard: Component<{
  userAnswer: Signal<{ hour: string; minute: string }>;
  state: Signal<'question' | 'answer'>;
  currentTime: Accessor<{ hour: number; minute: number }>;
  className?: string;
}> = ({ userAnswer: [userAnswer, setUserAnswer], state: [state], currentTime, className }) => {
  const disabled = () => state() === 'answer';
  let hourInputRef: HTMLInputElement | undefined;

  // Focus the hour input when the state changes to question
  createEffect(() => {
    currentTime();
    if (state() === 'question' && hourInputRef) {
      hourInputRef.focus();
    }
  });

  return (
    <div class={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div class={`flex items-center justify-center gap-4`}>
        <input
          ref={hourInputRef}
          type="number"
          min="1"
          max="12"
          value={userAnswer().hour}
          onInput={e => setUserAnswer({ ...userAnswer(), hour: e.currentTarget.value })}
          disabled={disabled()}
          class={`${disabled() ? 'bg-gray-200' : ''} w-24 rounded border p-2 text-center`}
          placeholder="Saat"
        />
        <span class="text-2xl">:</span>
        <input
          type="number"
          min="0"
          max="59"
          step="5"
          value={userAnswer().minute}
          onInput={e => setUserAnswer({ ...userAnswer(), minute: e.currentTarget.value })}
          disabled={disabled()}
          class={`${disabled() ? 'bg-gray-200' : ''} w-24 rounded border p-2 text-center`}
          placeholder="Dakika"
        />
      </div>

      {state() === 'answer' && (
        <div class={`flex items-center justify-center gap-4 font-bold text-red-500`}>
          <input
            value={currentTime().hour}
            disabled={true}
            class={`w-24 rounded border p-2 text-center`}
          />
          <span class="text-2xl">:</span>
          <input
            value={currentTime().minute.toString().padStart(2, '0')}
            disabled={true}
            class={`w-24 rounded border p-2 text-center`}
          />
        </div>
      )}
    </div>
  );
};
