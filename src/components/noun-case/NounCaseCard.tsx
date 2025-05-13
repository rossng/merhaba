import { NounCase, nounCaseToTurkish } from '../../questions/noun-case';
import { QuestionCard } from '../qa/QA';

const NounCaseCard: QuestionCard<{ baseNoun: string; case: NounCase }> = ({ correctAnswer }) => {
  return (
    <div class={`flex h-full flex-col justify-center`}>
      <p class="text-center">
        {correctAnswer().baseNoun}{' '}
        <span class="text-gray-500" title={correctAnswer().case}>
          ({nounCaseToTurkish(correctAnswer().case)})
        </span>
      </p>
    </div>
  );
};

export default NounCaseCard;
