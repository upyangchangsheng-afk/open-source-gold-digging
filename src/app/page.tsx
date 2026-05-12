import Hero from '@/components/home/Hero';
import SceneFlow from '@/components/home/SceneFlow';
import WeeklyPicks from '@/components/home/WeeklyPicks';
import CategoryEntry from '@/components/home/CategoryEntry';

export default function HomePage() {
  return (
    <div className="pb-12">
      <Hero />
      <SceneFlow />
      <WeeklyPicks />
      <CategoryEntry />
    </div>
  );
}
