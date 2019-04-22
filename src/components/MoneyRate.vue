<template>
  <div>
    <x-input type="number" placeholder="请输入正确的数字" title="自定义利率" v-model="customRate">
        <span slot="right">%
          <x-button plain mini @click.native="submit" class="custom-primary-red">确定</x-button>
        </span>
      </x-input>
      <group title="或者选择常用利率">
       <radio :options="rateList" v-model="selectedRate" @on-change="change"></radio>
      </group>
  </div>
</template>
<script>
import {Group, XInput, XButton, Radio } from "vux";
export default {
  components: {
    Group,
    XInput,
    XButton,
    Radio
  },
  props: {
    baseRate:0
  },
  data() {
    return {
      customRate: null,
      selectedRate: 1,
      rateList: [
        { key: 1, value: "基准利率" },
        { key: 0.7, value: "7折" },
        { key: 0.85, value: "85折" },
        { key: 0.88, value: "88折" },
        { key: 0.9, value: "9折" },
        { key: 0.95, value: "95折" },
        { key: 1.05, value: "1.05倍" },
        { key: 1.1, value: "1.1倍" },
        { key: 1.2, value: "1.2倍" },
        { key: 1.3, value: "1.3倍" }
      ]
    };
  },
  methods: {
    change(val, label) {
      let actRate = this.baseRate*val
      this.$emit("submit", (actRate*100).toFixed(2)+"%",actRate);
    },
    submit() {
      if (this.customRate) {
        if (this.customRate < 100) {
          this.customRate = Number(this.customRate).toFixed(2);
          this.$emit("submit", this.customRate+"%",this.customRate/100);
        }
      } else {
        this.change(this.selectedRate)
      }
    }
  },
  watch: {
    baseRate () {
      this.change(this.selectedRate)
    }
  }
};
</script>
<style lang="less">
.custom-primary-red {
  border-color: #ce3c39 !important;
  color: #ce3c39 !important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6) !important;
    color: rgba(206, 60, 57, 0.6) !important;
    background-color: transparent;
  }
}
</style>
