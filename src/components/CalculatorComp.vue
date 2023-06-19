<template>
  <div class="bg-black px-[18px] py-[22px] pt-[90px]">

    <div data-test="history" class="text-right font-sans font-light text-[37px] text-gray-600">
      {{ viewActions }}
    </div>

    <div data-test="screen" class="mb-7 font-worksans font-light text-[62px] leading-none text-right">
      {{ current }}
    </div>

    <div class="grid gap-2.5 grid-cols-4">
      <Btn data-test="C" @click="clear()">C</Btn>
      <Btn data-test="S" @click="toggleSign()"><img src="/sign.svg" alt="Sign"></Btn>
      <Btn data-test="%" @click="addAction('%')">%</Btn>
      <Btn data-test="/" @click="addAction('/')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">÷</Btn>
      <Btn data-test="7" @click="addAction(7)">7</Btn>
      <Btn data-test="8" @click="addAction(8)">8</Btn>
      <Btn data-test="9" @click="addAction(9)">9</Btn>
      <Btn data-test="*" @click="addAction('*')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">×</Btn>
      <Btn data-test="4" @click="addAction(4)">4</Btn>
      <Btn data-test="5" @click="addAction(5)">5</Btn>
      <Btn data-test="6" @click="addAction(6)">6</Btn>
      <Btn data-test="-" @click="addAction('-')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">-</Btn>
      <Btn data-test="1" @click="addAction(1)">1</Btn>
      <Btn data-test="2" @click="addAction(2)">2</Btn>
      <Btn data-test="3" @click="addAction(3)">3</Btn>
      <Btn data-test="+" @click="addAction('+')" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">+</Btn>
      <Btn data-test="D" @click="deleteItem()" class="text-[40px] indent-[-7px]">⌫</Btn>
      <Btn data-test="0" @click="addAction(0)">0</Btn>
      <Btn data-test="." @click="addAction('.')">,</Btn>
      <Btn data-test="=" @click="showResult()" class="bg-orange-500 hover:bg-orange-800 pb-[7px]">=</Btn>
    </div>
  </div>
</template>

<script>
import Btn from './BtnComp.vue'

export default {
  data() {
    return {
      current: '',
      actions: [],
      ended: false,
      primary: ['*', '/']
    }
  },
  computed: {
    viewActions() {
      return this.actions.join(' ');
    }
  },
  methods: {
    addAction(val) {
      const isNum = !isNaN(val);
      const current = this.current;

      if (this.ended) this.clear();

      if (this.ended && !isNum) {
        this.current = current;
        this.actions.push(current);
      }

      this.ended = false;

      if (!isNum && this.primary.includes(val) && this.actions.length > 1) {
        this.actions.unshift('(');
        this.actions.push(')');
      }

      const lastValue = this.actions[this.actions.length - 1];

      if ((isNum || val === '.') && !isNaN(lastValue)) {
        this.actions[this.actions.length - 1] = val === '.'
          ? `${lastValue}.`
          : parseFloat(`${lastValue}${val}`);
      } else {
        this.actions.push(val);
      }

      if (isNum) {
        this.current = this.actions[this.actions.length - 1];
      }
    },
    clear() {
      this.current = '';
      this.actions = [];
    },
    deleteItem() {
      if (this.ended) return this.clear();

      const lastValue = this.actions[this.actions.length - 1];
      this.actions.pop();

      if (lastValue === ")") {
        const itemIndex = this.actions.lastIndexOf('(');
        this.actions.splice(itemIndex, 1);
      }
    },
    showResult() {
      this.current = eval(this.actions.join(''));
      this.ended = true;
    },
    toggleSign() {
      const lastValue = this.actions[this.actions.length - 1];
      const newValue = lastValue > 0 ? -lastValue : -1 * lastValue;
      this.actions[this.actions.length - 1] = newValue;
    }
  },
  components: {
    Btn
  }
}
</script>

