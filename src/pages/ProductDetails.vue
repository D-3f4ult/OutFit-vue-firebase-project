<template>
    <div class="product-details">
      <!-- Header -->
      <HeaderL />
  
      <!-- Breadcrumb -->
      <div class="breadcrumb my-4 container">
        <p>Shop > {{ product.name }}</p>
      </div>
  
      <div class="container">
        <div class="row">
          <!-- Product Images -->
          <div class="col-md-6">
            <img :src="product.image" alt="Product Image" class="img-fluid mb-3" />
          </div>
  
          <!-- Product Details -->
          <div class="col-md-6">
            <h1>{{ product.name }}</h1>
            <p class="text-muted">Brand: {{ product.brand }}</p>
            <p class="price">
              <span class="text-success">${{ product.price }}</span>
            </p>
            <p class="text-muted">{{ product.description || 'No description available.' }}</p>
  
            <!-- Colors -->
            <div class="colors mt-3">
              <h5>Color:</h5>
              <div class="d-flex">
                <div
                  v-for="color in product.colors || []"
                  :key="color"
                  class="color-box"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
  
            <!-- Sizes -->
            <div class="sizes mt-3">
              <h5>Size:</h5>
              <div class="d-flex">
                <button
                  v-for="size in product.sizes || []"
                  :key="size"
                  class="btn btn-outline-dark btn-sm me-2"
                >
                  {{ size }}
                </button>
              </div>
            </div>
  
            <!-- Add to Cart -->
            <div class="d-flex align-items-center mt-4">
              <button class="btn btn-dark me-3" @click="addToCart">Add to Cart</button>
              <button class="btn btn-outline-danger" @click="toggleFavorite">
                <i class="fas" :class="isFavorite ? 'fa-heart' : 'fa-heart-o'"></i>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Related Products -->
        <div class="related-products mt-5">
          <h3>Related Products</h3>
          <div class="row">
            <div
              class="col-md-3"
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
            >
              <div class="card">
                <img :src="relatedProduct.image" class="card-img-top" alt="Product Image" />
                <div class="card-body">
                  <h5 class="card-title">{{ relatedProduct.name }}</h5>
                  <p class="card-text">${{ relatedProduct.price }}</p>
                  <router-link :to="'/product/' + relatedProduct.id" class="btn btn-dark">
                    View Product
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <FooterP />
    </div>
  </template>
  
  <script>
  import HeaderL from "@/components/HeaderL.vue";
  import FooterP from "@/components/FooterP.vue";
  import { doc, getDoc, collection, query, getDocs, where } from "firebase/firestore";
  import { db } from "@/firebase";
  
  export default {
    components: { HeaderL, FooterP },
    data() {
      return {
        product: {},
        relatedProducts: [],
        isFavorite: false,
      };
    },
    async created() {
      const productId = this.$route.params.id;
      await this.fetchProductDetails(productId);
      await this.fetchRelatedProducts();
    },
    methods: {
      async fetchProductDetails(productId) {
        try {
          const productRef = doc(db, "products", productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            this.product = productSnap.data();
          } else {
            console.error("No such product!");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      },
      async fetchRelatedProducts() {
        try {
          if (!this.product.category && !this.product.brand) return;
  
          const productsRef = collection(db, "products");
          const q = query(
            productsRef,
            where("category", "==", this.product.category) // جلب المنتجات بناءً على الفئة
          );
          const querySnapshot = await getDocs(q);
  
          this.relatedProducts = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((relatedProduct) => relatedProduct.id !== this.$route.params.id); // استثناء المنتج الحالي
        } catch (error) {
          console.error("Error fetching related products:", error);
        }
      },
      addToCart() {
        alert("Product added to cart!");
      },
      toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        alert(this.isFavorite ? "Added to favorites!" : "Removed from favorites!");
      },
    },
  };
  </script>
  
  <style scoped>
  .product-details {
    background-color: #f8f9fa;
  }
  .breadcrumb {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
  }
  .colors .color-box {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }
  .related-products h3 {
    margin-bottom: 20px;
  }
  </style>
  