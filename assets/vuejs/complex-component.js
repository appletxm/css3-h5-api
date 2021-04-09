import debounce from 'throttle-debounce/debounce';
import Popper from '../../utils/vue-popper';
import Clickoutside from '../../utils/clickoutside';
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
import Migrating from '../../mixins/migrating';
import UiInput from '../input';
import UiTag from '../tag';
import UiScrollbar from '../scrollbar';
import CascaderPanel from '../cascader-panel';
import AriaUtils from '../../utils/aria-utils';
import { t } from '../../locale';
import { isEqual, isEmpty, kebabCase } from '../../utils/util';
import { isUndefined, isFunction } from '../../utils/types';
import { isDef } from '../../utils/shared';
import { addResizeListener, removeResizeListener } from '../../utils/resize-event';

const { keys: KeyCode } = AriaUtils;

const MigratingProps = {
  expandTrigger: {
    newProp: 'expandTrigger',
    type: String
  },
  changeOnSelect: {
    newProp: 'checkStrictly',
    type: Boolean
  },
  hoverThreshold: {
    newProp: 'hoverThreshold',
    type: Number
  }
};

const PopperMixin = {
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    appendToBody: Popper.props.appendToBody,
    visibleArrow: {
      type: Boolean,
      default: false
    },
    arrowOffset: Popper.props.arrowOffset,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  methods: Popper.methods,
  data: Popper.data,
  beforeDestroy: Popper.beforeDestroy
};

const InputSizeMap = {
  medium: 36,
  small: 32,
  mini: 28
};

