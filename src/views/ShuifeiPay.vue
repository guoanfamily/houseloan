<template>

  <div class="outerLayerDiv">
    <div style="margin:0 auto;width:220px;">
    <p class="disctext">{{lineOne}}</p>
    <RingChart :ringList="ringList" :houseTotalPrice="houseTotalPrice"></RingChart>
    <p class="houseMoney">
        <span></span>
        <span>{{totalPrice.name}}</span>
        <span>:</span>
        <span>{{totalPrice.value}}</span>
        <span>元</span>
    </p>
    <p class="disctext" style="text-align:center">以上结果仅供参考</p>
    </div>
  </div>

</template>
<script>
import RingChart from "../components/RingChart";
export default {
  components: {
    RingChart
  },
  mounted() {
    this.houseTotalPrice = {
      name: "房款总价",
      value: (this.$route.query.totalPrice / 10000).toFixed(2)
    };
    this.IsCommonHouse = this.$route.query.IsCommonHouse;
    this.IsOnly = this.$route.query.IsOnly;
    if (this.IsOnly) {
      this.ringList = [
        {
          name: "契税",
          value: this.houseTotalPrice.value * 10000 * 0.015,
          color: "#6EBF00",
          unit: "元"
        }
      ];
    } else {
      this.ringList = [
        {
          name: "契税",
          value: this.houseTotalPrice.value * 10000 * 0.03,
          color: "#6EBF00"
        }
      ];
    }
    this.ringList.push(
      { name: "合同工本费", value: 5, unit: "元", color: "#6EBFFF" },
      { name: "维修基金", value: 30000, unit: "元", color: "#FFDA7C" },
      { name: "权属登记费", value: 80, unit: "元", color: "#ff70A0" }
    );

    let a = 0;
    for (var i = 0; i < this.ringList.length; i++) {
      a += Number(this.ringList[i].value);
    }
    this.totalPrice = { name: "税金总额", value: a };
  },
  data() {
    return {
      lineOne: "税金明细",
      ringList: [],
      houseTotalPrice: 0,
      IsCommonHouse: 0,
      IsOnly: true,
      totalPrice: 0
    };
  }
};
</script>
