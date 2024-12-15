<template>
  <div class="packages-page">
    <!-- Reusable Header -->
    <HeaderP />

    <!-- Packages Section -->
    <section class="packages-section py-5">
      <div class="container">
        <h2 class="fw-bold text-center mb-4">Exclusive Packages</h2>
        <p class="text-center text-muted">
          Explore our exclusive packages and deals tailored for you.
        </p>
        <div class="row mt-4">
          <div class="col-md-4 mb-4" v-for="pkg in packages" :key="pkg.id">
            <div class="card">
              <img :src="pkg.image" class="card-img-top" :alt="pkg.name" />
              <div class="card-body">
                <h5 class="card-title">{{ pkg.name }}</h5>
                <p class="text-muted">{{ pkg.description }}</p>
                <p class="card-text">
                  <strong>${{ pkg.price.toFixed(2) }}</strong>
                </p>
                <button class="btn btn-dark w-100 mt-2">View Package</button>
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
import FooterP from "../components/FooterP.vue"; // Import Footer Component
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default {
  components: {
    HeaderP, // Reusable Header Component
    FooterP, // Reusable Footer Component
  },
  data() {
    return {
      packages: [], // Store fetched packages
    };
  },
  async mounted() {
    try {
      // Query Firebase for packages
      const packagesQuery = query(
        collection(db, "products"), // Assuming "products" collection has package data
        where("isPackage", "==", true) // Filter for packages
      );
      const packagesSnapshot = await getDocs(packagesQuery);
      this.packages = packagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  },
};
</script>

<style scoped>
.packages-page {
  background-color: #f8f9fa;
}

.packages-section .card {
  border: none;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.packages-section .card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.packages-section .card-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.packages-section .card-text {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.packages-section .btn-dark {
  border-radius: 20px;
}
</style>
