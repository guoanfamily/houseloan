<template>
  <div>
    <group v-show="!showPayPage">
      
      <x-input type="number" title="房款总价" v-model="totalPrice">
        <span slot="right">万元</span>
      </x-input>      
      <cell is-link @click.native="showPayPage=true">
        <span slot="title"><span>首付比例</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{payPercent}}</span></span>
      </cell>
      <cell value="万元">
         <span slot="title"><span>贷款总额</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{loanMoney}}</span></span>      
      </cell>
      <popup-picker title="按揭年数" :data="loanYearsList"  v-model="loanYear" value-text-align="left">
       
      </popup-picker>
      <cell is-link @click.native="showRatePage=true">
        <span slot="title"><span>利&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;率</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{showRate}}</span></span>
      </cell>
      <x-button type="warn" @click.native="caculateLoan">开始计算</x-button>
    </group>
    <PayRate v-show="showPayPage" class="payRate" @submit="submit" ></PayRate>
    <MoneyRate v-show="showRatePage" class="payRate" @submit="RateSubmit" :baseRate="baseRate"></MoneyRate>
  </div>
</template>
<script>
import PayRate from "../components/PayRate";
import MoneyRate from "../components/MoneyRate";
import { PopupPicker, XInput, Group, Cell, XButton } from "vux";
export default {
  components: {
    MoneyRate,
    PopupPicker,
    PayRate,
    XInput,
    Group,
    Cell,
    XButton
  },
  mounted() {
    let initalLoanYears = [];
    for (let i = 1; i < 31; i++) {
      initalLoanYears.push(i + "年" + "(" + i * 12 + "期)");
    }
    this.loanYearsList.push(initalLoanYears);
  },
  data() {
    return {
      isUnique: true,
      loanYearsList: [],
      loanYear: ["20年(240期)"],
      totalPrice: 100,
      payRate: 0.3,
      payMoney: 0,
      loanYears: "",
      moneyRate: "",
      baseRate: 4.9 / 100,
      actRate: 4.9 / 100,
      showRate: "4.9%",
      payRateLabel: "三成",
      showPayPage: false,
      showRatePage: false
    };
  },
  computed: {    
    loanMoney() {
      console.log(this.totalPrice);
      return (this.totalPrice * (1 - this.payRate)).toFixed(2);
    },
    payPercent() {
      if (!this.payRateLabel) {
        this.payMoney = this.payRate;
        return this.payRate + "万";
      } else {
        this.payMoney = (this.totalPrice * this.payRate).toFixed(2);
        return (
          this.payRateLabel +
          "(" +
          (this.totalPrice * this.payRate).toFixed(2) +
          "万" +
          ")"
        );
      }
    }
  },
  methods: {
    caculateLoan() {
      let month = this.loanYear[0].match(/\((\S*)\)/);			
      let months = month[1].substr(0,month[1].length-1);
      this.$router.push({
        path: "/payment",
        query: { totalPrice: this.totalPrice,
        loanMoney:this.loanMoney,
        months:months,
        rate:this.actRate,
        payMoney:this.payMoney }
      });
    },
    submit(payRate, label) {
      this.payRateLabel = label;
      this.showPayPage = false;
      this.payRate = payRate;
    },
    RateSubmit(showValue, actRate) {
      this.showRatePage = false;
      this.actRate = actRate;
      this.showRate = showValue;
    }
  }
};
</script>
<style>
.payRate {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
}
.vux-popup-picker-value{
  padding-left:20px!important;
}
</style>
