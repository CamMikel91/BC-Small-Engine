import http from "./httpService";

export const getCoupons = async () => {
  const coupons = await http.get("/coupons");
  return coupons.data;
};

export const getCoupon = async (couponId) => {
  const coupon = await http.get(`/coupons/${couponId}`);
  return coupon.data;
};

export function getActiveCoupon(coupons) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const activeCoupon = coupons.find((coupon) => coupon.monthCode === month);
  return activeCoupon;
}
