import CertificateForm from "@/components/CertificateForm";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default function CreateCertificate() {
  return (
      <Suspense fallback={<Loading />}>
        <CertificateForm/>
      </Suspense>
  );
}
