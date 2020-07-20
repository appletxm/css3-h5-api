/* global self, caches, fetch, BroadcastChannel */
const version = 'v1'
const CACHE_NAMES = ['txmTestImgCache', 'txmTestJsCache', 'txmTestCssCache']
const cachesFilter = [
  '/workers/test/imgs/1.jpg',
  '/workers/test/js/traceur.js',
  '/workers/test/styles/test.css'
]

console.info('cache version:', version)

// const bc = new BroadcastChannel('sw-messages')
// bc.addEventListener('message', event => {
//   console.log('Worker Received', event.data)
//   bc.postMessage({title: 'Hello from Client'})
// })

function sendMessageToClient(e) {
  self.clients.matchAll().then(function (clients) {
    if (!clients || clients.length === 0) {
      return false
    }
    clients.forEach(function (client) {
      client.postMessage(e.data)
    })
  }).cache(function(err) {
    console.info('post message failed:', err)
  })
}

self.addEventListener('install', function(event) {
  console.info('service worker install...')
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAMES).then(function(cache) {
      console.log('Opened cache for images')
      return cache.addAll(cachesFilter)
    })
  )
})

self.addEventListener('activate', function(e) {
  console.info('service worker activated')
})

self.addEventListener('message', function (e) {
  console.log('service worker receive message', e.data)
  e.waitUntil(
    sendMessageToClient(e)
  )
})

self.addEventListener('fetch', function(event) {
  console.info('service worker fetch...', caches)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // bc.postMessage({request: event.request})
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)

      // // IMPORTANT:Clone the request. A request is a stream and
      // // can only be consumed once. Since we are consuming this
      // // once by cache and once by the browser for fetch, we need
      // // to clone the response.
      // const fetchRequest = event.request.clone()

      // return fetch(fetchRequest).then(
      //   function(response) {
      //     // Check if we received a valid response
      //     if (!response || response.status !== 200 || response.type !== 'basic') {
      //       return response
      //     }

      //     // IMPORTANT:Clone the response. A response is a stream
      //     // and because we want the browser to consume the response
      //     // as well as the cache consuming the response, we need
      //     // to clone it so we have two streams.
      //     var responseToCache = response.clone()

      //     caches.open(CACHE_NAME).then(function(cache) {
      //       cache.put(event.request, responseToCache)
      //     })
      //     return response
      //   }
      // )
    }).catch(function(err) {
      console.info('fetch failed:', err)
    })
  )
})
