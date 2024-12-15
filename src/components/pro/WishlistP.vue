<template>
    <div>
      <h3>My Wishlist</h3>
      <div v-if="favorites.length" class="row">
        <div
          v-for="(item, index) in favorites"
          :key="index"
          class="col-md-4 mb-3"
        >
          <div class="card p-3">
            <!-- إضافة الصورة -->
            <img
              :src="item.image || 'https://via.placeholder.com/150'"
              class="card-img-top mb-2"
              :alt="item.name"
            />
            <h5>{{ item.name }}</h5>
            <p>Price: ${{ item.price }}</p>
            <button
              class="btn btn-danger btn-sm"
              @click="removeFromFavorites(item.id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <p v-else>No items in wishlist.</p>
    </div>
  </template>
  <script>
  import { collection, getDocs, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
  import { db, auth } from "@/firebase";
  
  export default {
    data() {
      return {
        favorites: [],
        products: [],
      };
    },
    async created() {
      await this.fetchProducts();
      await this.fetchFavorites();
    },
    methods: {
      async fetchProducts() {
        try {
          const productsCollection = collection(db, "products");
          const productsSnapshot = await getDocs(productsCollection);
          this.products = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
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
            const favoriteIds = userSnap.data().favorites || [];
            this.favorites = this.products.filter((product) =>
              favoriteIds.includes(product.id)
            );
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      },
      async removeFromFavorites(productId) {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            favorites: arrayRemove(productId),
          });
  
          this.favorites = this.favorites.filter(
            (product) => product.id !== productId
          );
          alert("Item removed from wishlist!");
        } catch (error) {
          console.error("Error removing from favorites:", error);
        }
      },
    },
  };
  </script>
  