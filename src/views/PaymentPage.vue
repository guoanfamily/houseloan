<template>

  <div style="padding-top: 20px;padding-left:100px;padding-right:100px;">
    <button-tab>
        <button-tab-item selected>等额本息</button-tab-item>
        <button-tab-item>等额本金</button-tab-item>       
    </button-tab>
    <p class="disctext">{{lineOne}}</p>
    <RingChart :ringList="ringList" :houseTotalPrice="houseTotalPrice"></RingChart>

  </div>

</template>
<script>
import { ButtonTab, ButtonTabItem, Divider } from "vux";
import RingChart from "../components/RingChart"
import LoanCaculate from "../components/LoanCaculate"
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    RingChart
  },
  mounted(){
    let totalPrice= this.$route.query.totalPrice*10000;
    let loanMoney= this.$route.query.loanMoney*10000;
    let months = this.$route.query.months;
    let rate = this.$route.query.rate;
    this.caculate(rate,loanMoney,months)
  },
  methods: {
    caculate(rate,totalloan,months) {

      let monthPay =  LoanCaculate.Acpi(rate,totalloan,months)
      console.log("月供",Math.ceil(monthPay));
      let totalPay = monthPay*months;
      console.log("总还款",Math.ceil(totalPay));
      let totalInterest = totalPay - totalloan;
      console.log("总利息",Math.ceil(totalInterest));
      this.houseTotalPrice={name:"房款总价",value:this.$route.query.totalPrice}
      this.ringList=[
        { name: "首付金额", value: this.$route.query.payMoney, color: "#6EBFFF" },
        { name: "贷款总额", value: this.$route.query.loanMoney, color: "#FFDA7C" },
        { name: "支付利息", value: (totalInterest/10000).toFixed(2), color: "#FF70A0" }
      ]
    }
  },
  data() {
    return {
      lineOne: "每月还款额固定，所还总利息较多，适合收入稳定者。",
      ringList:[],
      houseTotalPrice:{name:"房款总价",value:700}
    }
  }
};
</script>
<style>
.disctext {
  color: #b3b6be;
  font-size: 14px;
  line-height: 24px;
  margin-top: 12px;
  padding: 0 20px;
}
</style>

