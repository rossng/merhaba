import { QuestionCard } from '../qa/QA';

const NumericTimeCard: QuestionCard<{ hour: number; minute: number }> = ({ correctAnswer }) => {
  return (
    <div class={`flex h-full flex-col items-center justify-center gap-4`}>
      <div class={`flex items-center justify-center gap-4`}>
        <div class={`w-24 rounded border p-2 text-center`}>{correctAnswer().hour}</div>
        <span class="text-2xl">:</span>
        <div class={`w-24 rounded border p-2 text-center`}>
          {correctAnswer().minute < 10 ? `0${correctAnswer().minute}` : correctAnswer().minute}
        </div>
      </div>
    </div>
  );
};

export default NumericTimeCard;
