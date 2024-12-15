<template>
    <div>
      <h2>Shipping Address</h2>
      
      <!-- Existing Addresses -->
      <div v-if="addresses.length > 0">
        <h4>Select a delivery address:</h4>
        <div v-for="(address, index) in addresses" :key="index" class="card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <p class="mb-0"><strong>{{ address.name }}</strong></p>
              <p class="mb-0">{{ address.line1 }}, {{ address.city }}</p>
            </div>
            <button class="btn btn-outline-primary" @click="selectAddress(address)">
              Deliver Here
            </button>
          </div>
        </div>
      </div>
      
      <!-- New Address Form -->
      <h4 class="mt-4">Add a new address</h4>
      <form @submit.prevent="saveAddress">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="newAddress.name" type="text" class="form-control" id="name" required />
        </div>
        <div class="form-group">
          <label for="address">Address</label>
          <input v-model="newAddress.line1" type="text" class="form-control" id="address" required />
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <input v-model="newAddress.city" type="text" class="form-control" id="city" required />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Save Address</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db, auth } from "@/firebase";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        addresses: [], // Stores existing addresses
        newAddress: {
          name: "",
          line1: "",
          city: "",
        },
      };
    },
    async created() {
      await this.fetchAddresses();
    },
    methods: {
      async fetchAddresses() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
          
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            this.addresses = userSnap.data().addresses || [];
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      },
      async saveAddress() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
          
          const userRef = doc(db, "users", user.uid);
          const updatedAddresses = [...this.addresses, this.newAddress];
          
          await updateDoc(userRef, { addresses: updatedAddresses });
          this.addresses = updatedAddresses;
          
          // Clear the form
          this.newAddress = { name: "", line1: "", city: "" };
          alert("Address saved successfully!");
        } catch (error) {
          console.error("Error saving address:", error);
        }
      },
      selectAddress(address) {
        console.log("Selected Address:", address);
        this.$emit("next", address); // Pass selected address to the parent
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  