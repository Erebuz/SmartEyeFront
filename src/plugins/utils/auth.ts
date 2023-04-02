import auth from "@/plugins/auth";

export function login(username: string, password: string) {
  return auth.login({
    data: {
      username,
      password,
    },
  });
}

export function logout() {
  auth.logout({}).then(() => {
    localStorage.removeItem("refresh_token");
  });
}
