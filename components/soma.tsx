"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import ViewCode from "./view-code";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Soma() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  const calculateSum = useCallback((n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }, []);

  const handleCalculate = useCallback(() => {
    if (inputValue >= 2) {
      const sum = calculateSum(inputValue);
      const resultMessage = `O valor da variável SOMA ao final do processamento é ${sum}.`;

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
  }, [inputValue, calculateSum]);

  return (
    <section
      id="soma"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4 md:px-6 md:py-0 pt-[55px] sm:pt-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row gap-6">
        <div className="flex h-auto w-full flex-1 flex-col items-center justify-center text-justify gap-2">
          <motion.h3
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="text-sm tracking-wide md:text-base lg:text-lg w-full"
          >
            3º Observe o trecho de código abaixo: <br />
            <code>
              int INDICE = {'"'}número escolhido{'"'}, SOMA = 0, K = 1;
            </code>{" "}
            <br />
            enquanto <code>K {"<"} INDICE</code> faça <br />
            {"{"} <br />
            <code>K = K + 1;</code> <br />
            <code>SOMA = SOMA + K;</code> <br />
            {"}"} <br />
            imprimir(SOMA)
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
            <p className="flex-1 text-sm tracking-wide md:text-base lg:text-lg w-full">
              Digite um número, e veja o valor do processado da variável SOMA!
            </p>
            <div className="flex justify-center items-center w-full gap-2">
              <Input
                type="number"
                placeholder="Digite um número"
                min={2}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(parseInt(e.target.value));
                }}
                disabled={countdown > 0}
                className="rounded-xl focus:border-b-2 w-full"
              />
              <Button
                className="w-full"
                onClick={handleCalculate}
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
              codeString={`const calculateSum = useCallback((n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }, []);`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
