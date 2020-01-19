<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TagsViewModule } from '@/store/modules/tags-view'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  get cachedViews() {
    return TagsViewModule.cachedViews
  }

  get key() {
    return this.$route.path
  }
}
</script>

<style lang="scss" scoped>
$tagViewHeight: 34px;

.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: $navBarHeight;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - #{$navBarHeight} - #{$tagViewHeight});
  }

  .fixed-header+.app-main {
    padding-top: calc(#{$navBarHeight} + #{$tagViewHeight});
  }
}
</style>
