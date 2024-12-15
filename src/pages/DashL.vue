<template>
  <div v-if="activeSection === 'products'">
    <h2 class="mb-4">Products</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.brand }}</td>
          <td><img :src="product.image" alt="Product Image" width="50" /></td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              @click="confirmDeleteProduct(product.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="mt-5">Add New Product</h3>
    <form @submit.prevent="addProduct" class="row g-3">
      <div class="col-md-4">
        <input
          v-model="newProduct.name"
          placeholder="Product Name"
          required
          class="form-control"
        />
      </div>
      <div class="col-md-4">
        <input
          v-model.number="newProduct.price"
          placeholder="Price"
          required
          type="number"
          min="0"
          class="form-control"
        />
      </div>
      <div class="col-md-4">
        <input
          v-model.number="newProduct.stock"
          placeholder="Stock"
          required
          type="number"
          min="0"
          class="form-control"
        />
      </div>
      <div class="col-md-6">
        <input
          v-model="newProduct.category"
          placeholder="Category"
          required
          class="form-control"
        />
      </div>
      <div class="col-md-6">
        <input
          v-model="newProduct.brand"
          placeholder="Brand"
          required
          class="form-control"
        />
      </div>
      <div class="col-md-12">
        <input
          type="file"
          @change="onFileChange"
          class="form-control"
          required
        />
      </div>
      <div class="col-12">
        <button
          type="submit"
          class="btn btn-success"
          :disabled="loading"
        >
          {{ loading ? "Adding..." : "Add Product" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { db, storage } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      products: [],
      newProduct: {
        name: "",
        price: 0,
        stock: 0,
        category: "",
        brand: "",
        image: "",
      },
      selectedFile: null,
      loading: false, // Loading state for actions
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        this.products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async addProduct() {
      if (this.loading) return; // Prevent duplicate submissions

      try {
        this.loading = true;

        if (!this.selectedFile) {
          alert("Please select an image.");
          return;
        }

        // Upload image to Firebase Storage
        const storageRef = ref(storage, `products/${Date.now()}_${this.selectedFile.name}`);
        await uploadBytes(storageRef, this.selectedFile);

        // Get download URL
        const imageUrl = await getDownloadURL(storageRef);

        // Add product to Firestore
        const productData = { ...this.newProduct, image: imageUrl };
        const docRef = await addDoc(collection(db, "products"), productData);

        // Add product locally
        this.products.push({ id: docRef.id, ...productData });

        // Reset form
        this.newProduct = { name: "", price: 0, stock: 0, category: "", brand: "", image: "" };
        this.selectedFile = null;
        alert("Product added successfully!");
      } catch (error) {
        console.error("Error adding product:", error);
      } finally {
        this.loading = false;
        // Reset file input
        this.$refs.fileInput.value = "";
      }
    },
    confirmDeleteProduct(productId) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.deleteProduct(productId);
      }
    },
    async deleteProduct(productId) {
      try {
        await deleteDoc(doc(db, "products", productId));
        this.products = this.products.filter((product) => product.id !== productId);
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
  async created() {
    await this.fetchProducts();
  },
};
</script>

<style scoped>
img {
  border-radius: 4px;
}
</style>
