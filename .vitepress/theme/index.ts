// Theme entry - extend default VitePress theme
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import './styles/vars.css'
import BlogList from './components/BlogList.vue'
import CryptoLab from './components/CryptoLab.vue'
import NeedhubCodeNav from './components/NeedhubCodeNav.vue'
import NeedhubCodeNavDetail from './components/NeedhubCodeNavDetail.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogList', BlogList)
    app.component('CryptoLab', CryptoLab)
    app.component('NeedhubCodeNav', NeedhubCodeNav)
    app.component('NeedhubCodeNavDetail', NeedhubCodeNavDetail)
  }
}
