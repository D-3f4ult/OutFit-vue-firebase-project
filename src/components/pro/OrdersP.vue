<template>
    <div>
      <h3>My Orders</h3>
      <div v-if="orders.length">
        <div
          v-for="(order, index) in orders"
          :key="index"
          class="card mb-3 p-3"
        >
          <h5>{{ order.productName }}</h5>
          <p>Price: ${{ order.price }}</p>
          <p>Status: {{ order.status }}</p>
          <button class="btn btn-danger btn-sm" @click="cancelOrder(index)">
            Cancel Order
          </button>
        </div>
      </div>
      <p v-else>No orders found.</p>
    </div>
  </template>
  
  <script>
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    async created() {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      this.orders = ordersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    methods: {
      async cancelOrder(index) {
        const order = this.orders[index];
        const orderRef = doc(db, "orders", order.id);
        await deleteDoc(orderRef);
        this.orders.splice(index, 1);
        alert("Order canceled!");
      },
    },
  };
  </script>
  