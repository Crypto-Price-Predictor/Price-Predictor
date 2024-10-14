// hooks/useSessionCheck.tsx
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useSessionCheck = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // If the session is unauthenticated, handle it (logout or redirect)
      signOut({ redirect: false });
      //   router.push("/"); // Redirect to login
    } else if (session?.user?.id) {
      // Store the user ID in sessionStorage
      sessionStorage.setItem("userId", session.user.id);
    }
  }, [session, status, router]);

  return { session, status };
};
