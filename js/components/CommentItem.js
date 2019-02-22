export default class CommentItem extends HTMLElement {
  get comment() {
    if (this.hasAttribute('comment')) {
      return JSON.parse(this.getAttribute('comment'));
    }
    return {
      timestamp: 0,
      text: '',
      id: -1,
    }
  }

  set comment(val) {
    this.setAttribute('comment', JSON.stringify(val));
  }


  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <p>${this.comment.text}</p>
      <button type="button" class="delete-button">x</button>
      <button type="button" class="edit-button">Edit</button>
    `;

    // create custom event and emit it
    this.querySelector('button.delete-button').addEventListener('click', this.dispatchRemoveEvent);
    this.querySelector('button.edit-button').addEventListener('click', this.dispatchUpdateEvent);

  }

  dispatchRemoveEvent = () => {
    this.dispatchEvent(
      new CustomEvent('removeComment', {
        bubbles: true,
        detail: this.comment.text,
      })
    );
  }

  dispatchUpdateEvent = () => {
    // const updatedData = window.prompt("Enter updated text:", this.comment.text);
    this.dispatchEvent(
      new CustomEvent('updateComment', {
        bubbles: true,
        detail: this.comment.text,
      })
    );
  }

}