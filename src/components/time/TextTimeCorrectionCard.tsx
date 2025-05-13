import { clockTimeToTurkish } from '../../questions/time-utils';
import { CorrectionCard } from '../qa/QA';

const TextTimeCorrectionCard: CorrectionCard<{ hour: number; minute: number }, string> = ({
  userAnswer,
  correctAnswer,
}) => {
  return (
    <div class={`flex h-full flex-col items-center justify-center gap-4`}>
      <div class={`flex w-full items-center justify-center gap-4`}>
        <input
          type="text"
          value={userAnswer()}
          class={`w-full rounded border p-2 text-center`}
          disabled={true}
          placeholder="Saat"
        />
      </div>

      <div class={`flex w-full items-center justify-center gap-4 font-bold text-red-500`}>
        <input
          value={clockTimeToTurkish(correctAnswer())}
          disabled={true}
          class={`w-full rounded border p-2 text-center`}
        />
      </div>
    </div>
  );
};

export default TextTimeCorrectionCard;
