export class FormularioConsts {
  returnIcon(item) {
    if (item === "Spark") {
      return "fas fa-comment-dots";
    } else if (item === "Rede") {
      return "fas fa-network-wired";
    } else if (item === "Winthor") {
      return "fab fa-weebly";
    }
  }

  returnValidButton(data, selection) {
    if (
      data.name &&
      data.setor &&
      selection.includes("Spark") &&
      !selection.includes("Rede") &&
      !selection.includes("Winthor") &&
      data.sparkApelido &&
      data.sparkApelido.toString().length > 0 &&
      data.sparkRamal &&
      data.sparkRamal.toString().length >= 3
    ) {
      return false;
    } else if (
      data.name &&
      data.setor &&
      selection.includes("Rede") &&
      !selection.includes("Spark") &&
      !selection.includes("Winthor") &&
      data.redefoldersSelected.length
    ) {
      return false;
    } else if (
      (data.name &&
        data.setor &&
        selection.includes("Rede") &&
        selection.includes("Spark") &&
        selection.includes("Winthor") &&
        data.redefoldersSelected.toString().length &&
        data.sparkApelido &&
        data.sparkApelido.toString().length > 0 &&
        data.sparkRamal &&
        data.sparkRamal.toString().length >= 3 &&
        data.winthorRotinasLiberar &&
        data.winthorRotinasLiberar.toString().length > 0) ||
      (data.winthorUserReferencia &&
        data.winthorUserReferencia.toString().length > 0 &&
        data.name &&
        data.setor &&
        selection.includes("Rede") &&
        selection.includes("Spark") &&
        selection.includes("Winthor") &&
        data.redefoldersSelected.toString().length &&
        data.sparkApelido &&
        data.sparkApelido.toString().length > 0 &&
        data.sparkRamal &&
        data.sparkRamal.toString().length >= 3)
    ) {
      return false;
    } else if (
      (data.name &&
        data.setor &&
        !selection.includes("Rede") &&
        !selection.includes("Spark") &&
        selection.includes("Winthor") &&
        data.winthorUserReferencia &&
        data.winthorUserReferencia.toString().length > 0) ||
      (data.winthorRotinasLiberar &&
        data.winthorRotinasLiberar.toString().length > 0 &&
        data.name &&
        data.setor &&
        !selection.includes("Rede") &&
        !selection.includes("Spark") &&
        selection.includes("Winthor"))
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export default new FormularioConsts();
