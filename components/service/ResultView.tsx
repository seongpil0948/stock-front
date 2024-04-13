"use client";

import { useMemo, useState } from "react";
import { subtitle, title } from "../primitives";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import clsx from "clsx";
interface PropsResultView {
  content: string;
  date?: string;
  ticker: string;
}
const special: string[] = ["~", "@", "!", "#", "$", "%", "^", "&", "*"];
const exception: string[] = [" ", "\n", ".", ","];
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export function ResultView(props: PropsResultView) {
  const strArr = useMemo(() => props.content.split(""), [props.content]);
  const [viewText, setViewText] = useState<string>("");
  const [numArr, setNumArr] = useState<number[]>(
    strArr.map(() => random(5, 40))
  );

  const timer = setInterval(() => {
    let completeCount = 0;
    let newText = "";
    numArr.forEach((num: number, i: number) => {
      if (exception.includes(strArr[i]) || numArr[i] === 0) {
        newText += strArr[i];
        completeCount += 1;
      } else {
        newText += special[numArr[i] % special.length];
        numArr[i] = --num;
        setNumArr([...numArr]);
      }
    });

    setViewText(newText);
    if (completeCount === numArr.length) clearInterval(timer);
  }, 100);

  return (
    <Card className="max-w-xs  p-2 md:p-6">
      <CardHeader>
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">
            {props.ticker}
          </h4>
          <h5 className="text-small tracking-tight text-default-400">
            {props.date}
          </h5>
        </div>
      </CardHeader>
      <CardBody className={clsx("px-3 py-0", subtitle())}>
        <p>{viewText}</p>
        <div className=" flex justify-end my-2 md:my-6">
          <h3
            className={clsx(
              title({
                size: "sm",
                color: "green",
              })
            )}
          >
            7000 (USD)
          </h3>
        </div>
      </CardBody>
    </Card>
  );
}
