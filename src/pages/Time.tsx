import { type Component } from 'solid-js';
import Header from '../components/Header';
import { QA, QuestionType } from '../components/qa/QA';
import { NumericTimeCorrectionCard } from '../components/time/NumericTimeCorrectionCard';
import { NumericTimeInputCard } from '../components/time/NumericTimeInputCard';
import TextTimeCard from '../components/time/TextTimeCard';
import { generateRandomTime } from '../time/time-utils';

/*
  TODO:
  - Inverse mode: get a numeric time, type the words
  - Enable/disable different time types (e.g. half past, to/past, morning/evening)
*/

const Time: Component = () => {
  const question: QuestionType<
    { hour: number; minute: number },
    { hour?: number; minute?: number }
  > = {
    name: 'text-to-time',
    questionCard: TextTimeCard,
    answerCard: NumericTimeInputCard,
    correctionCard: NumericTimeCorrectionCard,
    initialUserAnswer: { hour: undefined, minute: undefined },
    validateUserAnswer: userAnswer =>
      userAnswer.hour !== undefined &&
      userAnswer.hour >= 1 &&
      userAnswer.hour <= 12 &&
      userAnswer.minute !== undefined &&
      userAnswer.minute >= 0 &&
      userAnswer.minute <= 59,
    generateQuestion: () => generateRandomTime(),
  };

  return (
    <div class="flex h-screen flex-col items-center">
      <Header />
      <QA
        questions={[question]}
        header={
          <div class="flex flex-col items-center gap-0">
            <h2 class="text-2xl font-bold">Saat kaç?</h2>
            <p class="text-sm text-gray-500">What time is it?</p>
          </div>
        }
      />
    </div>
  );
};
export default Time;
