"use client";

import AnimatedSection from "../ui/AnimatedSection";
import SectionTitle from "../ui/SectionTitle";
import CopyButton from "../ui/CopyButton";

import type { Dictionary } from "@/app/lib/types";

function DigitBoxes({ number }: { number: string }) {
  // Split number into groups of digits (handle Bengali and English digits)
  const chars = number.split("");
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {chars.map((char, idx) => (
        <div
          key={idx}
          className="flex h-8 md:h-10 w-6 md:w-8 items-center justify-center rounded border border-gray-300 bg-white text-lg font-bold text-gray-900 shadow-sm"
        >
          {char === " " ? "\u00A0" : char}
        </div>
      ))}
    </div>
  );
}

function PaymentCard({
  headerColor,
  headerText,
  number,
  merchantName,
  brandName,
  brandColor,
  paymentText,
  qrData,
}: {
  headerColor: string;
  headerText: string;
  number: string;
  merchantName: string;
  brandName: string;
  brandColor: string;
  paymentText: string;
  qrData: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200">
      {/* Header */}
      <div className={`${headerColor} px-4 py-3 text-center`}>
        <p className="text-white text-sm font-medium tracking-wide">
          {headerText}
        </p>
      </div>

      {/* Number */}
      <div className="px-4 py-4">
        <DigitBoxes number={number} />
      </div>

      {/* QR Code */}
      <div className="flex justify-center px-4 pb-3">
        <div className="rounded-lg border border-gray-200 bg-white p-2">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}`}
            alt={`${brandName} QR`}
            className="h-36 w-36"
            loading="lazy"
          />
        </div>
      </div>

      {/* Merchant Name */}
      <div className="text-center pb-3">
        <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">
          {merchantName}
        </p>
      </div>

      {/* Footer */}
      <div className={`${brandColor} px-4 py-3 flex items-center justify-between`}>
        <span className="text-white font-bold text-lg">{brandName}</span>
        <span className="text-white text-sm font-medium">{paymentText}</span>
      </div>
    </div>
  );
}

export default function DonationMethods({
  dict,
}: {
  dict: Dictionary;
}) {
  return (
    <section id="donate" className="py-20 md:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle title={dict.donationMethods.title} />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* bKash */}
          <AnimatedSection delay={0.1}>
            <PaymentCard
              headerColor="bg-[#E2136E]"
              headerText={dict.donationMethods.merchantAccount}
              number={dict.donationMethods.bkash.number}
              merchantName={dict.donationMethods.bkash.merchantName}
              brandName="bKash"
              brandColor="bg-[#E2136E]"
              paymentText={dict.donationMethods.payment}
              qrData={`bKash:${dict.donationMethods.bkash.number}`}
            />
            <div className="mt-3 flex justify-center">
              <CopyButton
                text={dict.donationMethods.bkash.number}
                copyLabel={dict.donationMethods.copy}
                copiedLabel={dict.donationMethods.copied}
              />
            </div>
          </AnimatedSection>

          {/* Nagad */}
          <AnimatedSection delay={0.2}>
            <PaymentCard
              headerColor="bg-[#F7931E]"
              headerText={dict.donationMethods.merchantAccount}
              number={dict.donationMethods.nogod.number}
              merchantName={dict.donationMethods.nogod.merchantName}
              brandName="Nagad"
              brandColor="bg-[#F7931E]"
              paymentText={dict.donationMethods.payment}
              qrData={`Nagad:${dict.donationMethods.nogod.number}`}
            />
            <div className="mt-3 flex justify-center">
              <CopyButton
                text={dict.donationMethods.nogod.number}
                copyLabel={dict.donationMethods.copy}
                copiedLabel={dict.donationMethods.copied}
              />
            </div>
          </AnimatedSection>

          {/* Bank */}
          <AnimatedSection delay={0.3}>
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200">
              {/* Header */}
              <div className="bg-slate-700 px-4 py-3 text-center">
                <p className="text-white text-sm font-medium tracking-wide">
                  {dict.donationMethods.bank.name}
                </p>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Account Name
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {dict.donationMethods.bank.accountName}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Account Number
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {dict.donationMethods.bank.accountNumber}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Bank
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {dict.donationMethods.bank.bankName}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      Branch
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {dict.donationMethods.bank.branch}
                    </p>
                  </div>
                </div>

                <CopyButton
                  text={dict.donationMethods.bank.details}
                  copyLabel={dict.donationMethods.copy}
                  copiedLabel={dict.donationMethods.copied}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
