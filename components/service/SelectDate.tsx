"use client";

import { useState, useMemo } from "react";
import { AnimateBlink } from "../animate/typo";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";

export function SelectDate(props: {
  selectedTicker: string;
  onNext: (data: { value: string }) => void;
}) {
  const { selectedTicker } = props;
  const [date, setDate] = useState("");
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const validateDate = (value: string) => {
    // date string format: YYYY-MM-DD
    return value.match(
      /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/
    );
  };

  const isInvalid = useMemo(() => {
    if (!date) return false;
    if (isInitial) {
      setIsInitial(false);
    }

    return validateDate(date) ? false : true;
  }, [date, isInitial]);

  return (
    <div className="flex flex-col gap-4 align-middle items-center">
      <AnimateBlink>
        <h1>we serve stock price inference </h1>
      </AnimateBlink>
      <Input
        value={date}
        label="Date"
        variant="bordered"
        isInvalid={isInvalid}
        isRequired
        placeholder="YYYY-MM-DD"
        color={isInvalid ? "danger" : "success"}
        errorMessage={isInvalid && "Enter a valid Date(YYYY-MM-DD)"}
        onValueChange={setDate}
        className="max-w-xs"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={isInvalid || isInitial ? "hidden" : "visible"}
        exit="hidden"
        transition={{ duration: 2 }}
      >
        <Button
          size="lg"
          className="max-w-xs"
          onClick={() => {
            console.log(`selectedTicker`, selectedTicker);
            console.log(`selected date string`, date);
            console.log(`selected date`, new Date(date).toLocaleDateString());
            props.onNext({ value: date });
          }}
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
}
