<template>
    <div class="addresses-page container">
      <h1 class="mb-4">Manage Addresses</h1>
      <button class="btn btn-primary mb-3" @click="addNewAddress">+ Add New Address</button>
      <div class="list-group">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <p class="mb-1">{{ address.name }}</p>
            <p class="text-muted mb-0">{{ address.details }}</p>
          </div>
          <div>
            <button class="btn btn-sm btn-secondary" @click="editAddress(address.id)">Edit</button>
            <button class="btn btn-sm btn-danger ms-2" @click="deleteAddress(address.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
  import { db, auth } from "../firebase";
  
  export default {
    data() {
      return {
        addresses: [],
      };
    },
    async mounted() {
      await this.fetchAddresses();
    },
    methods: {
      async fetchAddresses() {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            this.addresses = userSnap.data().addresses || [];
          }
        }
      },
      async deleteAddress(addressId) {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const addressToRemove = this.addresses.find((addr) => addr.id === addressId);
          await updateDoc(userRef, {
            addresses: arrayRemove(addressToRemove),
          });
          this.addresses = this.addresses.filter((addr) => addr.id !== addressId);
        }
      },
      addNewAddress() {
        alert("Add New Address button clicked!");
      },
      editAddress(addressId) {
        alert(`Edit address ID: ${addressId}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .addresses-page h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  