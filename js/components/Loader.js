export default class Loading {
  constructor() {
    // super();

    this.state = {
      loading: true
    }
  }

  getLoading() {
    return this.hasAttribute('loader')
  }


  // setLoading(val) {
  //   this.hasAttribute('loading') ? 'loading' : '';
  // }

  connectedCallback() {
    this.render();
  }
}