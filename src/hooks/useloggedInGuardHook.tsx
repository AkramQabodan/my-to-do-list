import { useRouter } from "next/navigation";

const useLoggedInGuard = () => {
  const user = localStorage.getItem("user");
  const router = useRouter();
  if (!user) {
    router.push("/login");
    return <></>;
  }
};
export default useLoggedInGuard;
