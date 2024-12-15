<template>
    <div class="review-order-page container">
      <h2 class="my-4">Review Your Order</h2>
      <div v-if="orderItems.length" class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderItems" :key="item.id">
              <td><img :src="item.image" alt="Product" class="img-thumbnail" width="100" /></td>
              <td>{{ item.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ item.price }}</td>
              <td>${{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-end fw-bold">Grand Total:</td>
              <td class="fw-bold">${{ cartTotal }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p v-else class="text-center text-muted">Your cart is empty.</p>
      <div class="d-flex justify-content-between mt-4">
        <button class="btn btn-secondary" @click="$emit('back')">Back</button>
        <button class="btn btn-primary" @click="placeOrder" :disabled="!orderItems.length">Place Order</button>
      </div>
    </div>
  </template>
  
  <script>
  import { auth, db } from "@/firebase";
  import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        orderItems: [], // لتخزين العناصر الموجودة في السلة
      };
    },
    computed: {
      cartTotal() {
        return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    },
    methods: {
      async fetchCart() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
  
          if (userSnap.exists()) {
            this.orderItems = userSnap.data().cart || [];
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      },
      async placeOrder() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const userRef = doc(db, "users", user.uid);
          const ordersRef = collection(db, "orders");
  
          if (!this.orderItems.length) {
            alert("Your cart is empty.");
            return;
          }
  
          // إضافة الطلب إلى Firebase
          const orderData = {
            userId: user.uid,
            items: this.orderItems,
            createdAt: new Date(),
            status: "pending", // حالة الطلب
          };
          await addDoc(ordersRef, orderData);
  
          // مسح السلة
          await updateDoc(userRef, { cart: [] });
  
          alert("Order placed successfully!");
          this.$emit("confirm"); // التنقل إلى صفحة التأكيد
        } catch (error) {
          console.error("Error placing order:", error);
          alert("Failed to place order. Please try again.");
        }
      },
    },
    async created() {
      await this.fetchCart(); // جلب العناصر الموجودة في السلة عند تحميل الصفحة
    },
  };
  </script>
  
  <style scoped>
  .review-order-page {
    margin-top: 20px;
  }
  .table th,
  .table td {
    vertical-align: middle;
    text-align: center;
  }
  .img-thumbnail {
    border: none;
  }
  </style>
  