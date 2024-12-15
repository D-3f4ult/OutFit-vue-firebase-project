<template>
  <div class="shop-page container-fluid">
    <!-- Header -->
    <HeaderL />
    <!-- Breadcrumb -->
    <div class="breadcrumb my-4">
      <p>Shop > All Products</p>
    </div>
    <!-- Content -->
    <div class="row">
      <!-- Filters Section -->
      <aside class="col-md-3">
        <div class="filters">
          <div class="filter-category mb-4">
            <h5>Product Categories</h5>
            <ul>
              <li v-for="category in categories" :key="category">
                <input type="checkbox" :value="category" v-model="selectedCategories" />
                <label>{{ category }}</label>
              </li>
            </ul>
          </div>
          <div class="filter-price mb-4">
            <h5>Filter by Price</h5>
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              v-model="priceRange"
              class="form-range"
            />
            <p>Price: $0 - ${{ priceRange }}</p>
          </div>
          <div class="filter-color mb-4">
            <h5>Filter by Color</h5>
            <ul>
              <li v-for="color in colors" :key="color">
                <input type="checkbox" :value="color" v-model="selectedColors" />
                <label>{{ color }}</label>
              </li>
            </ul>
          </div>
          <div class="filter-size mb-4">
            <h5>Filter by Size</h5>
            <ul>
              <li v-for="size in sizes" :key="size">
                <input type="checkbox" :value="size" v-model="selectedSizes" />
                <label>{{ size }}</label>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <!-- Products Section -->
      <main class="col-md-9">
        <div class="row">
          <div
            class="col-md-4 mb-4"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <div class="card">
              <!-- Product Image -->
              <router-link :to="`/product/${product.id}`" class="product-img">
                <img :src="product.image" class="card-img-top" :alt="product.name" />
              </router-link>
              <div class="product-icons">
                <button class="icon-btn" :class="{ active: isFavorite(product.id) }" @click="toggleFavorite(product)">
                  <i class="fas" :class="{ 'fa-heart': isFavorite(product.id), 'fa-heart-o': !isFavorite(product.id) }"></i>
                </button>
                <button class="icon-btn">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="icon-btn" @click="addToCart(product)">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
              <div class="card-body">
                <router-link :to="`/product/${product.id}`" class="text-decoration-none text-dark">
                  <h5 class="card-title">{{ product.name }}</h5>
                </router-link>
                <p class="card-text">${{ product.price }}</p>
                <button class="btn btn-dark w-100" @click="addToCart(product)">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <!-- Footer -->
    <FooterP />
  </div>
</template>

<script>
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";
import HeaderL from "../components/HeaderL.vue";
import FooterP from "../components/FooterP.vue";

export default {
  components: {
    HeaderL,
    FooterP,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      favorites: [],
      categories: ["Men", "Women", "Kids", "Bags", "Watches", "Accessories", "Winter Wear"],
      selectedCategories: [],
      colors: ["Red", "Blue", "Orange", "Black", "Green", "Yellow"],
      selectedColors: [],
      sizes: ["S", "M", "L", "XL", "XXL"],
      selectedSizes: [],
      priceRange: 2000,
    };
  },
  async mounted() {
    await this.fetchProducts();
    await this.fetchFavorites();
  },
  watch: {
    selectedCategories: "filterProducts",
    selectedColors: "filterProducts",
    selectedSizes: "filterProducts",
    priceRange: "filterProducts",
  },
  methods: {
    async fetchProducts() {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        this.products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        this.filteredProducts = this.products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchFavorites() {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          this.favorites = userSnap.data().favorites || [];
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    },
    filterProducts() {
      this.filteredProducts = this.products.filter((product) => {
        const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category);
        const matchesColor = this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
        const matchesSize = this.selectedSizes.length === 0 || this.selectedSizes.includes(product.size);
        const matchesPrice = product.price <= this.priceRange;
        return matchesCategory && matchesColor && matchesSize && matchesPrice;
      });
    },
    async toggleFavorite(product) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const userRef = doc(db, "users", user.uid);
        const isFav = this.isFavorite(product.id);

        if (isFav) {
          await updateDoc(userRef, {
            favorites: arrayRemove(product.id),
          });
          this.favorites = this.favorites.filter((id) => id !== product.id);
        } else {
          await updateDoc(userRef, {
            favorites: arrayUnion(product.id),
          });
          this.favorites.push(product.id);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
    isFavorite(productId) {
      return this.favorites.includes(productId);
    },
    async addToCart(product) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userCart = userSnap.exists() ? userSnap.data().cart || [] : [];
        const updatedCart = [...userCart, { ...product, quantity: 1 }];
        await updateDoc(userRef, { cart: updatedCart });
        alert("Product added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
  },
};
</script>

<style scoped>
.shop-page {
  background-color: #f8f9fa;
}
.filters {
  border-right: 1px solid #ddd;
  padding-right: 15px;
}
.filters h5 {
  font-weight: bold;
}
.filters ul {
  list-style: none;
  padding: 0;
}
.filters ul li {
  margin-bottom: 10px;
}
.card {
  border: none;
  transition: transform 0.3s;
  position: relative;
}
.card:hover {
  transform: scale(1.05);
}
.product-img {
  position: relative;
}
.product-icons {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.icon-btn {
  border: none;
  background: white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.icon-btn:hover {
  transform: scale(1.1);
}
.icon-btn.active {
  background: #ff4d4f;
  color: white;
}
</style>
