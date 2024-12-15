<template>
  <div class="login-page d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg p-4" style="max-width: 900px; border-radius: 12px;">
      <div class="row g-0">
        <!-- Left Image -->
        <div class="col-md-6 d-none d-md-block">
          <img
            :src="require('@/assets/a.png')"
            class="img-fluid rounded-start"
            alt="Login"
            style="object-fit: cover; height: 80%; border-radius: 12px 0 0 12px;"
          />
        </div>

        <!-- Login Form -->
        <div class="col-md-6 p-4">
          <h1 class="text-center fw-bold mb-4">Design Your Fashion</h1>
          <p class="text-center mb-3">Sign In To OutFit</p>
          <div class="back-btn mb-4">
            <router-link to="/" class="text-dark text-decoration-none">
              <i class="fas fa-chevron-left"></i> Back
            </router-link>
          </div>
          <!-- Login Buttons -->
          <div class="d-flex justify-content-between mb-4">
            <!-- Google Login Button -->
            <button @click="loginWithGoogle" class="btn btn-danger w-100 me-2 text-white">
              <i class="fab fa-google"></i> Sign up with Google
            </button>

            <!-- Facebook Login Button -->
            <button @click="loginWithFacebook" class="btn btn-outline-primary w-100">
              <i class="fab fa-facebook"></i> Sign up with Facebook
            </button>
          </div>

          <p class="text-center text-muted mb-4">-- OR --</p>

          <!-- Email/Password Login Form -->
          <form @submit.prevent="loginWithEmail">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <!-- Sign In Button -->
            <button type="submit" class="btn btn-dark w-100 mb-3">Sign In</button>

            <!-- Register Button -->
            <router-link
              to="/register"
              class="btn btn-light w-100 mb-3 text-dark border border-dark text-center"
            >
              Register Now
            </router-link>

            <!-- Forgot Password Link -->
            <div class="text-end">
              <router-link to="/forgot-password" class="text-muted">Forgot Password?</router-link>
            </div>
          </form>

          <p class="text-center text-muted mt-4">OutFit Terms & Conditions</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase"; // Firebase configuration

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginWithEmail() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        alert("Login successful!");
        this.$router.push("/shop"); // Redirect to the shop page
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    },
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        alert("Google Login successful!");
        this.$router.push("/shop"); // Redirect to the shop page
      } catch (error) {
        alert("Google Login failed: " + error.message);
      }
    },
    async loginWithFacebook() {
      const provider = new FacebookAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        alert("Facebook Login successful!");
        this.$router.push("/shop"); // Redirect to the shop page
      } catch (error) {
        alert("Facebook Login failed: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #f8f9fa;
}
.card {
  border-radius: 12px;
}
</style>
