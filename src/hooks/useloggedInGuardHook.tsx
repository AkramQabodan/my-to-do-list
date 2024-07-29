import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useLoggedInGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login");
    }
  }, [router]);
};
export default useLoggedInGuard;
