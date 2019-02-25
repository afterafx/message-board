import MessageBoardAPI, {
  commentData
} from "../MessageBoardAPI.js";

//
//
//
//

class MessageBoardApp extends HTMLElement {
  constructor() {
    super();

    this.api = new MessageBoardAPI(commentData);
    // set inital state
    this.state = {
      comments: [],
      loading: true,
    }

    this.addEventListener(
      "removeComment",
      this.handleRemoveComment
    );

    this.addEventListener(
      "updateComment",
      this.handleUpdateComment
    );
  }

  // setState({ comments: updatedComments })
  // takes in new pieces of state
  setState(newState) {
    // for each piece of state
    Object.keys(newState).forEach(key => {
      // update the correct key
      this.state[key] = newState[key];
      // select all child elements tracking this piece of state via attributes
      this.querySelectorAll(`[${key}]`).forEach(element => {
        // sets the attribute via the setter
        // element.setAttribute(key, newState[key])
        element[key] = newState[key];
      });
    });
  }

  connectedCallback() {
    this.api.getComments().then(comments => {
      // same as this.state({ comments: comments });
      this.setState({
        comments
      });
    })
    // this.state = {
    //   comments: this.api.getComments();
    // };
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <nav>
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </nav>
      <message-board-comment-list></message-board-comment-list>
        <div class="add-comment">
          <form>
            <input
              type="text"
              name="comment"
              placeholder="Your opinion here"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
    `;

    this.querySelector("message-board-comment-list").setAttribute(
      "comments",
      JSON.stringify(this.state.comments)
    );

    // add event listeners
    this.querySelector("nav form").addEventListener(
      "submit",
      this.handleSearchSubmit
    );
    this.querySelector(".add-comment form").addEventListener(
      "submit",
      this.handleAddComment
    );

  }

  handleSearchSubmit = async event => {
    event.preventDefault();
    const searchText = new FormData(event.target).get("search");
    const updatedComments = await this.api.filterCommentsByText(searchText);
    this.setState({
      comments: updatedComments
    });
  };

  handleAddComment = async event => {
    event.preventDefault();
    const commentText = new FormData(event.target).get("comment");
    const form = new FormData(event.target);
    event.target.reset();
    const updatedComments = await this.api.addComment(commentText);
    console.log(updatedComments);
    this.setState({
      comments: updatedComments
    });
  };

  handleRemoveComment = async event => {
    event.preventDefault();
    const confirmed = window.confirm(`Do you really want to delete "${event.detail}"?`);
    if (confirmed) {
      const updatedComments = await this.api.removeComment(event.target.comment.id);
      this.setState({
        comments: updatedComments
      });
    }
  };

  handleUpdateComment = async event => {
    event.preventDefault();
    const data = window.prompt("Type something new:", event.target.comment.text);

    if (data != null) {
      const updatedComments = await this.api.updateComment(event.target.comment.id, data);
      this.setState({
        comments: updatedComments
      });
    }

  }

}

export default MessageBoardApp;