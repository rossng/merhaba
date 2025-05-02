import { CorrectionCard } from '../qa/QA';

export const NumericTimeCorrectionCard: CorrectionCard<
  { hour: number; minute: number },
  { hour?: number; minute?: number }
> = ({ userAnswer, correctAnswer }) => {
  return (
    <div class={`flex h-full flex-col items-center justify-center gap-4`}>
      <div class={`flex items-center justify-center gap-4`}>
        <input
          type="number"
          value={userAnswer().hour}
          disabled={true}
          class={`w-24 rounded border bg-gray-200 p-2 text-center`}
        />
        <span class="text-2xl">:</span>
        <input
          type="number"
          value={userAnswer().minute}
          disabled={true}
          class={`w-24 rounded border bg-gray-200 p-2 text-center`}
        />
      </div>

      <div class={`flex items-center justify-center gap-4 font-bold text-red-500`}>
        <input
          value={correctAnswer().hour}
          disabled={true}
          class={`w-24 rounded border p-2 text-center`}
        />
        <span class="text-2xl">:</span>
        <input
          value={correctAnswer().minute.toString().padStart(2, '0')}
          disabled={true}
          class={`w-24 rounded border p-2 text-center`}
        />
      </div>
    </div>
  );
};
