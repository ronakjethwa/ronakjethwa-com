// Spotify now-playing widget. Loaded only when the widget is enabled (the tag
// referencing this file is conditionally rendered). Poll interval comes from the
// widget's data-poll attribute so this file stays static.
(function () {
  var widget = document.getElementById('now-playing');
  if (!widget) return;

  var pollMs = parseInt(widget.getAttribute('data-poll'), 10) || 60000;
  var art = document.getElementById('np-art');
  var track = document.getElementById('np-track');
  var artist = document.getElementById('np-artist');

  function poll() {
    fetch('/api/now-playing')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data && data.isPlaying) {
          art.src = data.albumArt || '';
          track.textContent = data.track || '';
          artist.textContent = data.artist || '';
          widget.classList.add('visible');
          widget.removeAttribute('aria-hidden');
        } else {
          widget.classList.remove('visible');
          widget.setAttribute('aria-hidden', 'true');
        }
      })
      .catch(function () { widget.classList.remove('visible'); });
  }

  poll();
  setInterval(poll, pollMs);
})();
