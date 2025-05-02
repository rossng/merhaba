import { dequal } from 'dequal';
import { Accessor, Component, createSignal, JSX, Signal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Results } from '../Results';

export type QACard<TAnswer, TSettings> = Component<{
  correctAnswer: Accessor<TAnswer>;
  userAnswer: Signal<TAnswer>;
  settings: Accessor<TSettings>;
}>;

export type Question<TAnswer, TSettings> = {
  questionType: string;
  questionCard: QACard<TAnswer, TSettings>;
  answerCard: QACard<TAnswer, TSettings>;
  correctionCard: QACard<TAnswer, TSettings>;
  validateUserAnswer: (userAnswer: TAnswer) => boolean;
};

export const QA = <TAnswer, TSettings>({
  questions,
  settings,
  onNewQuestion,
  correctAnswer,
  initialUserAnswer,
  header,
}: {
  questions: Question<TAnswer, TSettings>[];
  settings: Accessor<TSettings>;
  onNewQuestion: () => void;
  correctAnswer: Accessor<TAnswer>;
  initialUserAnswer: TAnswer;
  header: JSX.Element;
}) => {
  const { questionCard, answerCard, correctionCard, validateUserAnswer } = questions[0];
  const [userAnswer, setUserAnswer] = createSignal<TAnswer>(initialUserAnswer);
  const [results, setResults] = createSignal<boolean[]>([]);
  const [state, setState] = createSignal<'question' | 'answer'>('question');
  const validUserAnswer = () => validateUserAnswer(userAnswer());

  function handleNext() {
    setUserAnswer(() => initialUserAnswer);
    setState('question');
    onNewQuestion();
  }

  const [nextButtonRef, setNextButtonRef] = createSignal<HTMLButtonElement>();

  function handleSubmit() {
    const isCorrect = dequal(userAnswer(), correctAnswer());

    if (isCorrect) {
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
    <div class="flex w-full max-w-6xl flex-1 flex-col items-center gap-8 p-8 md:justify-center">
      {header}
      <div class="flex w-full flex-col items-center justify-between gap-8 md:h-10 md:flex-grow md:flex-row md:items-stretch">
        <div class="w-1/2 flex-1 text-2xl font-bold">
          <Dynamic
            component={questionCard}
            correctAnswer={correctAnswer}
            userAnswer={[userAnswer, setUserAnswer]}
            settings={settings}
          />
        </div>
        <div class="w-1/2 flex-1" onKeyPress={handleKeyPress}>
          {state() === 'question' && (
            <Dynamic
              component={answerCard}
              correctAnswer={correctAnswer}
              userAnswer={[userAnswer, setUserAnswer]}
              settings={settings}
            />
          )}
          {state() === 'answer' && (
            <Dynamic
              component={correctionCard}
              correctAnswer={correctAnswer}
              userAnswer={[userAnswer, setUserAnswer]}
              settings={settings}
            />
          )}
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
  );
};
