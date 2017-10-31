<template>
  <div>
    <group v-show="!showPayPage">
      
      <x-input type="number" title="房款总价" :value="totalPrice">
        <span slot="right">万元</span>
      </x-input>      
      <cell is-link @click.native="showPayPage=true">
        <span slot="title"><span>首付比例</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{payPercent}}</span></span>
      </cell>
      <cell value="万元">
         <span slot="title"><span>贷款总额</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{loanMoney}}</span></span>      
      </cell>
      <popup-picker  :data="loanYearsList"   style="text-align:left">
       <span slot="title"><span>按揭年数</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{loanYear[0]}}</span></span> 
      </popup-picker>
      <cell is-link @click.native="showRatePage=true">
        <span slot="title"><span>利&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;率</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{showRate}}</span></span>
      </cell>
      <x-button type="warn">开始计算</x-button>
    </group>
    <PayRate v-show="showPayPage" class="payRate" @submit="submit" :totalMoney="totalPrice"></PayRate>
    <MoneyRate v-show="showRatePage" class="payRate" @submit="RateSubmit" :baseRate="baseRate"></MoneyRate>
  </div>
</template>
<script>
import PayRate from "../components/PayRate"
import MoneyRate from "../components/MoneyRate"
import {PopupPicker, XInput, Group, Cell, XButton } from "vux";
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
  mounted(){
    let initalLoanYears=[];
    for (let i=1;i<31;i++){
      initalLoanYears.push(i+"年"+"("+i*12+"期)")
    }
    this.loanYearsList.push(initalLoanYears);
  },
  data() {
    return {
      loanYearsList:[],
      loanYear:["20年(240期)"],
      totalPrice: 100,
      payMoney:0,
      payPercent: "",
      loanYears: "",
      moneyRate: "",
      baseRate:4.9/100,
      actRate:0,
      showRate:0,
      showPayPage:false,
      showRatePage:false
    };
  },
  computed: {
    loanMoney() {
      return this.totalPrice - this.payMoney;
    }
  },
  methods:{
    submit(showValue,payMoney){
      this.showPayPage=false;
      this.payMoney = payMoney;
      this.payPercent = showValue
      console.log(showValue)
    },
    RateSubmit(showValue,actRate){
      this.showRatePage=false;
      this.actRate =actRate;
      this.showRate = showValue;
    }
    
  }
};
</script>
<style>
.payRate{
  position: absolute;
  top:0;
  bottom: 0;
  background-color: #ffffff
}
</style>
