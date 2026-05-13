import Hero from '../components/home/Hero';
import Marquee from '../components/ui/Marquee';
import ReelsSection from '../components/home/ReelsSection';
import NewArrivals from '../components/home/NewArrivals';
import EditorialStrip from '../components/home/EditorialStrip';
import Collections from '../components/home/Collections';
import BestSellers from '../components/home/BestSellers';
import StoryBanner from '../components/home/StoryBanner';
import Testimonials from '../components/home/Testimonials';
import InstagramFeed from '../components/home/InstagramFeed';

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ReelsSection />
      <NewArrivals />
      <EditorialStrip />
      <Collections />
      <BestSellers />
      <StoryBanner />
      <Testimonials />
      <InstagramFeed />
    </main>
  );
}
