export default {
  beforeMount (el, binding) {
    el.clickOutsideEvent = function(event) {
      if (event.target.classList.contains('vue3-discord-emojipicker__trigger') || event.target.classList.contains('vue3-discord-emojipicker__autocomplete') || event.target.classList.contains('vue3-discord-emojipicker__input')) {
        return
      }
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}