import { getNounInCase, NounCase } from '../../questions/noun-case';
import { CorrectionCard } from '../qa/QA';

const NounCaseCorrectionCard: CorrectionCard<{ baseNoun: string; case: NounCase }, string> = ({
  userAnswer,
  correctAnswer,
}) => {
  return (
    <div class={`flex h-full flex-col items-center justify-center gap-4`}>
      <input
        type="text"
        value={userAnswer()}
        disabled={true}
        class={`w-full rounded border bg-gray-200 p-2 text-center`}
      />

      <div class={`flex items-center justify-center gap-4 font-bold text-red-500`}>
        {getNounInCase(correctAnswer().baseNoun, correctAnswer().case)}
      </div>
    </div>
  );
};

export default NounCaseCorrectionCard;
