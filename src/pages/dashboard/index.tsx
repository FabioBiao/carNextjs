import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Dashboard() {
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
  return <div>dashboard here</div>;
}