export default {
  name: 'Cascader',

  directives: { Clickoutside },

  components: {
    UiInput,
    UiTag,
    UiScrollbar,
    CascaderPanel
  },

  mixins: [PopperMixin, Emitter, Locale, Migrating],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    value: {},
    options: Array,
    props: Object,
    size: String,
    placeholder: {
      type: String,
      default: () => t('el.cascader.placeholder')
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: Function,
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => (() => {})
    },
    popperClass: String
  },

  data() {
    return {
      dropDownVisible: false,
      checkedValue: this.value || null,
      inputHover: false,
      inputValue: null,
      presentText: null,
      presentTags: [],
      checkedNodes: [],
      filtering: false,
      suggestions: [],
      inputInitialHeight: 0,
      pressDeleteCount: 0,
      cfg: ''
    };
  },

  computed: {
    realSize() {
      const _elFormItemSize = (this.elFormItem || {}).elFormItemSize;
      return this.size || _elFormItemSize || (this.$ELEMENT || {}).size;
    },

    tagSize() {
      return ['small', 'mini'].indexOf(this.realSize) > -1
        ? 'mini'
        : 'small';
    },

    isDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },

    config() {
      let config = this.props || {};
      const { $attrs } = this;
      const { separator } = this.$props

      Object
        .keys(MigratingProps)
        .forEach((oldProp) => {
          const { newProp, type } = MigratingProps[oldProp];
          let oldValue = $attrs[oldProp] || $attrs[kebabCase(oldProp)];
          if (isDef(oldProp) && !isDef(config[newProp])) {
            if (type === Boolean && oldValue === '') {
              oldValue = true;
            }
            config[newProp] = oldValue;
          }
        });

      config = Object.assign(config, {
        separator
      })

      return config;
    },

    multiple() {
      return this.config.multiple;
    },

    leafOnly() {
      return !this.config.checkStrictly;
    },

    readonly() {
      return !this.filterable || this.multiple;
    },

    clearBtnVisible() {
      if (!this.clearable || this.isDisabled || this.filtering || !this.inputHover) {
        return false;
      }

      return this.multiple
        ? !!this.checkedNodes.filter((node) => !node.isDisabled).length
        : !!this.presentText;
    },

    panel() {
      return this.$refs.panel;
    }
  },

  watch: {
    disabled() {
      this.computePresentContent();
    },

    value(val) {
      if (!isEqual(val, this.checkedValue)) {
        this.checkedValue = val;
        this.computePresentContent();
      }
    },

    checkedValue(val) {
      const { value, dropDownVisible } = this;
      const { checkStrictly, multiple } = this.config;

      if (!isEqual(val, value) || isUndefined(value)) {
        this.computePresentContent();
        // hide dropdown when single mode
        if (!multiple && !checkStrictly && dropDownVisible) {
          this.toggleDropDownVisible(false);
        }

        this.$emit('input', val);
        this.$emit('change', val);
        this.dispatch('FormItem', 'form.change', [val]);
      }
    },
    
    options: {
      handler: function () {
        this.$nextTick(this.computePresentContent);
      },
      deep: true
    },

    presentText(val) {
      this.inputValue = val;
    },

    presentTags(val, oldVal) {
      if (this.multiple && (val.length || oldVal.length)) {
        this.$nextTick(this.updateStyle);
      }
    },

    filtering() {
      this.$nextTick(this.updatePopper);
    }
  },

  mounted() {
    const { input } = this.$refs;
    if (input && input.$el) {
      this.inputInitialHeight = input.$el.offsetHeight || InputSizeMap[this.realSize] || 40;
    }

    if (!isEmpty(this.value)) {
      this.$nextTick(this.computePresentContent);
    }

    this.filterHandler = debounce(this.debounce, () => {
      const { inputValue } = this;

      if (!inputValue) {
        this.filtering = false;
        return;
      }

      const before = this.beforeFilter(inputValue);
      if (before && before.then) {
        before.then(this.getSuggestions);
      } else if (before !== false) {
        this.getSuggestions();
      } else {
        this.filtering = false;
      }
    });

    addResizeListener(this.$el, this.updateStyle);
  },

  beforeDestroy() {
    removeResizeListener(this.$el, this.updateStyle);
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'expand-trigger': 'expand-trigger is removed, use `props.expandTrigger` instead.',
          'change-on-select': 'change-on-select is removed, use `props.checkStrictly` instead.',
          'hover-threshold': 'hover-threshold is removed, use `props.hoverThreshold` instead'
        },
        events: {
          'active-item-change': 'active-item-change is renamed to expand-change'
        }
      };
    },
    toggleDropDownVisible(visible) {
      if (this.isDisabled) return;

      const { dropDownVisible } = this;
      const { input } = this.$refs;
      visible = isDef(visible) ? visible : !dropDownVisible;
      if (visible !== dropDownVisible) {
        this.dropDownVisible = visible;
        if (visible) {
          this.$nextTick(() => {
            this.updatePopper();
            this.panel.scrollIntoView();
          });
        }
        input.$refs.input.setAttribute('aria-expanded', visible);
        this.$emit('visible-change', visible);
      }
    },

    handleDropdownLeave() {
      this.filtering = false;
      this.inputValue = this.presentText;
    },

    handleKeyDown(event) {
      switch (event.keyCode) {
        case KeyCode.enter:
          this.toggleDropDownVisible();
          break;
        case KeyCode.down:
          this.toggleDropDownVisible(true);
          this.focusFirstNode();
          event.preventDefault();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
        default:
          break;
      }
    },

    handleFocus(e) {
      this.$emit('focus', e);
    },

    handleBlur(e) {
      this.$emit('blur', e);
    },

    handleInput(val, event) {
      !this.dropDownVisible && this.toggleDropDownVisible(true);

      if (event && event.isComposing) return;
      if (val) {
        this.filterHandler();
      } else {
        this.filtering = false;
      }
    },

    handleClear() {
      this.presentText = '';
      this.panel.clearCheckedNodes();
    },

    handleExpandChange(value) {
      this.$nextTick(this.updatePopper.bind(this));
      this.$emit('expand-change', value);
      this.$emit('active-item-change', value); // Deprecated
    },

    focusFirstNode() {
      this.$nextTick(() => {
        const { filtering } = this;
        const { popper, suggestionPanel } = this.$refs;
        let firstNode = null;

        if (filtering && suggestionPanel) {
          firstNode = suggestionPanel.$el.querySelector(`.${this.cfg.prefix}-cascader__suggestion-item`);
        } else {
          const firstMenu = popper.querySelector(`.${this.cfg.prefix}-cascader-menu`);
          firstNode = firstMenu.querySelector(`.${this.cfg.prefix}-cascader-node[tabindex="-1"]`);
        }

        if (firstNode) {
          firstNode.focus();
          !filtering && firstNode.click();
        }
      });
    },

    computePresentContent() {
      // nextTick is required, because checked nodes may not change right now
      this.$nextTick(() => {
        if (this.config.multiple) {
          this.computePresentTags();
          this.presentText = this.presentTags.length ? ' ' : null;
        } else {
          this.computePresentText();
        }
      });
    },

    computePresentText() {
      const { checkedValue, config } = this;
      if (!isEmpty(checkedValue)) {
        const node = this.panel.getNodeByValue(checkedValue);
        if (node && (config.checkStrictly || node.isLeaf)) {
          this.presentText = node.getText(this.showAllLevels, this.separator);
          return;
        }
      }
      this.presentText = null;
    },

    computePresentTags() {
      const { isDisabled, leafOnly, showAllLevels, separator, collapseTags } = this;
      const checkedNodes = this.getCheckedNodes(leafOnly);
      const tags = [];

      const genTag = (node) => ({
        node,
        key: node.uid,
        text: node.getText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled && !node.isDisabled
      });

      if (checkedNodes.length) {
        const [first, ...rest] = checkedNodes;
        const restCount = rest.length;
        tags.push(genTag(first));

        if (restCount) {
          if (collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            });
          } else {
            rest.forEach((node) => tags.push(genTag(node)));
          }
        }
      }

      this.checkedNodes = checkedNodes;
      this.presentTags = tags;
    },

    getSuggestions() {
      let { filterMethod } = this;

      if (!isFunction(filterMethod)) {
        filterMethod = (node, keyword) => node.text.includes(keyword);
      }

      const suggestions = this.panel.getFlattedNodes(this.leafOnly)
        .filter((node) => {
          if (node.isDisabled) return false;
          node.text = node.getText(this.showAllLevels, this.separator) || '';
          return filterMethod(node, this.inputValue);
        });

      if (this.multiple) {
        this.presentTags.forEach((tag) => {
          tag.hitState = false;
        });
      } else {
        suggestions.forEach((node) => {
          node.checked = isEqual(this.checkedValue, node.getValueByOption());
        });
      }

      this.filtering = true;
      this.suggestions = suggestions;
      this.$nextTick(this.updatePopper);
    },

    handleSuggestionKeyDown(event) {
      const { keyCode, target } = event;
      switch (keyCode) {
        case KeyCode.enter:
          target.click();
          break;
        case KeyCode.up:
          const prev = target.previousElementSibling;
          prev && prev.focus();
          break;
        case KeyCode.down:
          const next = target.nextElementSibling;
          next && next.focus();
          break;
        case KeyCode.esc:
        case KeyCode.tab:
          this.toggleDropDownVisible(false);
          break;
        default:
          break;
      }
    },

    handleDelete() {
      const { inputValue, pressDeleteCount, presentTags } = this;
      const lastIndex = presentTags.length - 1;
      const lastTag = presentTags[lastIndex];
      this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1;

      if (!lastTag) return;

      if (this.pressDeleteCount) {
        if (lastTag.hitState) {
          this.deleteTag(lastIndex);
        } else {
          lastTag.hitState = true;
        }
      }
    },

    handleSuggestionClick(index) {
      const { multiple } = this;
      const targetNode = this.suggestions[index];

      if (multiple) {
        const { checked } = targetNode;
        targetNode.doCheck(!checked);
        this.panel.calculateMultiCheckedValue();
      } else {
        this.checkedValue = targetNode.getValueByOption();
        this.toggleDropDownVisible(false);
      }
    },

    deleteTag(index) {
      const { checkedValue } = this;
      const val = checkedValue[index];
      this.checkedValue = checkedValue.filter((n, i) => i !== index);
      this.$emit('remove-tag', val);
    },

    updateStyle() {
      const { $el, inputInitialHeight } = this;
      if (this.$isServer || !$el) return;

      const { suggestionPanel } = this.$refs;
      const inputInner = $el.querySelector(`.${this.cfg.prefix}-input__inner`);

      if (!inputInner) return;

      const tags = $el.querySelector(`.${this.cfg.prefix}-cascader__tags`);
      let suggestionPanelEl = null;

      if (suggestionPanel && suggestionPanel.$el) {
        suggestionPanelEl = suggestionPanel.$el;
        const suggestionList = suggestionPanelEl.querySelector(`.${this.cfg.prefix}-cascader__suggestion-list`);
        suggestionList.style.minWidth = inputInner.offsetWidth + 'px';
      }

      if (tags) {
        const { offsetHeight } = tags;
        const height = Math.max(offsetHeight + 6, inputInitialHeight) + 'px';
        inputInner.style.height = height;
        this.updatePopper();
      }
    },

    /**
     * public methods
    */
    getCheckedNodes(leafOnly) {
      return this.panel.getCheckedNodes(leafOnly);
    }
  }
};