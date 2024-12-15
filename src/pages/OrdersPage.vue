<template>
    <div class="orders-page container my-5">
      <h1 class="text-center mb-4">My Orders</h1>
      <div v-if="orders.length" class="row">
        <div
          v-for="(order, index) in orders"
          :key="index"
          class="col-md-6 mb-4"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order #{{ order.orderId }}</h5>
              <p><strong>Date:</strong> {{ formatDate(order.date) }}</p>
              <p><strong>Total:</strong> ${{ order.total }}</p>
              <p><strong>Status:</strong> <span :class="getStatusClass(order.status)">{{ order.status }}</span></p>
              <button class="btn btn-primary" @click="viewOrderDetails(order.orderId)">View Details</button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-muted">You have no orders yet.</p>
    </div>
  </template>
  
  <script>
  import { auth, db } from "../firebase";
  import { collection, getDocs, query, where } from "firebase/firestore";
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    async created() {
      await this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const ordersCollection = collection(db, "orders");
          const ordersQuery = query(ordersCollection, where("userId", "==", user.uid));
          const ordersSnapshot = await getDocs(ordersQuery);
  
          this.orders = ordersSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      },
      formatDate(date) {
        const d = new Date(date);
        return d.toLocaleDateString();
      },
      getStatusClass(status) {
        if (status === "Delivered") return "text-success";
        if (status === "Pending") return "text-warning";
        if (status === "Canceled") return "text-danger";
        return "text-muted";
      },
      viewOrderDetails(orderId) {
        this.$router.push(`/orders/${orderId}`); // Redirect to order details page
      },
    },
  };
  </script>
  
  <style scoped>
  .orders-page {
    margin-top: 40px;
  }
  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .card-title {
    margin-bottom: 10px;
  }
  .text-success {
    color: #28a745 !important;
  }
  .text-warning {
    color: #ffc107 !important;
  }
  .text-danger {
    color: #dc3545 !important;
  }
  </style>
  