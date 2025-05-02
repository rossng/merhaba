import { timeToTurkish } from '../../time/time-utils';
import { QACard } from '../qa/QA';

const TextTimeCard: QACard<
  { hour: number; minute: number },
  { hour?: number; minute?: number }
> = ({ correctAnswer }) => {
  return (
    <div class={`flex h-full flex-col justify-center`}>
      <p class="text-center">{timeToTurkish(correctAnswer())}</p>
    </div>
  );
};

export default TextTimeCard;
