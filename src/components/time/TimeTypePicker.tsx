import { Component, createSignal, Show } from 'solid-js';

type TimeType = {
  id: string;
  title: string;
  subtitle: string;
};

type TimeTypePickerProps = {
  selectedType: TimeType;
  onSelect: (type: TimeType) => void;
};

const timeTypes: TimeType[] = [
  {
    id: 'what-time',
    title: 'Saat kaç?',
    subtitle: 'What time is it?',
  },
  {
    id: 'at-what-time',
    title: 'Saat kaçta?',
    subtitle: 'At what time?',
  },
];

export const TimeTypePicker: Component<TimeTypePickerProps> = props => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="relative">
      <button
        onClick={() => setIsOpen(!isOpen())}
        class="mt-6 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 transition-colors hover:bg-gray-50"
      >
        <div class="flex flex-col items-center gap-0">
          <h2 class="text-2xl font-bold">{props.selectedType.title}</h2>
          <p class="text-sm text-gray-500">{props.selectedType.subtitle}</p>
        </div>
        <svg
          class={`h-5 w-5 text-gray-500 transition-transform ${isOpen() ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <Show when={isOpen()}>
        <div class="absolute top-full left-1/2 z-10 mt-2 w-max -translate-x-1/2 rounded-lg border border-gray-200 bg-white shadow-lg">
          {timeTypes.map(type => (
            <button
              onClick={() => {
                props.onSelect(type);
                setIsOpen(false);
              }}
              class="w-full px-4 py-2 text-left transition-colors hover:bg-gray-50"
            >
              <div class="flex flex-col items-center gap-0">
                <h2 class="text-2xl font-bold">{type.title}</h2>
                <p class="text-sm text-gray-500">{type.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </Show>
    </div>
  );
};
