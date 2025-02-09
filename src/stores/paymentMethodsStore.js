import { defineStore } from "pinia";

export const usePaymentMethodsStore = defineStore("paymentMethods", {
  state: () => ({
    paymentMethods: [],
  }),
  actions: {
    setPaymentMethods(paymentMethods) {
      this.paymentMethods = paymentMethods;
    },
  },
});
