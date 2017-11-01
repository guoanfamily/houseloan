<template>
<div style="margin-top:10px;text-align: center;">
  <canvas ref="canvas" width="160" height="160"></canvas>
  <div>
    <p class="houseMoney">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>{{houseTotalPrice.name}}</span>
        <span>:</span>
        <span>{{houseTotalPrice.value}}</span>
        <span>万元</span>
    </p>
    <ul>
      <li class="houseMoney" v-for="item in ringList" :key="item.name">
        <span :style="{color:item.color}">▇▇</span>
        <span>{{item.name}}</span>
        <span>:</span>
        <span>{{item.value}}</span>
        <span>万元</span>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      chartColor: false,
      aniend: 0,
      ctx: null,
      startarc: 0,
      endarc: 0,
      drawList: [],
      drawCount: 0,
      rcolor: "#ff0000",
      houseTotalPrice:{name:"房款总价",value:700},
      ringList: [
        { name: "首付金额", value: 500, color: "#6EBFFF" },
        { name: "贷款总额", value: 200, color: "#FFDA7C" },
        { name: "支付利息", value: 500, color: "#FF70A0" }
      ]
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.drawText(this.ctx, "￥3540");
    this.drawlist(this.ctx, this.ringList);
  },
  methods: {
    drawlist(ctx, numList) {
      let totalNum = 0;
      numList.map(num => {
        totalNum += num.value;
      });

      let startvalue = 0;
      numList.map(num => {
        let dnum = Math.round(num.value / totalNum * 100);
        this.drawList.push({
          startarc: startvalue,
          endarc: dnum,
          rcolor: num.color
        });
        startvalue += dnum;
      });
      this.drawAniRing();
    },
    drawAniRing() {
      let aniid = window.requestAnimationFrame(this.drawAniRing);
      this.aniend += 1;
      this.drawRing(this.ctx, this.startarc, this.aniend, this.rcolor);
      if (this.aniend >= this.endarc) {
        if (this.drawCount >= this.drawList.length) {
          window.cancelAnimationFrame(aniid); //可以取消该次动画。
          return;
        }
        this.aniend = 0;
        this.startarc = this.drawList[this.drawCount].startarc;
        this.endarc = this.drawList[this.drawCount].endarc;
        this.rcolor = this.drawList[this.drawCount].rcolor;
        this.drawCount += 1;
      }
    },
    drawRing(ctx, s, e, rcolor) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 40;
      ctx.strokeStyle = rcolor; // rcolor;
      //设置开始处为0点钟方向(-90 * Math.PI / 180)
      //x为百分比值(0-100)
      let endarc = s + e;
      if (endarc > 100) endarc = 100;
      ctx.arc(
        80,
        80,
        60,
        (s * 3.6 - 90) * Math.PI / 180,
        (endarc * 3.6 - 90) * Math.PI / 180
      );
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    drawText(ctx, showText) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "#83868f";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText("月供", 80, 65);
      ctx.fillText(showText, 80, 95);
    }
  }
};
</script>
<style lang='less' scoped>
.houseMoney {
  color: #b3b6be;
  text-align: center;
  list-style: none;
  span:nth-child(3) {
    color: #000000;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>

