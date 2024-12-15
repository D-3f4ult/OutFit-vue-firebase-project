<template>
  <section class="product-highlight py-5">
    <div class="container">
      <div class="row align-items-center">
        <!-- صورة المنتج -->
        <div class="col-md-6">
          <div class="position-relative">
            <img
              :src="product.image"
              alt="Product Image"
              class="img-fluid rounded"
            />
            <!-- التسميات التوضيحية -->
            <div
              v-for="(label, index) in product.labels"
              :key="index"
              class="label position-absolute"
              :style="{ top: label.top, left: label.left }"
            >
              {{ label.text }}
            </div>
          </div>
        </div>

        <!-- تفاصيل المنتج -->
        <div class="col-md-6">
          <p class="text-uppercase text-muted">{{ product.category }}</p>
          <h2 class="fw-bold">{{ product.name }}</h2>
          <p class="fw-bold">DESCRIPTION</p>
          <p class="text-muted">{{ product.description }}</p>

          <!-- الحجم -->
          <div class="size-section mb-3">
            <span class="fw-bold">Size:</span>
            <span class="badge bg-dark text-white ms-2">{{ product.size }}</span>
          </div>

          <!-- السعر -->
          <div class="price-section mb-3">
            <h3 class="fw-bold">${{ product.price }}</h3>
          </div>

          <!-- زر الشراء -->
          <button class="btn btn-dark btn-lg">Buy Now</button>
        </div>
      </div>

      <!-- الميزات الإضافية -->
      <div class="row mt-5 text-center">
        <div class="col-md-3">
          <i class="fas fa-star fa-2x mb-2"></i>
          <p class="fw-bold">High Quality</p>
          <p class="text-muted">Crafted from top materials</p>
        </div>
        <div class="col-md-3">
          <i class="fas fa-shield-alt fa-2x mb-2"></i>
          <p class="fw-bold">Warranty Protection</p>
          <p class="text-muted">Over 2 years</p>
        </div>
        <div class="col-md-3">
          <i class="fas fa-shipping-fast fa-2x mb-2"></i>
          <p class="fw-bold">Free Shipping</p>
          <p class="text-muted">Order over $150</p>
        </div>
        <div class="col-md-3">
          <i class="fas fa-headset fa-2x mb-2"></i>
          <p class="fw-bold">24/7 Support</p>
          <p class="text-muted">Dedicated support</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // إعداد Firebase

export default {
  data() {
    return {
      product: {}, // المنتج الجديد
    };
  },
  async mounted() {
    try {
      // استعلام لجلب المنتج الجديد
      const productsQuery = query(
        collection(db, "products"),
        where("isNew", "==", true)
      );
      const productsSnapshot = await getDocs(productsQuery);
      if (!productsSnapshot.empty) {
        const productData = productsSnapshot.docs[0].data();
        this.product = {
          name: productData.name,
          image: productData.image,
          category: productData.category,
          description: productData.description,
          size: productData.size,
          price: productData.price,
          labels: productData.labels || [], // التسميات
        };
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  },
};
</script>

<style scoped>
.product-highlight img {
  max-width: 100%;
  border-radius: 12px;
}
.label {
  background: black;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
}
.size-section .badge {
  font-size: 1rem;
}
.price-section h3 {
  color: #333;
}
</style>
