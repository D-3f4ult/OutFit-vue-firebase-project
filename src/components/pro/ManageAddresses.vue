<template>
    <div class="manage-addresses">
      <h3>Manage Addresses</h3>
      <!-- Button to Add New Address -->
      <button class="btn btn-primary mb-3" @click="toggleAddAddressModal">Add New Address</button>
  
      <!-- Address List -->
      <div class="address-list">
        <div v-for="(address, index) in addresses" :key="index" class="address-item card p-3 mb-3">
          <h5>{{ address.name }}</h5>
          <p>{{ address.mobile }}</p>
          <p>{{ address.flat }}</p>
          <p>{{ address.area }}</p>
          <p>{{ address.city }}, {{ address.state }}</p>
          <p>Pin Code: {{ address.pinCode }}</p>
          <div class="d-flex justify-content-end">
            <button class="btn btn-warning btn-sm me-2" @click="editAddress(index)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteAddress(index)">Delete</button>
          </div>
        </div>
      </div>
  
      <!-- Add/Edit Address Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content p-4">
          <h4>{{ editMode ? 'Edit Address' : 'Add a New Address' }}</h4>
          <form @submit.prevent="saveAddress">
            <div class="mb-3">
              <label>Name</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Mobile Number</label>
              <input v-model="form.mobile" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Flat, House no., Building</label>
              <input v-model="form.flat" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Area, Colony, Street</label>
              <input v-model="form.area" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>City</label>
              <input v-model="form.city" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>Pin Code</label>
              <input v-model="form.pinCode" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label>State</label>
              <input v-model="form.state" type="text" class="form-control" required />
            </div>
            <div class="form-check">
              <input v-model="form.default" type="checkbox" class="form-check-input" />
              <label>Use as my default address</label>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" @click="toggleAddAddressModal">Cancel</button>
              <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Add' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { db, auth } from "@/firebase";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        addresses: [],
        showModal: false,
        editMode: false,
        currentIndex: null,
        form: {
          name: "",
          mobile: "",
          flat: "",
          area: "",
          city: "",
          pinCode: "",
          state: "",
          default: false,
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
      toggleAddAddressModal() {
        this.showModal = !this.showModal;
        if (!this.showModal) this.resetForm();
      },
      resetForm() {
        this.form = {
          name: "",
          mobile: "",
          flat: "",
          area: "",
          city: "",
          pinCode: "",
          state: "",
          default: false,
        };
        this.editMode = false;
        this.currentIndex = null;
      },
      editAddress(index) {
        this.form = { ...this.addresses[index] };
        this.editMode = true;
        this.currentIndex = index;
        this.showModal = true;
      },
      async saveAddress() {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          if (this.editMode) {
            this.addresses[this.currentIndex] = { ...this.form };
          } else {
            this.addresses.push({ ...this.form });
          }
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            addresses: this.addresses,
          });
  
          alert(this.editMode ? "Address updated!" : "Address added!");
          this.toggleAddAddressModal();
        } catch (error) {
          console.error("Error saving address:", error);
        }
      },
      async deleteAddress(index) {
        try {
          const user = auth.currentUser;
          if (!user) throw new Error("User not logged in");
  
          this.addresses.splice(index, 1);
  
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            addresses: this.addresses,
          });
  
          alert("Address deleted!");
        } catch (error) {
          console.error("Error deleting address:", error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .manage-addresses {
    padding: 20px;
  }
  .address-item {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    border-radius: 5px;
    width: 90%;
    max-width: 600px;
  }
  </style>
  