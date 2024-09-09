"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import ViewCode from "./view-code";
import { useState, useRef, useCallback } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Answers = Record<string, string>;
type Results = Record<string, string>;
type Counters = Record<string, number>;
type Hints = Record<string, string>;

const correctAnswers: Record<string, number> = {
  a: 9,
  b: 128,
  c: 49,
  d: 100,
  e: 13,
  f: 20,
};

const hints: Hints = {
  a: "A lógica é o incremento de 2",
  b: "A lógica é duplicar o valor anterior",
  c: "A lógica é a sequência de quadrados perfeitos",
  d: "A lógica é a sequência de quadrados perfeitos a partir de 2²",
  e: "A lógica é a sequência de Fibonacci",
  f: "A lógica é o intervalo entre números segue uma regra mista de incremento de 1 ou 2",
};

export default function Logica() {
  const [answers, setAnswers] = useState<Answers>({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
  });
  const [results, setResults] = useState<Results>({});
  const [counters, setCounters] = useState<Counters>({});
  const [disabledButtons, setDisabledButtons] = useState<
    Record<string, boolean>
  >({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
  });
  const [disabledInputs, setDisabledInputs] = useState<Record<string, boolean>>(
    {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
    }
  );

  const intervalIds = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const initiateCounter = useCallback((key: string) => {
    if (intervalIds.current[key]) {
      clearInterval(intervalIds.current[key]);
    }

    intervalIds.current[key] = setInterval(() => {
      setCounters((prev) => {
        const newValue = prev[key] > 0 ? prev[key] - 1 : 0;
        if (newValue === 0) {
          clearInterval(intervalIds.current[key]);
          delete intervalIds.current[key];

          setDisabledButtons((prev) => ({ ...prev, [key]: false }));
          setDisabledInputs((prev) => ({ ...prev, [key]: false }));

          setResults((prev) => {
            const newResults = { ...prev };
            delete newResults[key];
            return Object.keys(newResults).length === 0 ? {} : newResults;
          });
        }
        return { ...prev, [key]: newValue };
      });
    }, 1000);
  }, []);

  const handleCheckAnswer = useCallback(
    (key: string) => {
      const isCorrect =
        parseInt(answers[key] as string) === correctAnswers[key];
      const resultString = `No item ${key}, "${answers[key]}" está ${
        isCorrect ? "Correto" : "Incorreto"
      }.`;

      setResults((prev) => ({
        ...prev,
        [key]: isCorrect ? resultString : `${resultString} ${hints[key]}`,
      }));
      setCounters((prev) => ({ ...prev, [key]: 5 }));
      setDisabledButtons((prev) => ({ ...prev, [key]: true }));
      setDisabledInputs((prev) => ({ ...prev, [key]: true }));

      setAnswers((prev) => ({ ...prev, [key]: "" }));

      initiateCounter(key);
    },
    [answers, initiateCounter]
  );

  return (
    <section
      id="logica"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-4 md:px-6 md:py-0 pt-[55px] sm:pt-0"
    >
      <div className="flex h-full w-full flex-col items-center justify-center md:flex-row gap-6">
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-2 text-justify gap-2 order-1 md:order-2">
          <motion.div
            variants={fadeIn("top", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="text-sm tracking-wide md:text-base lg:text-lg flex flex-col w-full justify-center items-center gap-2"
          >
            <p className="w-full text-sm tracking-wide md:text-base lg:text-lg">
              4º Descubra a lógica e complete o próximo elemento:
            </p>
            <div className="flex justify-center items-center gap-2 w-full flex-col text-sm tracking-wide md:text-base lg:text-lg">
              {Object.entries(correctAnswers).map(([key], index) => (
                <div
                  key={key}
                  className="flex items-center justify-between w-full gap-2"
                >
                  <span className="flex-1">
                    {String.fromCharCode(97 + index)}{" "}
                    {key === "a"
                      ? "1, 3, 5, 7, ___"
                      : key === "b"
                      ? "2, 4, 8, 16, 32, 64, ___"
                      : key === "c"
                      ? "0, 1, 4, 9, 16, 25, 36, ___"
                      : key === "d"
                      ? "4, 16, 36, 64, ___"
                      : key === "e"
                      ? "1, 1, 2, 3, 5, 8, ___"
                      : "2, 10, 12, 16, 17, 18, 19, ___"}
                  </span>

                  <div className="flex flex-1 justify-center gap-2">
                    <Input
                      type="number"
                      min={0}
                      placeholder="Digite"
                      value={answers[key] as string}
                      onChange={(e) =>
                        setAnswers({ ...answers, [key]: e.target.value })
                      }
                      className="w-full"
                      disabled={disabledInputs[key]}
                    />
                    <Button
                      className="w-full"
                      onClick={() => handleCheckAnswer(key)}
                      disabled={disabledButtons[key]}
                    >
                      {counters[key] > 0 ? counters[key] : "Verificar"}
                    </Button>
                  </div>
                </div>
              ))}
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

          {Object.entries(results).length === 0 ? (
            <motion.p
              variants={fadeIn("top", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-4 animate-pulse text-sm tracking-wide md:text-base lg:text-lg"
            >
              Aguardando...
            </motion.p>
          ) : (
            <div>
              {Object.entries(results).map(([key, result]) => (
                <motion.div
                  key={key}
                  variants={fadeIn("top", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.3 }}
                  className="mt-4 text-sm tracking-wide md:text-base lg:text-lg"
                >
                  {result}
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-2 md:flex-row order-2 md:order-1">
          <motion.section
            variants={fadeIn("bottom", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex w-full flex-col items-center justify-center gap-2"
          >
            <ViewCode
              codeString={`const handleCheckAnswer = useCallback(
    (key: string) => {
      const isCorrect =
        parseInt(answers[key] as string) === correctAnswers[key];
      const resultString = No item {key}, "{answers[key]}" está {
        isCorrect ? "Correto" : "Incorreto"
      }.;

      setResults((prev) => ({
        ...prev,
        [key]: isCorrect ? resultString : {resultString} {hints[key]},
      }));
      setCounters((prev) => ({ ...prev, [key]: 5 }));
      setDisabledButtons((prev) => ({ ...prev, [key]: true }));
      setDisabledInputs((prev) => ({ ...prev, [key]: true }));

      setAnswers((prev) => ({ ...prev, [key]: "" }));

      initiateCounter(key);
    },
    [answers, initiateCounter]
  );`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
