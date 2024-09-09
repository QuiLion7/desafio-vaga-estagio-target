"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import ViewCode from "./view-code";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Contagem() {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isA = useCallback((char: string): boolean => {
    return ["a", "à", "á", "â", "ã"].includes(char.toLowerCase());
  }, []);

  const countAs = useCallback(
    (words: string): string => {
      const phrase = words.split("");
      const count = phrase.filter(isA).length;

      return count > 1
        ? `A letra "a" aparece ${count} vezes em "${words}".`
        : count === 1
        ? `A letra "a" aparece 1 vez em "${words}".`
        : `A letra "a" não aparece em "${words}"`;
    },
    [isA]
  );

  const handleCheck = useCallback(() => {
    if (inputValue.trim() === "") {
      setErrorMessage(
        "O campo de input está vazio. Por favor, insira uma frase."
      );
      return;
    }
    setErrorMessage("");

    const resultMessage = countAs(inputValue);
    setResult(resultMessage);
    setCountdown(5);
    setInputValue("");

    const clearResult = () => {
      setResult("");
    };

    const updateCountdown = () => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(updateInterval);
          clearResult();
        }
        return prev - 1;
      });
    };

    const timeoutId = setTimeout(clearResult, 5000);
    const updateInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(updateInterval);
    };
  }, [inputValue, countAs]);

  return (
    <section
      id="contagem"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4 md:px-6 md:py-0 pt-[55px] sm:pt-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row gap-6">
        <div className="flex h-auto w-full flex-1 flex-col items-center justify-center text-justify gap-2 order-1 sm:order-2">
          <motion.h3
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="text-sm tracking-wide md:text-base lg:text-lg"
          >
            2º Escreva um programa que verifique, em uma string, a existência da
            letra ‘a’, seja maiúscula ou minúscula, além de informar a
            quantidade de vezes em que ela ocorre.
          </motion.h3>
          <motion.div
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
          >
            <Separator className="bg-primary" />
          </motion.div>
          <motion.div
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center items-center flex-col gap-4 w-full"
          >
            <p className="flex-1 w-full text-sm tracking-wide md:text-base lg:text-lg">
              Digite uma frase e veja quantas vezes a letra {'"'}a{'"'} aparece
              nela.
            </p>
            <div className="flex justify-center items-center w-full gap-2">
              <Input
                type="text"
                placeholder="Digite uma frase"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setErrorMessage("");
                }}
                disabled={countdown > 0}
                className="rounded-xl focus:border-b-2 w-full"
              />
              {errorMessage && <p className="text-primary">{errorMessage}</p>}
              <Button
                className="w-full"
                onClick={handleCheck}
                disabled={countdown > 0}
              >
                {!result ? "Verificar" : countdown}
              </Button>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
          >
            <Separator className="bg-primary" />
          </motion.div>
          {result ? (
            <motion.p
              variants={fadeIn("top", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-4 text-sm tracking-wide md:text-base lg:text-lg"
            >
              {result}
            </motion.p>
          ) : (
            <motion.p
              variants={fadeIn("top", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-4 animate-pulse text-sm tracking-wide md:text-base lg:text-lg"
            >
              Aguardando...
            </motion.p>
          )}
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-2 md:flex-row order-2 sm:order-1">
          <motion.section
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex h-full w-full items-center justify-center"
          >
            <ViewCode
              codeString={`const isA = useCallback((char: string): boolean => {
    return ["a", "à", "á", "â", "ã"].includes(char.toLowerCase());
  }, []);

  const countAs = useCallback(
    (words: string): string => {
      const phrase = words.split("");
      const count = phrase.filter(isA).length;

      return count > 1
        ? A letra "a" aparece {count} vezes em "{words}".
        : count === 1
        ? A letra "a" aparece 1 vez em "{words}".
        : A letra "a" não aparece em "{words}";
    },
    [isA]
  );`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
