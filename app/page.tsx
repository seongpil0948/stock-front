import { QuadraticRectScene } from "@/components/QuadraticRect";
import SelectCompany from "@/components/Services";
import { AnimateBlink } from "@/components/animate/typo";
import { title, subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/image";
export default function Home() {
  return (
    <>
      <QuadraticRectScene />
      <div className="z-[1]">
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] rotate-12 "
        >
          <Image
            src="/gradients/docs-right.png"
            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
            alt="docs right background"
          />
        </div>
        <section className="flex flex-col items-center justify-center gap-4 h-screen">
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
          <div className="w-full text-center justify-center">
            <SelectCompany />
          </div>
        </section>
      </div>
    </>
  );
}
