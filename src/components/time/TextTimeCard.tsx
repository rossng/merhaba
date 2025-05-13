import { clockTimeToTurkish } from '../../questions/time-utils';
import { QuestionCard } from '../qa/QA';

const TextTimeCard: QuestionCard<{ hour: number; minute: number }> = ({ correctAnswer }) => {
  return (
    <div class={`flex h-full flex-col justify-center`}>
      <p class="text-center">{clockTimeToTurkish(correctAnswer())}</p>
    </div>
  );
};

export default TextTimeCard;
