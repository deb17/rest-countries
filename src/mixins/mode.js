export default {
  methods: {
    changeBtnStyle(newvalue) {
      const btns = document.querySelectorAll('#detail-page button')
      btns.forEach(btn => {
        if (newvalue === true) {
          if (btn.id === 'back') {
            btn.className = 'button is-primary is-outlined'
          }
          btn.classList.add('is-inverted')
        } else {
          if (btn.id === 'back') {
            btn.className = 'button is-primary is-light'
          }
          btn.classList.remove('is-inverted')
        }
      })
    }
  }
}
