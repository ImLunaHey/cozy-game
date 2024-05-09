import dynamic from 'next/dynamic';

const Game = dynamic(() => import('../components/game'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Game />
    </main>
  );
}
