<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-for="(tab, i) in tabs" v-bind:style="tab.isActive == true ? styleTabHeader : ''" :class="{'is-active': tab.isActive }" :key="i">
          <a :href="tab.href" class="button-tab" v-bind:style="[overrideStyles]" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tabs-details" v-bind:style="styleTabBody">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import '../fonts/fonts.css'

export default {
  props: {
    borderColor: {
        type: String,
        default: ''
    },
    tabTextColor: {
       type: String,
       default: ''
    },
    backgroundColor: {
       type: String,
       default: ''
    }
  },
  data () {
    return {
      tabs: [],
      baseStyles: {
         border: '1px solid ' + this.borderColor,
         background:  this.backgroundColor
      },
      overrideStyles: {
        color: this.tabTextColor
      }
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name
      })
    }
  },
  computed: {
    styleTabHeader: function() {
        return {
        '--color-border': '1px solid ' + this.borderColor,
        '--color-border-bottom': '1px solid ' + this.backgroundColor
        }
    },
    styleTabBody: function() {
        return {
        '--color-background-color': this.backgroundColor 
        }
    }
  }
}
</script>
<style>
*{
  font-family: "Montserrat Regular";
}

a{
  font-family: "Montserrat Regular";
  display: inline-block;
  text-decoration: none;   
}
.tabs ul {
  display: flex;
  padding-left: 30px;
  padding-bottom: 0px;
}
.tabs ul li {
  width: 13%;
  height: 50px;
  /* max-width: calc(100% / 3 - 3px); */
  border-bottom: var(--color-background-color);
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  list-style-type: none;
}

.tabs ul li.is-active {
  border: 1px solid #969eb8;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.tabs ul li .button-tab {
  width: 100%;
  height: 100%;
  color: #2c3e50;
  font-size: 17px;
  text-align: center;
  padding-top: 15px;
  font-weight: normal;
  margin-right: 12px;
  display: inline-block;
  text-decoration: none;
  font-size: 13px;
  font-family: "Montserrat Regular";
  min-width: 120px;
}

.tabs-details {
  margin-left: 30px;
  margin-top: -17px;
  margin-bottom: 10px;
  padding-left: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  background: var(--color-background-color);
  border: 1px solid #969eb8;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  font-family: "Montserrat Regular";
}

</style>
