"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "./ui/button";
import { Clipboard, Check } from "lucide-react";
import { useState } from "react";
import { fadeIn } from "@/utils/variants";
import { motion } from "framer-motion";
export default function ViewCode({ codeString }: { codeString: string }) {
  const [copy, setCopy] = useState(false);

  return (
    <motion.div
      variants={fadeIn("bottom", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="w-full bg-[#3a404d] rounded-md overflow-hidden"
    >
      <div className="flex justify-between px-4 items-center text-primary-foreground text-sm tracking-wide md:text-base lg:text-lg">
        <p className="text-sm">Exemplo</p>
        {copy ? (
          <Button
            variant="icon"
            className="inline-flex items-center gap-2 text-background"
          >
            <Check />
            Copiado
          </Button>
        ) : (
          <Button
            variant="icon"
            className="inline-flex items-center gap-2 text-sm tracking-wide md:text-base lg:text-lg"
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              setCopy(true);
              setTimeout(() => setCopy(false), 3000);
            }}
          >
            <Clipboard />
            Copiar
          </Button>
        )}
      </div>
      <SyntaxHighlighter
        language="tsx"
        style={atomOneDark}
        customStyle={{ padding: "25px" }}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </motion.div>
  );
}
