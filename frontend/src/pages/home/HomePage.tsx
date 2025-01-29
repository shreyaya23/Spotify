import Topbar from "@/components/Topbar.tsx"
import { useMusicStore } from "@/stores/useMusicStore.ts"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import SectionGrid from "./components/SectionGrid.tsx";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";



const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,

  } = useMusicStore();

  const {initializeQueue} = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md overflow-hidden">
    <Topbar/>
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Aternoon</h1>
        <FeaturedSection/>
      

      <div className="space-y-8">
      <SectionGrid title="Made for you" songs={madeForYouSongs} isLoading={isLoading}/>
       <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
      </div>
      </div>

    </ScrollArea>
    </main>
  )
}

export default HomePage
