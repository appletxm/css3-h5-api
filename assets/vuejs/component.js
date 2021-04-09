
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
    },
    complex() {
      const str = this.icon + this.nativeType + this.size
      return str
    }
  },

  watch: {
    size(newVal, oldVal) {
      console.info('===watch size: ', newVal, oldVal)
    },

    disabled(newVal, oldVal) {
      console.info('===watch disabled: ', newVal, oldVal)
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },

    testChangeSize() {
      this.cfg = 999
    },

    testGetData() {
      const total = this.size + this.type
      return total
    }
  },

  mounted() {
    console.info('---mounted:', this.size)
  },

  created() {
    console.info('---name:', this.size)
  },

  destroyed() {
    console.info('---destroyed:', this.size)
  }
}