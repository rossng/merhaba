import { dequal } from 'dequal';
import { Accessor, batch, Component, createEffect, createSignal, Signal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Results } from '../Results';

export type QuestionCard<TAnswer> = Component<{
  correctAnswer: Accessor<TAnswer>;
}>;

export type AnswerCard<TInput> = Component<{
  userAnswer: Signal<TInput>;
  correctAnswer: Accessor<unknown>;
}>;

export type CorrectionCard<TAnswer, TInput> = Component<{
  correctAnswer: Accessor<TAnswer>;
  userAnswer: Accessor<TInput>;
}>;

export type QuestionType<TAnswer, TInput> = {
  name: string;
  questionCard: QuestionCard<TAnswer>;
  answerCard: AnswerCard<TInput>;
  correctionCard: CorrectionCard<TAnswer, TInput>;
  initialUserAnswer: TInput;
  validateUserAnswer: (userAnswer: TInput) => boolean;
  generateQuestion: () => TAnswer;
  checkAnswer: (userAnswer: TInput, correctAnswer: TAnswer) => boolean;
};

export const Question = <TAnswer, TInput>({
  questionType,
  onQuestionCompleted,
  onQuestionAnswered,
  question,
}: {
  questionType: Accessor<QuestionType<TAnswer, TInput>>;
  question: Accessor<TAnswer>;
  onQuestionCompleted: () => void;
  onQuestionAnswered: (isCorrect: boolean) => void;
}) => {
  const [userAnswer, setUserAnswer] = createSignal<TInput>(questionType().initialUserAnswer);
  const [state, setState] = createSignal<'question' | 'answer'>('question');
  const validUserAnswer = () => questionType().validateUserAnswer(userAnswer());

  createEffect(() => {
    questionType();
    question();
    setUserAnswer(() => questionType().initialUserAnswer);
    setState('question');
  });

  function handleNext() {
    onQuestionCompleted();
  }

  const [nextButtonRef, setNextButtonRef] = createSignal<HTMLButtonElement>();

  function handleSubmit() {
    const isCorrect = questionType().checkAnswer(userAnswer(), question());

    if (isCorrect) {
      onQuestionAnswered(true);
      handleNext();
    } else {
      onQuestionAnswered(false);
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
    <>
      <div class="flex w-full flex-col items-center justify-between gap-8 md:h-10 md:flex-grow md:flex-row md:items-stretch">
        <div class="w-1/2 flex-1 text-2xl font-bold">
          <Dynamic component={questionType().questionCard} correctAnswer={question} />
        </div>
        <div class="w-1/2 flex-1" onKeyPress={handleKeyPress}>
          {state() === 'question' && (
            <Dynamic
              component={questionType().answerCard}
              correctAnswer={question}
              userAnswer={[userAnswer, setUserAnswer]}
            />
          )}
          {state() === 'answer' && (
            <Dynamic
              component={questionType().correctionCard}
              correctAnswer={question}
              userAnswer={userAnswer}
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
    </>
  );
};

export const QA = ({ questions }: { questions: QuestionType<any, any>[] }) => {
  const [results, setResults] = createSignal<boolean[]>([]);

  const [questionType, setQuestionType] = createSignal<QuestionType<unknown, unknown>>(
    questions[Math.floor(Math.random() * questions.length)]
  );
  const [question, setQuestion] = createSignal<unknown>(questionType().generateQuestion());

  return (
    <div class="flex w-full max-w-6xl flex-1 flex-col items-center gap-8 p-8 md:justify-center">
      <Question
        questionType={questionType}
        question={question}
        onQuestionAnswered={isCorrect => setResults([...results(), isCorrect])}
        onQuestionCompleted={() => {
          const newType = Math.floor(Math.random() * questions.length);
          batch(() => {
            setQuestionType(questions[newType]);
            let newQuestion = question();
            while (dequal(newQuestion, question())) {
              newQuestion = questions[newType].generateQuestion();
            }
            setQuestion(newQuestion);
          });
        }}
      />
      <Results results={results} />
    </div>
  );
};
