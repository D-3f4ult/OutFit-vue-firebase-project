<template>
    <div class="new-arrivals-page">
      <!-- Reusable Header -->
      <HeaderP />
  
      <!-- New Arrivals Section -->
      <section class="arrivals-section py-5">
        <div class="container">
          <h2 class="fw-bold text-center mb-4">New Arrivals</h2>
          <p class="text-center text-muted">
            Explore our latest collection of products added recently. Get them before they're gone!
          </p>
          <div class="row mt-4">
            <div class="col-md-4 mb-4" v-for="product in newArrivals" :key="product.id">
              <div class="card">
                <img :src="product.image" class="card-img-top" :alt="product.name" />
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="text-muted">{{ product.brand }}</p>
                  <p class="card-text">
                    <strong>${{ product.price }}</strong>
                  </p>
                  <div class="d-flex justify-content-between">
                    <span class="text-warning">
                      <i class="fas fa-star"></i> {{ product.rating }}
                    </span>
                    <span v-if="product.quantity < 5" class="text-danger">Almost Sold Out</span>
                  </div>
                  <button class="btn btn-dark w-100 mt-2">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Reusable Footer -->
      <FooterP />
    </div>
  </template>
  
  <script>
  import HeaderP from "../components/HeaderP.vue";
  import FooterP from "../components/FooterP.vue"; // Import FooterP
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    components: {
      HeaderP, // Reusable Header
      FooterP, // Reusable Footer
    },
    data() {
      return {
        newArrivals: [], // New arrival products
      };
    },
    async mounted() {
      try {
        const newArrivalsQuery = query(
          collection(db, "products"),
          where("isNew", "==", true) // Assuming "isNew" field is in your Firebase database
        );
        const newArrivalsSnapshot = await getDocs(newArrivalsQuery);
        this.newArrivals = newArrivalsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  .new-arrivals-page {
    background-color: #f8f9fa;
  }
  
  .arrivals-section .card {
    border: none;
    transition: transform 0.3s ease;
  }
  
  .arrivals-section .card:hover {
    transform: scale(1.05);
  }
  
  .arrivals-section .card-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .arrivals-section .card-text {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  </style>
  