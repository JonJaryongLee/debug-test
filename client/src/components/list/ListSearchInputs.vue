<script setup>
import { ref } from "vue";

const selectedUserCategory = ref("all");
const userInputName = ref("");
const userInputMinPrice = ref(0);
const userInputMaxPrice = ref(0);
const isAvailableList = ref(false);

function getProductsByCategory() {
  emit("getProductsByCategory");
}

function getProductsByName() {
  if (userInputName.value === "" || userInputName.value.trim() === "") {
    userInputName.value = "";
    return;
  }
  emit("getProductsByName");
}

function getProductsByPrice() {
  emit("getProductsByPrice");
}

function getProductsByIsAvailable() {
  emit("getProductsByIsAvailable");
}
</script>

<template>
  <div class="search-form">
    <div class="category-search-container">
      <label class="label-title">카테고리</label>
      <select v-model="selectedUserCategory" @change="getProductsByCategory">
        <option value="all">All</option>
        <option value="MCU">MCU</option>
        <option value="sensor">sensor</option>
        <option value="communication">communication</option>
        <option value="memory">memory</option>
        <option value="power">power</option>
      </select>
    </div>

    <div class="name-search-container">
      <label class="label-title">제품명</label>
      <div class="name-search-inner">
        <input
          type="text"
          v-model="userInputName"
          placeholder="제품명을 입력하세요"
          @keyup.enter="getProductsByName"
        />
        <button @click="getProductsByName">찾기</button>
      </div>
    </div>

    <div class="price-search-container">
      <label class="label-title">가격</label>
      <div class="price-search-inner">
        <input
          type="number"
          v-model="userInputMinPrice"
          @keyup.enter="getProductsByPrice"
          placeholder="최소 가격"
        />
        <span class="tilde">~</span>
        <input
          type="number"
          v-model="userInputMaxPrice"
          @keyup.enter="getProductsByPrice"
          placeholder="최대 가격"
        />
        <button @click="getProductsByPrice">찾기</button>
      </div>
    </div>

    <div class="available-search-container">
      <label>
        <input type="checkbox" v-model="isAvailableList" @change="getProductsByIsAvailable" />
        사용 가능 여부만 보기
      </label>
    </div>
  </div>
</template>

<style scoped>
/* 부모 컨테이너 */
.search-form {
  max-width: 100vw;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

/* 라벨 공통 스타일 */
.label-title {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

/* 검색 컨테이너 상하 간격 */
.category-search-container,
.name-search-container,
.price-search-container,
.available-search-container {
  margin-bottom: 16px;
}

/* 입력창, 셀렉트, 버튼 기본 스타일 */
input[type="text"],
input[type="number"],
select {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

button {
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  margin-left: 8px;
  transition: background 0.2s;
}

/* 버튼 호버 효과 */
button:hover {
  background: #eee;
}

/* name-search와 price-search 내부에서 라벨/버튼/인풋 정렬 */
.name-search-inner,
.price-search-inner {
  display: flex;
  align-items: center;
}

/* 숫자 입력 간 ~ 기호 */
.tilde {
  margin: 0 8px;
}

/* 체크박스 라벨은 인라인으로 유지 */
.available-search-container label {
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

/* 체크박스 자체 약간의 마진 */
.available-search-container input[type="checkbox"] {
  margin-right: 6px;
}
</style>
