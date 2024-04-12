import { QuadraticRectScene } from "@/components/QuadraticRect";
import SelectCompany from "@/components/service/SelectCompany";
import { AnimateBlink } from "@/components/animate/typo";
import { title, subtitle } from "@/components/primitives";
import { Image } from "@nextui-org/image";
import { StepInfer } from "@/components/service/StepInfer";
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
        <StepInfer />
      </div>
    </>
  );
}
