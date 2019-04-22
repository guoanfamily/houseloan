<template>
  <div>
    <x-input type="number" placeholder="请输入正确的数字" title="自定义首付比例" v-model="customMoney">
        <span slot="right">%
          <x-button plain mini @click.native="submit" class="custom-primary-red">确定</x-button>
        </span>
      </x-input>
      <group title="或者选择首付比例">
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
  data() {
    return {
      customMoney: null,
      selectedRate: 0.3,
      rateList: [
        { key: 0.1, value: "一成" },
        { key: 0.2, value: "二成" },
        { key: 0.3, value: "三成" },
        { key: 0.4, value: "四成" },
        { key: 0.5, value: "五成" },
        { key: 0.6, value: "六成" },
        { key: 0.7, value: "七成" },
        { key: 0.8, value: "八成" },
        { key: 0.9, value: "九成" }
      ]
    };
  },
  methods: {
    change(val, label) {
      // console.log("change", val, label);
      this.$emit("submit", val,label);
    },
    submit() {
      // console.log(this.customMoney)
      if (this.customMoney) {
        if (this.customMoney < 100) {
          this.$emit("submit", this.customMoney / 100, + this.customMoney + '%');
        }
      } else {
        this.change(this.selectedRate, this.rateList.find(x => Math.abs(x.key - this.selectedRate) < 0.0001).value)
      }
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
