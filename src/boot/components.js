import Page from "../components/Page2.vue";
import InputContainer from "../components/InputContainer.vue";
import Input from "../components/Input.vue";
import DatePicker from "../components/Datepicker.vue";
import ToggleBtn from "../components/ToggleBtn.vue";
import Select from "../components/Select.vue";
import Row from "../components/Row";
import CheckboxGroup from "../components/CheckboxGroup.vue";
import Checkbox from "../components/Checkbox.vue";
import CardHome from "../components/CardHome.vue";
import BtnMenu from "../components/BtnMenu";
import BtnStatus from "../components/TogleButton.vue";
import Editor from "../components/Editor";
import FormularioNewUserSpark from "../components/FormularioNewUserSpark";
import FormularioSearchFoldersRede from "../components/FormularioSearchFoldersRede";
import FormularioNewUserWinthor from "../components/FormularioNewUserWinthor";
import ViewDetailNewUser from "../components/ViewDetailNewUser";

import generateCol from "../components/diretives/cols";

export default ({ Vue }) => {
  Vue.component("cc-page", Page);
  Vue.component("cc-input-container", InputContainer);
  Vue.component("cc-input", Input);
  Vue.component("cc-date-picker", DatePicker);
  Vue.component("cc-toggle-btn", ToggleBtn);
  Vue.component("cc-select", Select);
  Vue.component("cc-row", Row);
  Vue.component("cc-checkbox-group", CheckboxGroup);
  Vue.component("cc-checkbox", Checkbox);
  Vue.component("rr-cardhome", CardHome);
  Vue.component("r-btn-menu", BtnMenu);
  Vue.component("r-btn-status", BtnStatus);
  Vue.component("r-editor", Editor);
  Vue.component("r-frm-spark", FormularioNewUserSpark);
  Vue.component("r-frm-rede", FormularioSearchFoldersRede);
  Vue.component("r-frm-winthor", FormularioNewUserWinthor);
  Vue.component("r-view-detail-new-user", ViewDetailNewUser);

  generateCol(Vue);
  generateCol(Vue, "md");
  generateCol(Vue, "lg");
};
