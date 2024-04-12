"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { subtitle, title } from "../primitives";
import { AnimateBlink } from "../animate/typo";

// import { button as buttonStyles } from "@nextui-org/theme";
export function SelectCompany(props: {
  tickers: SelectOptions[];
  onNext: (data: { value: string }) => void;
}) {
  const { tickers } = props;
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const isValid = useMemo(
    () => selectedTicker && tickers.some((t) => t.value === selectedTicker),
    [selectedTicker, tickers]
  );
  return (
    <>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Stock </h1>
        <h1 className={title({ color: "violet" })}> service &nbsp;</h1>
        <br />
        <AnimateBlink>
          <h2 className={subtitle({ class: "mt-4" })}>
            Select the service What you want
          </h2>
        </AnimateBlink>
      </div>
      <div className="flex flex-col gap-4 align-middle items-center">
        <Autocomplete
          size="lg"
          isClearable
          multiple
          defaultItems={tickers}
          label="Select an company"
          className="max-w-xs"
          selectedKey={selectedTicker}
          variant="flat"
          onSelectionChange={(item) =>
            setSelectedTicker(item as string | undefined)
          }
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={isValid ? "visible" : "hidden"}
          exit="hidden"
          transition={{ duration: 2 }}
        >
          <Button
            disabled={!isValid}
            size="lg"
            className="max-w-xs"
            onClick={() => {
              if (isValid) {
                props.onNext({ value: selectedTicker! });
              }
            }}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </>
  );
}

export default SelectCompany;

export interface SelectOptions {
  label: string;
  value: string;
  description: string;
}
