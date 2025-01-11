const api = (route, data) =>
  fetch(`https://welfare-backend.herokuapp.com/api/v1${route}`, {
    method: data?.method || "GET",
    headers: { "Content-Type": "application/json" },
    ...data,
  });
//test
export default api;
