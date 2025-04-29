import Loading from "@/components/loading";
import SkillForm from "@/components/SkillForm";
import { Suspense } from "react";

export default function CreateSkill() {
  return (
    <Suspense fallback={<Loading />}>
      <SkillForm />
    </Suspense>
  );
}
