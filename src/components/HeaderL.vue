<template>
  <header class="header">
    <div class="container d-flex justify-content-between align-items-center py-3">
      <!-- Logo -->
      <div class="logo">
        <h1 class="fw-bold">OutFit</h1>
      </div>

      <!-- Navigation Links -->
      <nav class="nav">
        <ul class="nav-list d-flex list-unstyled mb-0">
       
          <li class="nav-item mx-3">
            <router-link to="/shop" class="nav-link">Shop</router-link>
          </li>
        </ul>
      </nav>

      <!-- Icons -->
      <div class="icons d-flex align-items-center">
      
        <!-- Favorites -->
        <router-link to="/fav" class="icon-link mx-2">
          <i class="fas fa-star"></i>
        </router-link>

        <!-- Cart -->
        <router-link to="/CheckOut" class="icon-link mx-2">
          <i class="fas fa-shopping-cart"></i>
        </router-link>

        <!-- Profile -->
        <router-link to="/profile" class="icon-link mx-2">
          <i class="fas fa-user"></i>
        </router-link>

        <!-- Logout -->
        <div class="icon-link mx-2" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default {
  methods: {
    async logout() {
      try {
        await signOut(auth);
        alert("Logged out successfully!");
        this.$router.push("/login");
      } catch (error) {
        alert("Failed to log out: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.nav-list .nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.icon-link {
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  color: rgb(85, 85, 85); /* لون الأيقونات */
  transition: color 0.3s ease;
}

.icon-link:hover {
  color: darkgray; /* لون عند التمرير */
}
</style>
