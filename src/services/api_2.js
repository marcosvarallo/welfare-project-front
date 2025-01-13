const api = (route, data) =>
  fetch(`https://welfare-46ef9eb7f9c2.herokuapp.com/api/v1${route}`, {
    method: data?.method || "GET",
    headers: { "Content-Type": "application/json" },
    ...data,
  });
//test
export default api;
