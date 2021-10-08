<template>
  <div class="app-container">
    Demo
    <button @click="text">
      btn
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  name: 'PagePermission',
  components: {}
})
export default class extends Vue {
  private text() {
    axios.post('http://10.10.1.166:8280/dmp/v1.0/am/send', {
      msg: 'zhangsan'
    })
  }
}
</script>
