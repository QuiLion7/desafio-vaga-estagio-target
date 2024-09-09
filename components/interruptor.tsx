"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { Separator } from "@/components/ui/separator";
import ViewCode from "./view-code";
import { useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

type AnswerOptions = {
  question: string;
  options: { value: string; label: string }[];
  correct: string;
};

export default function Interruptor() {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const answersOptions: AnswerOptions[] = [
    {
      question: "O que você faz primeiro?",
      options: [
        {
          value: "a",
          label:
            "Ligo um interruptor, depois de um tempo desligo e ligo o segundo.",
        },
        { value: "b", label: "Ligo todos e vou ver as lâmpadas." },
        { value: "c", label: "Ligo um interruptor e não mexo nos outros." },
      ],
      correct: "a",
    },
    {
      question: "O que você faz ao entrar na sala das lâmpadas?",
      options: [
        { value: "a", label: "Verifico qual está acesa, quente e fria." },
        { value: "b", label: "Vejo apenas a lâmpada acesa." },
        { value: "c", label: "Desligo todas e volto." },
      ],
      correct: "a",
    },
    {
      question: "Como identifica cada interruptor?",
      options: [
        {
          value: "a",
          label: "Acesa: último ligado, quente: primeiro, fria: nunca ligado.",
        },
        { value: "b", label: "Acesa: primeiro ligado." },
        { value: "c", label: "Não é possível identificar." },
      ],
      correct: "a",
    },
  ];

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (isLocked || intervalRef.current) return;

    let score = 0;
    answersOptions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });

    setResult(`Você acertou ${score} de ${answersOptions.length} perguntas.`);
    setIsLocked(true);
    setCountdown(5);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsLocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <section
      id="interruptor"
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
            5º Você está em uma sala com três interruptores, cada um conectado a
            uma lâmpada em salas diferentes. Você não pode ver as lâmpadas da
            sala em que está, mas pode ligar e desligar os interruptores quantas
            vezes quiser. Seu objetivo é descobrir qual interruptor controla
            qual lâmpada. Como você faria para descobrir, usando apenas duas
            idas até uma das salas das lâmpadas?
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

          {answersOptions.map((q, index) => (
            <motion.div
              key={index}
              variants={fadeIn("bottom", 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="flex w-full flex-col gap-4 text-sm tracking-wide md:text-base lg:text-lg"
            >
              <p>{q.question}</p>
              <RadioGroup
                onValueChange={(value) => handleAnswerChange(index, value)}
                defaultValue={selectedAnswers[index] || ""}
              >
                {q.options.map((option, optionIndex) => (
                  <div
                    className="flex items-center space-x-2"
                    key={optionIndex}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`q${index}o${optionIndex}`}
                      disabled={isLocked}
                    />
                    <Label htmlFor={`q${index}o${optionIndex}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Separator className="bg-primary" />
            </motion.div>
          ))}
          <motion.div
            variants={fadeIn("bottom", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
          >
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={countdown > 0}
            >
              {countdown > 0 ? countdown : "Verificar"}
            </Button>
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
              codeString={`const handleSubmit = () => {
    if (isLocked || intervalRef.current) return;

    let score = 0;
    answersOptions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });

    setResult(Você acertou {score} de {answersOptions.length} perguntas.);
    setIsLocked(true);
    setCountdown(5);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsLocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };`}
            />
          </motion.section>
        </div>
      </div>
    </section>
  );
}
