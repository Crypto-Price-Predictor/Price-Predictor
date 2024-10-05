import Image from "next/image";
import loginButton from "./components/loginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Section1 from "./components/homeComponents/Section1";
import Section2 from "./components/homeComponents/Section2";
import Section3 from "./components/homeComponents/Section3";
import Section4 from "./components/homeComponents/Section4";
import Section5 from "./components/homeComponents/Section5";
import NavBar from "./components/navigation/NavBar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between">
      <NavBar />
      <div>
        <div id="home" className="flex flex-col">
          <div className="flex-1">
            <video autoPlay muted loop className="opacity-30 h-full ">
              <source src="/video1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-2 opacity-30">
            <Image
              src="/background2.jpg"
              alt=""
              // layout="fill"
              // objectFit="cover"
              layout="responsive"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="bg-black h-screen"></div>
          <div className="bg-black h-64"></div>
        </div>

        <div className="absolute top-32">
          <div className="flex-1 w-full">
            <Section1 />
          </div>
          <div className="flex-2 w-full">
            <Section2 />
          </div>
          <div className="flex-2 w-full">
            <Section3 />
          </div>
          <div className="flex-2 w-full">
            <Section4 />
          </div>
          <div className="flex-2 w-full ">
            <Section5 />
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
