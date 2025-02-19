import Advertisement from "../../Components/Advertisement/Advertisement";
import Agents from "../../Components/Agents/Agents";
import CategoriesFromDb from "../../Components/CategoriesFromDb/CategoriesFromDb";
import FinestSelection from "../../Components/FinestSelection/FinestSelection";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import Reviews from "../../Components/Reviews/Reviews";
import SignUp from "../../Components/SignUp/SignUp";

const Home = () => {
  return (
    <>
      <ImageSlider />
      <Advertisement />
      <HowItWorks />
      <FinestSelection />
      <CategoriesFromDb />
      <Agents />
      <Reviews />
      <SignUp />
    </>
  );
};

export default Home;
