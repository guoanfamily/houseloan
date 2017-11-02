export default {
  //计算公式： ［贷款本金 × 月利率 × （ 1 ＋月利率）＾还款月数］ ÷ ［（ 1 ＋月利率）＾还款月数－ 1 ］  
  //本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
  Acpi(lilv, total, month) {
    let lilv_month = lilv / 12; //月利率
    let mounthPay = total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
    return mounthPay
  },
  //本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
  AverageCapital(lilv, total, month, cur_month) {
    var lilv_month = lilv / 12; //月利率
    //return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    var benjin_money = total / month;
    return (total - benjin_money * cur_month) * lilv_month + benjin_money;

  }
}