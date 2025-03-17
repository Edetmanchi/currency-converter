<template>
  <div>
    <div class=" py-20 justify-center items-center bg-purple-600">
      <h1 class="mx-auto text-6xl text-center justify-center text-white font-bold">Currency Converter</h1>                                                                                                                                                                                                                                   
    </div>
    <div class="flex items-center justify-center gap-16 py-20">
    <div>
      <label class='font-bold text-3xl text-slate-800 ' for="amount">Amount:</label>
      <input class='w-60 h-22 font-bold text-lg' id="amount" type="number" v-model="amount" placeholder="Enter amount" />
    </div>
    <div>
      <label class='font-bold text-3xl pr-2 text-slate-800' for="from">From:</label>
      <select id="from" class='w-60 h-22 gap-20' v-model="fromCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>
    <div>
      <label class='font-bold text-3xl text-slate-800 pr-2' for="to">To:</label>
      <select class='w-60 h-22' id="to" v-model="toCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>
    </div>
    <div v-if="loading">Loading exchange rates...</div>
      <div class=' border-1 border-solid rounded-lg mx-auto px-3 w-72 py-5 items-center justify-center' v-else>
        <h2 class='text-white  text-center font-bold text-2xl'>Converted Amount:</h2>
        <p class=' text-center font-bold text-5xl'>{{ convertedAmount }}</p>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useExchangeRates } from '~/composables/useStockData';

const amount = ref(1);
const fromCurrency = ref('USD');
const toCurrency = ref('EUR');
const convertedAmount = ref(0);

const currencies = ref(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'NZD']);

const { exchangeRates, loading, error, fetchExchangeRates } = useExchangeRates();
fetchExchangeRates();

// Watcher to update the converted amount
watch([amount, fromCurrency, toCurrency, exchangeRates], () => {
  if (
    !loading.value &&
    exchangeRates.value[fromCurrency.value] &&
    exchangeRates.value[toCurrency.value]
  ) {
    const fromRate = exchangeRates.value[fromCurrency.value];
    const toRate = exchangeRates.value[toCurrency.value];
    convertedAmount.value = ((amount.value / fromRate) * toRate).toFixed(2);
  }
});
</script>












<style scoped>
input, select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h2 {
  margin-top: 20px;
  color: #333;
}
</style>