export const makeVideosLazy = () => {
  var lazyVideos = [].slice.call(
    document.querySelectorAll('video.home_projects-video')
  )

  if ('IntersectionObserver' in window) {
    var lazyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((video) => {
        if (video.isIntersecting) {
          for (let source in video.target.children) {
            let videoSource = video.target.children[source]
            if (
              typeof videoSource.tagName === 'string' &&
              videoSource.tagName === 'SOURCE'
            ) {
              videoSource.src = videoSource.dataset.src
            }
          }

          video.target.load()
          video.target.classList.remove('lazy')
          lazyVideoObserver.unobserve(video.target)
        }
      })
    })

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo)
    })
  }
}
