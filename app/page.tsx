import Banner from "@/components/banner";
import Nav from "@/components/nav";
import Contact from "@/components/contact";
import Fibonacci from "@/components/fibonacci";
import Contagem from "@/components/contagem";
import Soma from "@/components/soma";
import Logica from "@/components/logica";
import Interruptor from "@/components/interruptor";

export default function Home() {
  return (
    <div className="w-full h-full overflow-x-primary">
      <Nav />
      <Banner />
      <Fibonacci />
      <Contagem />
      <Soma />
      <Logica />
      <Interruptor />
      <Contact />
    </div>
  );
}
