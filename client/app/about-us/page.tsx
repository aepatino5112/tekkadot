"use client";
import Image from "next/image";
import React from "react";
import BrandSlider from "@/components/BrandSlider";

const AboutUs = () => {
  return (
    <main className="w-full px-10 min-w-0 overflow-x-hidden">
      {/* Banner hero (show only the image) */}
      <section className="max-w-full mx-auto mb-12">
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          {/* make the container have an explicit height / aspect so the background is visible */}
          <div
            className="relative w-full"
            style={{ aspectRatio: "16 / 6", maxHeight: "5rem" }}
          >
            <Image
              src="/images/banner.png"
              alt="banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="max-w-full mx-auto space-y-12 pb-20">
        {/* 1 — image left, text right */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-sm">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
              <Image
                src="/images/whoarewe.png"
                alt="laptop"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2 w-full min-w-0">
            <h2 className="font-bold text-2xl sm:text-3xl mb-3 text-black-500 dark:text-white-500">
              Who Are We?
            </h2>
            <p className="font-semibold paragraph-lg mb-2 text-black-500 dark:text-white-500">
              TekkaDot is your go-to destination for smart, affordable
              technology—curated for everyday life and epic play.
            </p>
            <p className="paragraph-lg text-black-500 dark:text-white-500">
              We are a collective of builders, designers, and researchers
              passionate about shaping the future of digital commerce. Our
              platform is born from the Polkadot ecosystem, leveraging parachain
              technology to create a decentralized marketplace where users can
              buy, sell, and trade technological products and digital art. We
              believe in transparency, community empowerment, and the
              transformative potential of Web3 to redefine how people interact
              with technology and each other.
            </p>
          </div>
        </div>

        {/* 2 — image right, text left */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-sm">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
              <Image
                src="/images/ourmission.png"
                alt="headset"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2 w-full min-w-0">
            <h2 className="font-bold text-2xl sm:text-3xl mb-3 text-black-500 dark:text-white-500">
              Our Mission
            </h2>
            <p className="font-semibold paragraph-lg mb-2 text-black-500 dark:text-white-500">
              Our mission is to democratize e‑commerce through decentralization.
              We aim to provide a secure, wallet‑native marketplace where users
              can transact directly, without intermediaries, using DOT and other
              blockchain assets. By combining confidential AI tools, NFT‑based
              receipts, and community verification, we empower buyers and
              sellers to engage in commerce that is transparent, fair, and
              globally accessible.
            </p>
            <p className="paragraph-lg text-black-500 dark:text-white-500">
              At the heart of our mission is trust: building systems that
              protect users from fraud, reward loyalty, and make blockchain
              adoption intuitive for everyone — from seasoned Web3 enthusiasts
              to newcomers.
            </p>
          </div>
        </div>

        {/* 3 — image left, text right */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-sm">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
              <Image
                src="/images/ourvision.png"
                alt="controller"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2 w-full min-w-0">
            <h2 className="font-bold text-2xl sm:text-3xl mb-3 text-black-500 dark:text-white-500">
              Our Vision
            </h2>
            <p className="font-semibold paragraph-lg mb-2 text-black-500 dark:text-white-500">
              We envision a world where digital and physical commerce converge
              seamlessly on-chain. A future where every product — whether a
              gaming console, a laptop, or a piece of digital art — carries its
              own verifiable history, proof of authenticity, and ownership
              record.
            </p>
            <p className="paragraph-lg text-black-500 dark:text-white-500">
              Our vision is to become the global hub for decentralized
              technology commerce, fostering a community where innovation
              thrives, users are empowered, and commerce is not controlled by
              centralized entities but by the people themselves. We see
              blockchain not just as infrastructure, but as a cultural shift —
              one that makes trust, transparency, and collaboration the default
              in global trade.
            </p>
          </div>
        </div>
      </section>

      {/* Brands banner */}
      <section className="max-w-full mx-auto space-y-12 pb-20">
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <div className="relative w-full aspect-[16/6] sm:aspect-[8/3]">
            <Image
              src="/images/middle.png"
              alt="middle"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Brand slider section */}
      <section className="max-w-full mx-auto space-y-12 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black-500 dark:text-white-500">
          Most wanted products from the best companies
        </h2>

        <div className="bg-transparent w-full">
          <BrandSlider />
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
