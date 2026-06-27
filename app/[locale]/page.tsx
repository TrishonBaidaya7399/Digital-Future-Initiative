import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Dictionary } from "../lib/types";
import Hero from "../components/sections/Hero";
import WhyWeStarted from "../components/sections/WhyWeStarted";
import Vision from "../components/sections/Vision";
import Roadmap from "../components/sections/Roadmap";
import TrainingPartners from "../components/sections/TrainingPartners";
import DonationImpact from "../components/sections/DonationImpact";
import DonationMethods from "../components/sections/DonationMethods";
import Progress from "../components/sections/Progress";
import Gallery from "../components/sections/Gallery";
import WhyDonate from "../components/sections/WhyDonate";
import FAQ from "../components/sections/FAQ";
import Volunteer from "../components/sections/Volunteer";
import FooterCTA from "../components/sections/FooterCTA";

export async function generateStaticParams() {
  return [{ locale: "bn" }, { locale: "en" }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = (await getDictionary(locale)) as Dictionary;

  return (
    <>
      <Hero dict={dict} />
      <WhyWeStarted dict={dict} />
      <Vision dict={dict} />
      <Roadmap dict={dict} />
      <TrainingPartners dict={dict} />
      <DonationImpact dict={dict} />
      <DonationMethods dict={dict} />
      <Progress dict={dict} />
      <Gallery dict={dict} />
      <WhyDonate dict={dict} />
      <FAQ dict={dict} />
      <Volunteer dict={dict} />
      <FooterCTA dict={dict} />
    </>
  );
}
