import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DashboardLayout from "../../components/dashboardLayout";

export default function Brand() {
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/auth/login");
    },
  });

  console.log(data);
  console.log(status);

  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
   <DashboardLayout>
     <div>Brand page here</div>
   </DashboardLayout>
  );
}
