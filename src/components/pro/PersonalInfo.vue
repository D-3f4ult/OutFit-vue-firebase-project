<template>
    <div>
      <h3>Personal Information</h3>
      <form @submit.prevent="updateInfo">
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input
            v-model="user.firstName"
            type="text"
            class="form-control"
            id="firstName"
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            v-model="user.lastName"
            type="text"
            class="form-control"
            id="lastName"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            id="email"
            disabled
          />
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </template>
  
  <script>
import { db } from "@/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  export default {
    data() {
      return {
        userId: null, // لتخزين معرف المستخدم
        user: {
          firstName: "",
          lastName: "",
          email: "",
        },
      };
    },
    async created() {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser; // جلب المستخدم الحالي
  
        if (currentUser) {
          this.userId = currentUser.uid; // تخزين معرف المستخدم
          const userRef = doc(db, "users", this.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            this.user = userSnap.data();
          }
        } else {
          alert("No user is logged in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    methods: {
      async updateInfo() {
        try {
          const userRef = doc(db, "users", this.userId);
          await updateDoc(userRef, this.user);
          alert("Profile updated!");
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile.");
        }
      },
    },
  };
  </script>
  