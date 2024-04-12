"use client";
import { useMemo, useState } from "react";
import SelectCompany from "./SelectCompany";
import { MotionConfig, motion } from "framer-motion";
import { AnimateBlink } from "../animate/typo";

type Step = "selectCompany" | "selectOption";
export function StepInfer() {
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const step = useMemo<Step>(() => {
    if (!selectedTicker) return "selectCompany";
    return "selectOption";
  }, [selectedTicker]);

  const stepVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0, scale: 0 },
  };

  const onSelectCompany = (data: { value: string }) => {
    console.log(`data in next selectCompany`, data);
    setSelectedTicker(data.value);
  };

  const tickers = [
    { label: "TESLA", value: "TSLA", description: "테슬라 주식" },
    { label: "APPLE", value: "AAPL", description: "애플 주식" },
    { label: "GOOGLE", value: "GOOGL", description: "구글 주식" },
    {
      label: "MICROSOFT",
      value: "MSFT",
      description: "마이크로소프트 주식",
    },
  ];
  return (
    <section className="flex flex-col w-full text-center items-center justify-center gap-4 h-screen">
      <MotionConfig
        transition={{
          type: "spring",
          duration: 0.7,
          bounce: 0.2,
        }}
      >
        {step === "selectCompany" && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate={step === "selectCompany" ? "visible" : "hidden"}
            exit="exit"
          >
            <SelectCompany tickers={tickers} onNext={onSelectCompany} />
          </motion.div>
        )}
        {step === "selectOption" && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate={step === "selectOption" ? "visible" : "hidden"}
            exit="exit"
          >
            <>
              <AnimateBlink>
                <h1>Please select options</h1>
              </AnimateBlink>
            </>
          </motion.div>
        )}
      </MotionConfig>
    </section>
  );
}
