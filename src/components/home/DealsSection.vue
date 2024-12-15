<template>
  <section class="deals-of-the-month py-5">
    <div class="container">
      <div class="row align-items-center">
        <!-- النص والزر -->
        <div class="col-lg-4 col-md-12 text-center text-lg-start">
          <h2 class="fw-bold">Deals Of The Month</h2>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
          </p>
          <button class="btn btn-dark btn-lg mb-4">Buy Now</button>
          <!-- العداد التنازلي -->
          <div class="countdown d-flex justify-content-center justify-content-lg-start">
            <div class="time-box me-3 text-center">
              <h3 class="fw-bold mb-0">{{ countdown.days }}</h3>
              <p class="text-muted mb-0">Days</p>
            </div>
            <div class="time-box me-3 text-center">
              <h3 class="fw-bold mb-0">{{ countdown.hours }}</h3>
              <p class="text-muted mb-0">Hr</p>
            </div>
            <div class="time-box me-3 text-center">
              <h3 class="fw-bold mb-0">{{ countdown.minutes }}</h3>
              <p class="text-muted mb-0">Mins</p>
            </div>
            <div class="time-box text-center">
              <h3 class="fw-bold mb-0">{{ countdown.seconds }}</h3>
              <p class="text-muted mb-0">Sec</p>
            </div>
          </div>
        </div>

        <!-- السلايدر -->
        <div class="col-lg-8 col-md-12">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button
                v-for="(product, index) in products"
                :key="index"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                aria-current="index === 0 ? 'true' : undefined"
                aria-label="'Slide ' + (index + 1)"
              ></button>
            </div>
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(product, index) in products"
                :key="index"
                :class="{ active: index === 0 }"
              >
                <img :src="product.image" class="d-block w-100" :alt="product.name" />
                <div class="carousel-caption d-none d-md-block">
                  <h5>{{ product.name }}</h5>
                  <p>{{ product.discount }}% OFF</p>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"; // استيراد Firestore
import { db } from "../../firebase"; // استيراد إعدادات Firebase

export default {
  data() {
    return {
      products: [], // المنتجات من Firebase
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      targetDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 أيام من الآن
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const productsCollection = collection(db, "products"); // اسم المجموعة في Firebase
        const productsSnapshot = await getDocs(productsCollection);
        this.products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // جلب بيانات كل منتج
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    updateCountdown() {
      const now = new Date();
      const diff = this.targetDate - now;
      this.countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.countdown.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.countdown.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    },
  },
  mounted() {
    this.fetchProducts(); // جلب المنتجات عند تحميل الصفحة
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000); // تحديث العداد كل ثانية
  },
};
</script>

<style scoped>
.deals-of-the-month {
  background-color: #f8f9fa;
}
.countdown .time-box {
  width: 80px;
}
.time-box h3 {
  font-size: 1.5rem;
}
.carousel img {
  height: 350px;
  object-fit: cover;
}
</style>
