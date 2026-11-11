import { RouterProvider } from './navigation/RouterContext'
import { AppRouter } from './navigation/routes'
import { Header } from './components/Header';
import HeroSection from './components/HeroSection';
import RecentBlogs from './components/RecentBlogs';
import { Footer } from './components/Footer';


function App() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1c1917]">
      <Header />
      <HeroSection />
      <RecentBlogs />
      <Footer />
    </div>
  );
}

export default App;