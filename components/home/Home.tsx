import AboutUs from "./AboutUs";
import Banner from "./Banner";
import BirthDayCake from "./BirthDayCake";
import HomeProduct2 from "./HomeProduct2";

function Home() {
  return (
    <div>
      <Banner />
      <div className="w-[1200px] max-w-full mx-auto">
        <BirthDayCake />
        <HomeProduct2 />
        <AboutUs />
      </div>
    </div>
  );
}

export default Home;
