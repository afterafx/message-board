export default class CommentList extends HTMLElement {
  static get observedAttributes() {
    return ['comments'];
  }

  get comments() {
    if (this.hasAttribute('comments')) {
      return JSON.parse(this.getAttribute('comments'));
    }
    return [];
  }

  // allows us to set 'comments" atributes by using this.comments = newVal
  set comments(val) {
    // transform array into string via JSON.stringify
    this.setAttribute('comments', JSON.stringify(val));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.comments.forEach(comment => {
      // create a comment-list element
      const newComment = document.createElement('message-board-comment-item');
      // set its comment attribute
      // newComment.setAttribute('comment', JSON.stringify(comment));
      newComment.comment = comment;
      // append it to comment list
      this.appendChild(newComment);
    });
  }

  // <message-board-comment-list></message-board-comment-list>
  // listens for changes on the observed attributes
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}