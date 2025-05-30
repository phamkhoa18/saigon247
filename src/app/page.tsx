
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Contact from "@/components/home/Contact";
import ListTour from "@/components/home/ListTour";
import Testimonials from "@/components/home/Testimonials";
import Tour from "@/components/home/Tour";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <About />
        <Tour />
        <ListTour />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
