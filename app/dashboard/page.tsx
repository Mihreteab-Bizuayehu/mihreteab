import { Suspense } from "react";
import Certificates from "./certificate/page";
import Portfolios from "./portfolio/page";
import Projects from "./project/page";
import Skills from "./skill/page";
import Loading from "@/components/loading";

export default async function Dashboard() {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Suspense fallback={<Loading />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Certificates />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Portfolios />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <Projects />
        </Suspense>
      </div>
    );
}