"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import ViewCode from "./view-code";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Fibonacci() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  const checkIsFibonacci = useCallback((num: number): string => {
    let a = 0;
    let b = 1;
    let next = 0;

    while (next < num) {
      next = a + b;
      a = b;
      b = next;
    }

    return next === num || num === 0
      ? `"${num}" pertence à sequência de Fibonacci.`
      : `"${num}" não pertence à sequência de Fibonacci.`;
  }, []);

  const handleCheck = useCallback(() => {
    if (inputValue > 0) {
      const resultMessage = checkIsFibonacci(inputValue);
      setResult(resultMessage);
      setCountdown(5);
      setInputValue(0);

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
    }
  }, [inputValue, checkIsFibonacci]);

  return (
    <section
      id="fibonacci"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4 md:px-6 md:py-0 pt-[55px] sm:pt-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row gap-6">
        <div className="flex h-auto w-full flex-1 flex-col items-center justify-center text-justify gap-2">
          <motion.h3
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="text-sm tracking-wide md:text-base lg:text-lg"
          >
            1º Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o
            próximo valor sempre será a soma dos 2 valores anteriores (exemplo:
            0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na
            linguagem que desejar onde, informado um número, ele calcule a
            sequência de Fibonacci e retorne uma mensagem avisando se o número
            informado pertence ou não a sequência.
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
              Digite um número e veja se ele pertence à sequência de Fibonacci
            </p>
            <div className="flex justify-center items-center w-full gap-2">
              <Input
                type="number"
                min={0}
                placeholder="Digite um Número"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value))}
                disabled={countdown > 0}
                className="rounded-xl focus:border-b-2 w-full text-center"
              />
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
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-2 md:flex-row">
          <motion.section
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex h-full w-full items-center justify-center"
          >
            <ViewCode
              codeString={`const checkIsFibonacci = useCallback((num: number): string => {
    let a = 0;
    let b = 1;
    let next = 0;

    while (next < num) {
      next = a + b;
      a = b;
      b = next;
    }

    return next === num || num === 0
      ? {num} pertence à sequência de Fibonacci.
      : {num}" não pertence à sequência de Fibonacci.;
  }, []);`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
