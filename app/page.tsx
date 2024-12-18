import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent/MainContent";

export default function Home() {
  return (
    <main className="h-full">
      <div className="flex h-full">
        <div className="flex-[1] h-full">
          <Navbar />
        </div>
        <div className="flex-[6] bg-backgroundColor h-full">
          <MainContent />
        </div>
      </div>
    </main>
  );
}
