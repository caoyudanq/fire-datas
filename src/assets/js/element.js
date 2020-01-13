import
{ Button,
  Pagination,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Aside,
  Header,
  Main,
  Footer,
  Table,
  TableColumn,
  Form,
  FormItem,
  Checkbox,
  Container,
  Row,
  Col,
  Dialog,
  Message,
  Tag
} from 'element-ui'

export default {
  install (Vue) {
    Vue.use(Message)
    Vue.use(Dialog)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Header)
    Vue.use(Button)
    Vue.use(Pagination)
    Vue.use(Input)
    Vue.use(Dropdown)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Footer)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Checkbox)
    Vue.use(Container)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(Tag)
    Vue.prototype.$message = Message
  }
}
