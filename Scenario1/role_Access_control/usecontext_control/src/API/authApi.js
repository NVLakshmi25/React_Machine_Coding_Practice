export async function loginApi(role) {
  await new Promise((r) => setTimeout(r, 500));

  return {
    token: "jwt-token-123",
    user: {
      name: "John",
      role,
    },
  };
}
