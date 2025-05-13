import { eventTimeToTurkish } from '../../questions/time-utils';
import { QuestionCard } from '../qa/QA';

const TextEventTimeCard: QuestionCard<{ hour: number; minute: number }> = ({ correctAnswer }) => {
  return (
    <div class={`flex h-full flex-col justify-center`}>
      <p class="text-center">{eventTimeToTurkish(correctAnswer())}</p>
    </div>
  );
};

export default TextEventTimeCard;
