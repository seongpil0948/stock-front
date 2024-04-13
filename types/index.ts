import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Supported react-aria i18n calendars.
 */
export type SupportedCalendars =
  | "buddhist"
  | "ethiopic"
  | "ethioaa"
  | "coptic"
  | "hebrew"
  | "indian"
  | "islamic-civil"
  | "islamic-tbla"
  | "islamic-umalqura"
  | "japanese"
  | "persian"
  | "roc"
  | "gregory";
