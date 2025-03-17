import { ref } from 'vue';

export const useExchangeRates = () => {
  const exchangeRates = ref({});
  const loading = ref(false);
  const error = ref(null);

  const fetchExchangeRates = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(
        'https://api.fastforex.io/fetch-all?api_key=90823c3d95-69d05cb072-st9lfb');
      const data = await response.json();
      exchangeRates.value = data.results;
    } catch (err) {
      error.value = 'Failed to fetch exchange rates.';
    } finally {
      loading.value = false;
    }
  };

  return {
    exchangeRates,
    loading,
    fetchExchangeRates,
  };
};