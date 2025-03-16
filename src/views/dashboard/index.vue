<template>
  <div class="dashboard-container">
    <div class="dashboard-text">routerInfo: {{ routerInfo }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from "js-cookie";

export default {
  name: 'Dashboard',
  data() {
    return {
      routerInfo: null
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'routerMessage'
    ])
    // routerInfo() {
    //   return { routerMessage: this.routerMessage }
    // }
  },
  mounted() {
    this.routerInfo = Cookies.get('routerInfo');
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
