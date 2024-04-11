import { QuadraticRect } from "@/components/QuadraticRect";
import SelectCompany from "@/components/Services";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Stock </h1>
        <h1 className={title({ color: "violet" })}> service &nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Select the service What you want
        </h2>
      </div>
      <QuadraticRect />
      <div className="w-full text-center justify-center">
        <SelectCompany />
      </div>
    </section>
  );
}
