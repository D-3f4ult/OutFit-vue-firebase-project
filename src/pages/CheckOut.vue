<template>
    <div class="checkout-page">
      <!-- Header -->
      <HeaderL />
  
      <!-- Main Content -->
      <div class="content container">
        <h1 class="my-4 text-center">Checkout</h1>
        <div v-if="cart.length" class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="item.id">
                <td>
                  <img :src="item.image" alt="Product Image" class="img-thumbnail" width="100" />
                </td>
                <td>{{ item.name }}</td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="item.quantity"
                    @change="updateQuantity(index)"
                    :max="item.stock"
                    min="1"
                  />
                  <small v-if="item.quantity > item.stock" class="text-danger">
                    Maximum available: {{ item.stock }}
                  </small>
                </td>
                <td>${{ item.price }}</td>
                <td>${{ item.price * item.quantity }}</td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="removeFromCart(index)">
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-end fw-bold">Grand Total:</td>
                <td colspan="2" class="fw-bold">${{ cartTotal }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p v-else class="text-center text-muted">Your cart is empty.</p>
        <div class="text-end mt-4">
          <button class="btn btn-success" @click="proceedToShipping" :disabled="isExceedingStock || cart.length === 0">
            Proceed to Payment
          </button>
        </div>
      </div>
  
      <!-- Footer -->
      <FooterP />
    </div>
  </template>
  
  <script>
  import { auth, db } from "../firebase";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import HeaderL from "../components/HeaderL.vue";
  import FooterP from "../components/FooterP.vue";
  
  export default {
    components: {
      HeaderL,
      FooterP,
    },
    data() {
      return {
        cart: [],
      };
    },
    computed: {
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      isExceedingStock() {
        return this.cart.some((item) => item.quantity > item.stock || item.quantity <= 0);
      },
    },
    async created() {
      await this.fetchCart();
    },
    methods: {
      async fetchCart() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            this.cart = userSnap.data().cart || [];
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      },
      async updateQuantity(index) {
        const item = this.cart[index];
        if (item.quantity > item.stock) {
          alert(`The maximum quantity available for ${item.name} is ${item.stock}.`);
          item.quantity = item.stock;
        } else if (item.quantity <= 0) {
          alert("Quantity must be at least 1.");
          item.quantity = 1;
        }
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { cart: this.cart });
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      },
      async removeFromCart(index) {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
          const userRef = doc(db, "users", user.uid);
          const updatedCart = this.cart.filter((_, i) => i !== index);
          await updateDoc(userRef, { cart: updatedCart });
          this.cart = updatedCart;
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      },
      proceedToShipping() {
        this.$router.push("/Check");
      },
    },
  };
  </script>
  
  <style scoped>
  .checkout-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
    flex: 1; /* يأخذ المساحة المتبقية */
  }
  
  .table th,
  .table td {
    vertical-align: middle;
    text-align: center;
  }
  
  .img-thumbnail {
    border: none;
  }
  
  .text-danger {
    font-size: 12px;
  }
  
  footer {
    margin-top: auto;
  }
  </style>
  