import http from "./httpService";

export const getServices = async () => {
  const services = await http.get("/services");
  return services.data;
};

export const getService = async (serviceId) => {
  const service = await http.get(`/services/${serviceId}`);
  return service.data;
};
