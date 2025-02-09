import { defineStore } from "pinia";
// import { apiRequest } from "@/services/apiService";
import { BASE_URL } from "@/services/config";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: null,
    cartItems: [], // To store the cart items
    totalItems: 0, // To store the total number of items in the cart

    total: 0,
    code: "",
    loading: false, // To manage loading state
    error: null, // To store any error message
    success: null, // To store success message
    message: null,
    couponSuccess: null,
    couponError: null,
    coupon: null,
    couponMessage: null,
    totalWithDiscount: null,
    orderId: null,
    showCouponSection: true,
  }),
  // getters: {
  //   totalItems(state) {
  //     return (state.cartItems || []).reduce(
  //       (sum, item) => sum + item.quantity,
  //       0
  //     );
  //   },
  //   cartTotal(state) {
  //     return (state.cartItems || []).reduce(
  //       (sum, item) => sum + item.quantity * item.final_price,
  //       0
  //     );
  //   },
  // },

  actions: {
    setCartItems(cartItems) {
      this.cartItems = cartItems;
      this.total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ); // Optional: auto-update total
    },
    // Fetch cart items (for authenticated user)
    async fetchCart() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`${BASE_URL}/api/cart/view`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cart = await response.json();
        this.cartItems = cart.cart.cart_items; // Use setter
        this.total = cart.cart.total_price;
        this.totalItems = cart.totalItems;
        console.log("setCartItems", cart.cart.cart_items);
        console.log("setCartItems", this.cartItems);
      } catch (err) {
        this.error = "Failed to load cart. Please try again later.";
        console.error("Error fetching cart:", err);
      } finally {
        this.loading = false;
      }
    },

    async addToCart(productId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`${BASE_URL}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cart = await response.json();
        this.setCartItems(cart.cart.cart_items); // Use setter

        await this.fetchCart(); // Ensure consistency by fetching updated data
      } catch (err) {
        this.error = "Failed to add product to cart. Please try again later.";
        console.error("Error adding to cart:", err);
      } finally {
        this.loading = false;
      }
    },

    // Remove item from the cart
    async removeFromCart(itemId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`${BASE_URL}/api/cart/remove/${itemId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Fetch updated cart items
        await this.fetchCart(); // Ensure this action updates `cartItems` and `cartTotal`
      } catch (err) {
        this.error =
          "Failed to remove product from cart. Please try again later.";
        console.error("Error removing from cart:", err);
      } finally {
        this.loading = false;
      }
    },

    // Update the cart item quantity
    async updateCartItemQuantity(item) {
      this.loading = true;
      this.error = null;
      console.log("item quantity", item.quantity);

      try {
        const response = await fetch(`${BASE_URL}/api/cart/update/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ quantity: item.quantity }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await this.fetchCart(); // Ensure this action updates `cartItems` and `cartTotal`

        // alert(data.success);
      } catch (err) {
        this.error = "Failed to update cart item. Please try again later.";
        console.error("Error updating cart item:", err);
      } finally {
        this.loading = false;
      }
    },

    processCouponResponse(data) {
      if (data.success) {
        this.couponSuccess = true; // Indicating success
        // this.cartItems = data.cartItems;
        this.cartTotal = data.total_after_discount;
        // this.discount = data.discount || null; // Handle discount
        this.totalWithDiscount = data.total_price_after_discount || null; // Handle discounted total
        this.couponError = null; // Clear any previous errors
        this.couponMessage = "Coupon applied successfully.";
        this.showCouponSection = false; // Hide the coupon form
      } else if (data.code) {
        // Handle validation errors for the coupon field
        this.couponError = data.code;
        this.couponMessage =
          data.message || "An error occurred while applying the coupon.";
      } else if (data.error) {
        this.couponError = data.error;
        this.couponMessage =
          data.message || "An error occurred while applying the coupon.";
      } else if (data.message) {
        this.couponMessage = data.message;
      }
    },

    async applyCoupon(code) {
      this.couponLoading = true; // Show loading state while applying coupon
      try {
        const response = await fetch(`${BASE_URL}/api/cart/apply-coupon`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ code: code }),
        });
        const data = await response.json();

        console.log(code);
        console.log("--------------------");
        // console.log(response.body);
        // console.log("------------------");
        console.log(data);
        console.log(data.success === false);

        if (data.success === false) {
          // Handle validation errors from the API
          if (data.data.code) {
            this.couponError = data.data.code[0] || "Invalid coupon code.";
          } else {
            this.couponError =
              data.message || "An error occurred while applying the coupon.";
          }
          this.couponSuccess = false; // Reset success state if there's an error
        }
        if (data.error) {
          this.couponError = data.error;
          this.couponSuccess = false;
        } else {
          // Process successful coupon application
          this.processCouponResponse(data);
          this.couponError = null; // Clear error if coupon is applied successfully
          this.couponSuccess = true;
          this.totalWithDiscount = data.total_price_after_discount;

          await this.fetchCart();
        }
      } catch (error) {
        this.couponError =
          error.message || "Failed to apply coupon. Please try again.";
        this.couponSuccess = false;
      } finally {
        this.couponLoading = false; // Hide loading state once done
      }
    },

    // Clear the entire cart
    async clearCart() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`${BASE_URL}/api/cart/clear`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cart = await response.json();
        this.setCartItems(cart.cart); // Use setter

        await this.fetchCart(); // Ensure this action updates `cartItems` and `cartTotal`
      } catch (err) {
        this.error = "Failed to clear cart. Please try again later.";
        console.error("Error clearing cart:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchCartItems() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/cart/view`, // Replace with your API endpoint
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        this.cartItems = data.cartItems; // Assuming the response includes a cartItems array
        // this.totalItems = data.totalItems;
        this.total = data.total;
        console.log("data: ", data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
  },

  // mounted() {
  //   console.log("Show Coupon Section:", this.showCouponSection);
  //   if (!this.useCartStore.cartItems.length) {
  //     this.loading = true; // Set loading to true while fetching
  //     this.fetchCart()
  //       .catch((err) => {
  //         console.error("Error fetching cart on mount:", err);
  //         this.error =
  //           "Failed to load cart on page load. Please try again later.";
  //       })
  //       .finally(() => {
  //         this.loading = false; // Reset loading once the fetch is complete
  //       });
  //   }
  // },
});
