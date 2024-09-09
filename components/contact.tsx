"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "O seu nome deve ter pelo menos 3 caracteres.",
    })
    .max(30, {
      message: "O seu nome não deve ter mais de 30 caracteres.",
    }),
  email: z
    .string({
      required_error: "Escreva seu E-mail",
    })
    .email(),
  message: z
    .string()
    .max(160, {
      message: "Sua mensagem não deve ter mais 160 caracteres.",
    })
    .min(7, {
      message: "Sua mensagem deve ter pelo menos 7 caracteres.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    const messageWithUserInfo = `Nome: ${data.name}\nE-mail: ${data.email}\n\nMensagem: ${data.message}`;

    setIsSubmitting(true);
    try {
      const whatsappUrl = `https://wa.me/5588981062656?text=${encodeURIComponent(
        messageWithUserInfo
      )}`;

      window.open(whatsappUrl, "_blank");

      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="flex min-h-screen px-2 py-4 md:px-6 md:py-0 w-full flex-col items-center justify-center"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 md:flex-row">
        <div className="flex h-[250px] w-full flex-col items-center justify-end pb-8 sm:h-[350px] sm:justify-center md:h-full md:flex-1">
          <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-1 md:gap-2">
            <motion.h3
              variants={fadeIn("bottom", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-lg font-bold uppercase tracking-wide text-primary md:text-xl lg:text-2xl"
            >
              Entre em Contato
            </motion.h3>
            <motion.div
              variants={fadeIn("bottom", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex-col text-center text-3xl font-bold uppercase md:text-4xl lg:text-5xl"
            >
              <h1 className="mb-[8px]">Vamos Trabalhar </h1>
              <TypeAnimation
                sequence={["Juntos?", 2000, "Logo?", 2000]}
                speed={50}
                className="text-primary"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.div
              variants={fadeIn("bottom", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex items-center justify-center gap-2 p-2"
            >
              <Link
                href="https://github.com/QuiLion7"
                target="_blank"
                className="h-auto w-[40px] rounded-full p-2 hover:bg-primary duration-300 hover:scale-110 md:w-[50px]"
              >
                <FaGithub className="h-auto w-full" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/quilion7/"
                target="_blank"
                className="h-auto w-[40px] rounded-full p-2 hover:bg-primary duration-300 hover:scale-110 md:w-[50px]"
              >
                <FaLinkedin className="h-auto w-full" />
              </Link>
              <Link
                href="https://www.instagram.com/quilion7"
                target="_blank"
                className="h-auto w-[40px] rounded-full p-2 hover:bg-primary duration-300 hover:scale-110 md:w-[50px]"
              >
                <FaInstagram className="h-auto w-full" />
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          variants={fadeIn("top", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex h-full w-full items-start justify-center  sm:items-center md:flex-1 md:justify-start"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full sm:w-[300px] md:w-[500px] space-y-7 rounded-xl border-2 border-primary p-4 duration-300"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        {...field}
                        className="rounded-xl focus:border-b-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu e-mail"
                        {...field}
                        className="rounded-xl  "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte-me um pouco mais sobre a vaga..."
                        className="resize-none rounded-xl  focus:border-b-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-center">
                <Button
                  type="submit"
                  className="w-full max-w-[200px] font-bold uppercase animate-pulse"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
