import { useRouter } from "vue-router";

export const useRouterHook = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const goHome = () => {
    router.push("/");
  };
  const goSignIn = () => {
    router.push("/signIn");
  };
  const goSignUp = () => {
    router.push("/signUp");
  };

  return {
    goBack,
    goHome,
    goSignIn,
    goSignUp
  };
};
