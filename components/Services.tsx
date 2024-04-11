"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

// import { button as buttonStyles } from "@nextui-org/theme";
export function SelectCompany() {
  const tickers = [
    { label: "TESLA", value: "TSLA", description: "테슬라 주식" },
    { label: "APPLE", value: "AAPL", description: "애플 주식" },
    { label: "GOOGLE", value: "GOOGL", description: "구글 주식" },
    { label: "MICROSOFT", value: "MSFT", description: "마이크로소프트 주식" },
  ];
  return (
    <Autocomplete
      size="lg"
      defaultItems={tickers}
      label="Select an company"
      className="max-w-xs"
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default SelectCompany;
