export class Modal {
  constructor(contentId, fallbackMessage) {
    this.fallbackMessage = fallbackMessage;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    /*      Test to see if the browser supports the HTML template element by checking
        for the presence of the template element's content attribute. */
    if ("content" in document.createElement("template")) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalElement.appendChild(contentElement);
      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
    } else {
      alert(this.fallbackMessage);
    }
  }

  hide() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.backdropElement.remove();
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
