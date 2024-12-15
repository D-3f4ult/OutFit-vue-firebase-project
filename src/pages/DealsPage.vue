<template>
    <div class="deals-page">
      <!-- استدعاء Header -->
      <HeaderP />
      
      <!-- محتوى صفحة Deals -->
      <section class="deals-section py-5">
        <div class="container">
          <h2 class="fw-bold text-center mb-4">Deals of the Day</h2>
          <p class="text-center text-muted">
            Discover the best deals available now. Get your favorite products at amazing discounts.
          </p>
          <div class="row">
            <div class="col-md-4" v-for="deal in deals" :key="deal.id">
              <div class="card">
                <img :src="deal.image" class="card-img-top" :alt="deal.name" />
                <div class="card-body">
                  <h5 class="card-title">{{ deal.name }}</h5>
                  <p class="text-muted">
                    <span class="text-decoration-line-through">${{ deal.originalPrice }}</span>
                    <span class="fw-bold">${{ deal.discountedPrice }}</span>
                  </p>
                  <button class="btn btn-dark w-100">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterP />
    </div>
  </template>
  
  <script>
  import HeaderP from '../components/HeaderP.vue'; // تأكد من مسار المكون
  import FooterP from '../components/FooterP.vue'; // تأكد من مسار المكون

  import { collection, query, where, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    components: {
      HeaderP,
      FooterP, // استيراد Header
    },
    data() {
      return {
        deals: [], // المنتجات المخفضة
      };
    },
    async mounted() {
      try {
        const dealsQuery = query(
          collection(db, "products"),
          where("isDiscounted", "==", true)
        );
        const dealsSnapshot = await getDocs(dealsQuery);
        this.deals = dealsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
  };
  </script>
  
  <style scoped>
  .deals-page {
    background-color: #f8f9fa;
  }
  .deals-section .card {
    border: none;
    transition: transform 0.3s;
  }
  .deals-section .card:hover {
    transform: scale(1.05);
  }
  </style>
  