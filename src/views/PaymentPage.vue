<template>

  <div class="outerLayerDiv" style="">
    <button-tab v-model="selectedItem">
        <button-tab-item @on-item-click="itemChange">等额本息</button-tab-item>
        <button-tab-item @on-item-click="itemChange">等额本金</button-tab-item>       
    </button-tab>
    <p class="disctext">{{lineOne}}</p>
    <RingChart :ringList="ringList" :houseTotalPrice="houseTotalPrice" :monthPay="monthPay"></RingChart>
    <ul>
      <li class="houseMoney">         
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="interestrate">利&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;率</span>
        <span>:</span>
        <span><span>{{this.rate*100}}</span><span class="sign">%</span></span>
        <span></span>
      </li>
      <li class="houseMoney">         
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>首月月供</span>
        <span>:</span>
        <span>{{this.monthPay}}</span>
        <span>元/月</span>
      </li>
       <li v-show="this.selectedItem==1" class="houseMoney">         
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>每月递减</span>
        <span>:</span>
        <span>{{this.monthDecMoney}}</span>
        <span>元/月</span>
      </li>
    </ul>
    <p class="disctext" style="text-align:center">以上结果仅供参考</p>
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
    this.totalPrice= this.$route.query.totalPrice*10000;
    this.loanMoney= this.$route.query.loanMoney*10000;
    this.payMoney = this.$route.query.payMoney;
    this.months = this.$route.query.months;
    this.rate = this.$route.query.rate;
    this.caculateAcpi(true)
  },
  methods: {
    itemChange(){
      if(this.selectedItem==0){
        this.caculateAcpi(true);
      }else{
        this.caculateAcpi(false);
      }
      
    },
    caculateAcpi(isAcpi) {
      let monthPay = 0;
      let totalPay=0;
      if(isAcpi){
         monthPay =  LoanCaculate.Acpi(this.rate,this.loanMoney,this.months)
         totalPay = monthPay*this.months;
         this.lineOne = "每月还款额固定，所还总利息较多，适合收入稳定者。"
      }else{
         for(let month=0;month<this.months;month++){
          monthPay =  LoanCaculate.AverageCapital(this.rate,this.loanMoney,this.months,month)
          totalPay += monthPay;
         }
         monthPay =  LoanCaculate.AverageCapital(this.rate,this.loanMoney,this.months,0)
         let nextmonthPay =  LoanCaculate.AverageCapital(this.rate,this.loanMoney,this.months,1)
         this.monthDecMoney = (monthPay-nextmonthPay).toFixed(2);
         this.lineOne = "每月还款额递减，所还总利息较低，前期还款额较大。"
      }
      console.log("月供",Math.ceil(monthPay));
      this.monthPay = Math.ceil(monthPay);
      
      console.log("总还款",Math.ceil(totalPay));
      let totalInterest = totalPay - this.loanMoney;
      console.log("总利息",Math.ceil(totalInterest));
      this.houseTotalPrice={name:"房款总价",value:this.totalPrice/10000}
      this.ringList=[
        { name: "首付金额", value: this.payMoney, color: "#6EBFFF" },
        { name: "贷款总额", value: this.loanMoney/10000, color: "#FFDA7C" },
        { name: "支付利息", value: (totalInterest/10000).toFixed(2), color: "#FF70A0" }
      ]
    }
  },
  data() {
    return {
      selectedItem:0,
      lineOne: "每月还款额固定，所还总利息较多，适合收入稳定者。",
      ringList:[],
      houseTotalPrice:"",
      totalPrice:0,
      loanMoney:0,
      payMoney:0,
      months:0,
      monthPay:0,
      rate:0,
      monthDecMoney:0
    }
  }
}
</script>
