"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

export default function Banner() {
  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-col items-center justify-center"
    >
      <div className="flex justify-center items-center flex-col w-full text-center gap-4">
        <motion.h1
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-2xl font-bold md:text-4xl lg:text-6xl"
        >
          QUILION <span>OLIVEIRA</span>
        </motion.h1>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex items-center justify-center gap-[6px] text-xl font-bold uppercase leading-[1] sm:justify-center md:text-2xl lg:text-4xl"
        >
          <span>Eu sou</span>
          <TypeAnimation
            sequence={[
              "Desenvolvedor",
              2000,
              "Front-End",
              2000,
              "Sua melhor escolha",
              2000,
            ]}
            speed={50}
            className="text-primary"
            wrapper="span"
            repeat={Infinity}
          />
        </motion.div>
      </div>
    </section>
  );
}
