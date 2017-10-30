<template>
  <div>
    <tab>
    <tab-item selected @on-item-click="onItemClick">商业贷</tab-item>
    <tab-item @on-item-click="onItemClick">公积金贷</tab-item>
    <tab-item @on-item-click="onItemClick">组合贷</tab-item>
    <tab-item @on-item-click="onItemClick">税费计算</tab-item>
    </tab>
    <div v-show="showPage==0">
      <ShangDaiPage></ShangDaiPage>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
import ShangDaiPage from "./ShangDaiPage"
export default {
  components: {
    Tab,
    TabItem,
    ShangDaiPage
  },
  data() {
    return {
      showPage:0
    };
  },
  methods:{
     onItemClick (index) {
      console.log('on item click:', index)
    }
  }
};
</script>