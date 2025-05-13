import { type Component } from 'solid-js';
import Header from '../components/Header';
import NounCaseCard from '../components/noun-case/NounCaseCard';
import NounCaseCorrectionCard from '../components/noun-case/NounCaseCorrectionCard';
import { QA, QuestionType } from '../components/qa/QA';
import TextInputCard from '../components/qa/TextInputCard';
import { checkNounCaseAnswer, generateNounCaseQuestion, NounCase } from '../questions/noun-case';

const Case: Component = () => {
  const question1: QuestionType<{ baseNoun: string; case: NounCase }, string> = {
    name: 'noun-case',
    questionCard: NounCaseCard,
    answerCard: TextInputCard('İsim'),
    correctionCard: NounCaseCorrectionCard,
    initialUserAnswer: '',
    validateUserAnswer: userAnswer => userAnswer.length > 0,
    generateQuestion: () => generateNounCaseQuestion(),
    checkAnswer: (userAnswer, correctAnswer) => checkNounCaseAnswer(userAnswer, correctAnswer),
  };

  return (
    <div class="flex h-screen flex-col items-center">
      <Header />
      <div class="flex flex-col items-center gap-0">
        <h2 class="text-2xl font-bold">İsim hâli</h2>
        <p class="text-sm text-gray-500">Noun case</p>
        <span class="mt-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
          Preview
        </span>
      </div>
      <QA questions={[question1]} />
    </div>
  );
};

export default Case;
