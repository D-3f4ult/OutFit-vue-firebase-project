<template>
  <section class="arrivals py-5">
    <div class="container">
      <h2 class="text-center mb-4">New Arrivals</h2>
      <p class="text-center text-muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin.
      </p>
      <!-- الفلاتر -->
      <div class="d-flex justify-content-center mb-4">
        <button 
          v-for="(category, index) in categories" 
          :key="index" 
          @click="filterCategory(category)" 
          :class="['btn', selectedCategory === category ? 'btn-dark' : 'btn-light', 'mx-2']">
          {{ category }}
        </button>
      </div>
      <!-- المنتجات -->
      <div class="row">
        <div class="col-md-4 mb-4" v-for="product in filteredProducts" :key="product.id">
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
                <!-- تحقق من الكمية -->
                <span v-if="product.quantity < 10" class="text-danger">Almost Sold Out</span>
                <span v-else class="text-success">{{ product.quantity }} in Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- زر المزيد -->
      <div class="text-center">
        <button class="btn btn-dark">View More</button>
      </div>
    </div>
  </section>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      categories: ["Men's Fashion", "Women's Fashion", "Women Accessories", "Men Accessories", "Discount Deals"],
      selectedCategory: "Women's Fashion",
    };
  },
  async mounted() {
    try {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      this.products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.filterCategory(this.selectedCategory);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    filterCategory(category) {
      this.selectedCategory = category;
      this.filteredProducts = this.products.filter((product) => product.category === category);
    },
  },
};
</script>

<style scoped>
.arrivals h2 {
  font-size: 2rem;
  font-weight: bold;
}
.arrivals .btn {
  border-radius: 20px;
}
.card {
  border: none;
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}
.card-title {
  font-weight: bold;
  font-size: 1.1rem;
}
.card-text {
  font-size: 1rem;
}
</style>
