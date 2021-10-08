<!--
 * @Descripttion: 
 * @Version: v0.1
 * @Author: pengfei.xiu
 * @Date: 2021-07-10 14:48:02
 * @LastEditors: pengfei.xiu
 * @LastEditTime: 2021-10-08 20:15:38
-->
<template>
  <div class="dashboard-container">
    {{ $t('route.dashboard') }} {{ currentRole }}
    <div>
      <i18n path="route.dashboard" />
    </div>
    <ul>
      <li v-for="i in 400" :key="i">
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Dashboard',
  components: {},
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'

  get roles() {
    return UserModule.roles
  }

  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editor-dashboard'
    }
  }
}
</script>
<style lang="scss" scoped></style>
