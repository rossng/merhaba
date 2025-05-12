import { type Component, createSignal } from 'solid-js';
import Header from '../components/Header';
import { QA, QuestionType } from '../components/qa/QA';
import NumericTimeCard from '../components/time/NumericTimeCard';
import { NumericTimeCorrectionCard } from '../components/time/NumericTimeCorrectionCard';
import { NumericTimeInputCard } from '../components/time/NumericTimeInputCard';
import TextEventTimeCard from '../components/time/TextEventTimeCard';
import TextTimeCard from '../components/time/TextTimeCard';
import { TextTimeCorrectionCard } from '../components/time/TextTimeCorrectionCard';
import { TextTimeInputCard } from '../components/time/TextTimeInputCard';
import { TimeTypePicker } from '../components/time/TimeTypePicker';
import { clockTimeToTurkish, eventTimeToTurkish, generateRandomTime } from '../time/time-utils';

/*
  TODO:
  - Inverse mode: get a numeric time, type the words
  - Enable/disable different time types (e.g. half past, to/past, morning/evening)
*/

const Time: Component = () => {
  const [selectedType, setSelectedType] = createSignal({
    id: 'what-time',
    title: 'Saat kaç?',
    subtitle: 'What time is it?',
  });

  const question1: QuestionType<
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
    checkAnswer: (userAnswer, correctAnswer) =>
      userAnswer.hour === correctAnswer.hour && userAnswer.minute === correctAnswer.minute,
  };

  const question2: QuestionType<{ hour: number; minute: number }, string> = {
    name: 'time-to-text',
    questionCard: NumericTimeCard,
    answerCard: TextTimeInputCard,
    correctionCard: TextTimeCorrectionCard,
    initialUserAnswer: '',
    validateUserAnswer: userAnswer => userAnswer.length > 0,
    generateQuestion: () => generateRandomTime(),
    checkAnswer: (userAnswer, correctAnswer) =>
      userAnswer.toLowerCase() === clockTimeToTurkish(correctAnswer).toLowerCase(),
  };

  const question3: QuestionType<
    { hour: number; minute: number },
    { hour?: number; minute?: number }
  > = {
    name: 'text-to-time',
    questionCard: TextEventTimeCard,
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
    checkAnswer: (userAnswer, correctAnswer) =>
      userAnswer.hour === correctAnswer.hour && userAnswer.minute === correctAnswer.minute,
  };

  const question4: QuestionType<{ hour: number; minute: number }, string> = {
    name: 'time-to-text',
    questionCard: NumericTimeCard,
    answerCard: TextTimeInputCard,
    correctionCard: TextTimeCorrectionCard,
    initialUserAnswer: '',
    validateUserAnswer: userAnswer => userAnswer.length > 0,
    generateQuestion: () => generateRandomTime(),
    checkAnswer: (userAnswer, correctAnswer) =>
      userAnswer.toLowerCase() === eventTimeToTurkish(correctAnswer).toLowerCase(),
  };

  return (
    <div class="flex h-screen flex-col items-center">
      <Header />
      <TimeTypePicker selectedType={selectedType()} onSelect={setSelectedType} />
      {selectedType().id === 'what-time' ? (
        <QA questions={[question1, question2]} />
      ) : (
        <QA questions={[question3, question4]} />
      )}
    </div>
  );
};
export default Time;
