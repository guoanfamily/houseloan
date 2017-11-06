<template>
  <div>
      <x-input  title="建筑面积:" v-model="houseArea">
        <span slot="right">m2</span>
      </x-input>
      <x-input  title="面积单价:" v-model="areaPrice">
        <span slot="right">元</span>
      </x-input>      
      <popup-picker :data="natureList" title="房屋性质" v-model="nature"  style="text-align:left">
      </popup-picker>
      <x-switch title="是否唯一" v-model="stringValue"></x-switch>
      <x-button type="warn" @click.native="calculateShui">开始计算</x-button>
  </div>
</template>
<script>
import { PopupPicker, XInput, Group, Cell, XButton, XSwitch } from "vux";
export default {
  components: {
    PopupPicker,
    XInput,
    Group,
    Cell,
    XButton,
    XSwitch
  },
    data() {
    return {
      natureList: [["普通住宅", "非普通住宅"]],
      nature: ["普通住宅"],
      houseArea: 100,
      areaPrice: 10000,
      stringValue: true,
      IsCommonHouse:"",
    };
  },
  methods: {
    calculateShui() {
      console.log(this.nature[0]);
      this.nature[0] == "普通住宅" ? this.IsCommonHousea=1 : this.IsCommonHousea=0;
      this.$router.push({
        path: "/ShuifeiPay",
        query: { totalPrice: this.houseArea*this.areaPrice,
        IsCommonHouse:this.IsCommonHouse,
        IsOnly:this.stringValue}
      });
    }
  },
};
</script>

