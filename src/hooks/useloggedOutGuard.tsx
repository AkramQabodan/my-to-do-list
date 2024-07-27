import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useLoggedOutGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/main/to-do-list");
    }
  }, [router]);

  return null;
};

export default useLoggedOutGuard;
