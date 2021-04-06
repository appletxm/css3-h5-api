
const cfg = require('component-cfg')

export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    autofocus: Boolean,
  },
  data() {
    return {
      cfg
    }
  },
  computed: {
    buttonSize() {
      return this.size;
    },
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
    testChangeSize() {
      this.cfg = '777'
    },
    testGetData() {
      const total = this.size + this.type
      return total
    }
  }
}