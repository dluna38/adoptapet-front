<script setup>

const token = useCookie('token');
token.value = null;
navigateTo('/');
</script>