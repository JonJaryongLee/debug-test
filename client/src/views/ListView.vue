<script setup>
import ListSearchInputs from "@/components/list/ListSearchInputs.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const router = useRouter();
const products = ref([]);
const isLoading = ref(true);

function goToDetailPage(productId) {
  router.push(`/products/${productId}`);
}

function getProducts() {
  isLoading.value = true;
  try {
    const response = axios.get(`${SERVER_URL}/product/all`);
    products = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function getProductsByCategory(selectedUserCategory) {
  isLoading.value = true;
  try {
    if (selectedUserCategory === "all") {
      await getProducts();
    } else {
      const response = await axios.get(`${SERVER_URL}/products/category/${selectedUserCategory}`);
      products.value = response.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function getProductsByName(userInputName) {
  isLoading.value = true;
  try {
    const response = await axios.get(`${SERVER_URL}/products/name/${userInputName}`);
    products.value = response.data;
  } catch (error) {
    if (error.status === 404) {
      alert(error.response.data.message);
    }
  } finally {
    isLoading.value = false;
  }
}

async function getProductsByPrice(userInputMaxPrice, userInputMinPrice) {
  isLoading.value = true;
  try {
    const response = await axios.get(
      `${SERVER_URL}/products/price/${userInputMaxPrice}/${userInputMinPrice}`
    );
    products.value = response.data;
  } catch (error) {
    if (error.status === 404) {
      alert(error.response.data.message);
    }
  } finally {
    isLoading.value = false;
  }
}

async function getProductsByIsAvailable(isAvailableList) {
  isLoading.value = true;
  try {
    if (isAvailableList === true) {
      const response = await axios.get(`${SERVER_URL}/products/available/true`);
      products.value = response.data;
    } else {
      await getProducts();
    }
  } catch (error) {
    if (error.status === 404) {
      alert(error.response.data.message);
    }
  } finally {
    isLoading.value = false;
  }
}

getProducts();
</script>

<template>
  <div class="main-container">
    <ListSearchInputs />
    <p v-if="isLoading" class="loading">loading...</p>
    <table v-else class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>카테고리</th>
          <th>제품명</th>
          <th>가격</th>
          <th>사용 가능 여부</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.product_id"
          @click="goToDetailPage(product.product_id)"
        >
          <td class="product-id">{{ product.product_id }}</td>
          <td class="category">{{ product.category }}</td>
          <td class="name">{{ product.name }}</td>
          <td class="price">{{ product.price }}</td>
          <td class="is-available">
            <span class="available" v-if="product.is_available">O</span>
            <span class="unavailable" v-else>X</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.main-container {
  height: 80vh;
  overflow-y: auto;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 12px 20px;
  text-align: left;
}

.product-table th {
  background-color: #f8f8f8;
  font-weight: bold;
}

.product-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-table tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.available,
.unavailable {
  font-weight: bold;
}

.available {
  color: green;
}

.unavailable {
  color: red;
}
</style>
