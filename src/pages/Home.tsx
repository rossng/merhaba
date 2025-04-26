import { A } from '@solidjs/router';
import type { Component } from 'solid-js';
import cardsImage from '../assets/cards.png';
import watchImage from '../assets/watch.png';
import Header from '../components/Header';

const Home: Component = () => {
  return (
    <div class="flex h-screen flex-col">
      <Header />
      <div class="h-2 flex-1 p-4">
        <div class="grid h-full w-full grid-cols-2 gap-4 md:grid-cols-4">
          <Card image={watchImage} title="Zaman" subheading="Time" link="/zaman" />
          {Array(7)
            .fill(0)
            .map(() => (
              <Card image={cardsImage} title="Coming soon" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

interface CardProps {
  image: string;
  alt?: string;
  title?: string;
  subheading?: string;
  link?: string;
}

const Card: Component<CardProps> = ({ image, alt, title, subheading, link }) => {
  const disabled = link ? '' : 'opacity-50 grayscale-50 cursor-not-allowed';
  return (
    <A
      href={link ?? ''}
      class={`flex flex-col items-center justify-center border-2 border-solid border-black ${disabled}`}
    >
      <img src={image} alt={alt} class={`max-h-40 w-auto`} />
      <h2 class="text-2xl font-bold">{title}</h2>
      {Boolean(subheading) && <p class="text-sm">{subheading}</p>}
    </A>
  );
};
