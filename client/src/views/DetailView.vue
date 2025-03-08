<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const isLoading = ref(true);
const is404 = ref(false);
const product = ref({});

function goBack() {
  router.push("/products");
}

async function getProduct() {
  try {
    const response = await axios.get(`${SERVER_URL}/products/${productId}`);
    if (response.status === 200) {
      product.value = response.data;
    }
  } catch (error) {
    if (error.status === 404) {
      is404.value = true;
    }
  } finally {
    isLoading.value = false;
  }
}

getProduct();
</script>

<template>
  <div class="detail-root">
    <p v-if="isLoading" class="loading">loading...</p>
    <div v-else>
      <div class="header-container">
        <div class="back-container" @click="goBack">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>뒤로가기</span>
        </div>
      </div>
      <div v-if="is404" class="not-found-wrapper">
        <p>404 Not Found</p>
      </div>
      <div v-else class="detail-container">
        <h2>제품 상세 정보</h2>
        <table class="detail-table">
          <tbody>
            <tr>
              <td class="label">ID:</td>
              <td class="value">{{ product.product_id }}</td>
            </tr>
            <tr>
              <td class="label">카테고리:</td>
              <td class="value">{{ product.category }}</td>
            </tr>
            <tr>
              <td class="label">제품명:</td>
              <td class="value">{{ product.name }}</td>
            </tr>
            <tr>
              <td class="label">가격:</td>
              <td class="value">{{ product.price }}</td>
            </tr>
            <tr>
              <td class="label">사용 가능 여부:</td>
              <td class="value">{{ product.is_available }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 루트 컴포넌트 기본 스타일 */
.detail-root {
  max-width: 960px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  color: #333;
}

/* 헤더 및 뒤로가기 버튼 */
.header-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.back-container {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.back-container span.material-symbols-outlined {
  margin-right: 6px;
}
.back-container:hover {
  background-color: #dcdcdc;
  color: #e91e63;
}

/* 404 Not Found 스타일 */
.not-found-wrapper {
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
}
.not-found-wrapper > p {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #e74c3c;
}

/* 제품 상세정보 카드 및 테이블 */
.detail-container {
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.detail-container h2 {
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: #555;
}

/* 테이블 스타일 */
.detail-table {
  width: 100%;
  border-collapse: collapse;
}
.detail-table .label {
  font-weight: bold;
  padding: 12px 8px;
  width: 150px;
  background: #ececec;
  text-align: right;
  vertical-align: top;
}
.detail-table .value {
  padding: 12px 8px;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
}

.detail-table tr:last-child .value {
  border-bottom: none;
}
</style>
