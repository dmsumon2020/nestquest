import Advertisement from "../../Components/Advertisement/Advertisement";
import Agents from "../../Components/Agents/Agents";
import CategoriesFromDb from "../../Components/CategoriesFromDb/CategoriesFromDb";
import FinestSelection from "../../Components/FinestSelection/FinestSelection";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import Reviews from "../../Components/Reviews/Reviews";

const Home = () => {
  return (
    <>
      <ImageSlider />
      <Advertisement />
      <FinestSelection />
      <CategoriesFromDb />
      <Agents />
      <Reviews />
    </>
  );
};

export default Home;
