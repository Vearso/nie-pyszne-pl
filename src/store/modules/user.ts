import { UserState, FormValues } from "@/store/interfaces";
import { auth, db } from "@/utilities/firebase";
import { useRouterHook } from "@/router/routerHooks";

const { goHome } = useRouterHook();

const state: UserState = {
  name: "",
  email: "",
  error: ""
};

const mutations = {
  setUpUser(state: UserState, user: UserState) {
    state.name = user.name;
    state.email = user.email;
  },
  clearUser(state: UserState) {
    state.name = "";
    state.email = "";
  },
  setError(state: UserState, message: string) {
    state.error = message;
  }
};

const actions = {
  async doSignUpUser(context: any, values: FormValues) {
    await auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(authUser => {
        db.ref("users/" + authUser.user?.uid).set({
          name: values.name,
          email: values.email
        });
        context.commit("setUpUser", { name: values.name, email: values.email });
      })
      .catch(err => context.commit("setError", err.message));
  },
  async doSignInUser(context: any, values: FormValues) {
    await auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(authUser => {
        db.ref("users/" + authUser.user?.uid).on("value", snapshot => {
          const user = snapshot.val();
          context.commit("setUpUser", user);
        });
      })
      .catch(err => context.commit("setError", err.message));
  },
  async doSignOut(context: any) {
    await auth.signOut();
    context.commit("clearUser");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
