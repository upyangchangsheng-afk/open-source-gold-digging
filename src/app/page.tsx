import Hero from '@/components/home/Hero';
import SceneFlow from '@/components/home/SceneFlow';
import SceneProjectBridge from '@/components/home/SceneProjectBridge';
import WeeklyPicks from '@/components/home/WeeklyPicks';
import CategoryEntry from '@/components/home/CategoryEntry';

export default function HomePage() {
  return (
    <div className="pb-12">
      <Hero />
      <SceneFlow />
      <SceneProjectBridge />
      <WeeklyPicks />
      <CategoryEntry />
    </div>
  );
}
