import { useRouter } from "next/navigation";

const useLoggedOutGuard = () => {
  const user = localStorage.getItem("user");
  const router = useRouter();
  if (user) {
    router.push("/to-do-list");
    return <></>;
  }
};
export default useLoggedOutGuard;
