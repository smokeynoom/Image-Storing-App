var uploadBtn = document.getElementById('uploadBtn')
var closeBtn = document.getElementById('closeBtn')
var uploadButton = document.getElementById('uploadButton')
var fileInput = document.getElementById('fileInput')
var imageGallery = document.getElementById('imageGallery')

uploadBtn.addEventListener('click', function () {
      uploadContainer.style.display = 'block'
})

closeBtn.addEventListener('click', function () {
      uploadContainer.style.display = 'none'
      fileInput.value = '' // Reset the file input value when closing the menu
})

uploadButton.addEventListener('click', function () {
      var file = fileInput.files[0]
      if (!file) {
            uploadButton.classList.add('error')
            document.getElementById('errorPopup').classList.remove('hidden')
            setTimeout(function () {
                  uploadButton.classList.remove('error')
                  document.getElementById('errorPopup').classList.add('hidden')
            }, 5000)
            return
      }

      var reader = new FileReader()
      reader.onload = function (e) {
            var imageSrc = e.target.result
            var imageExt = file.name.split('.').at(-1)
            storeImage(imageSrc, imageExt)
            displayImage(imageSrc, imageExt)
            fileInput.value = null
      }
      reader.readAsDataURL(file)

      uploadContainer.style.display = 'none' // Hide the upload menu after uploading
      //fileInput.value = null; // Reset the file input value after uploading
})

// Retrieve images from localStorage and display them in the gallery
for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)
      if (key.startsWith('image_')) {
            var { imageSrc, imageExt } = JSON.parse(localStorage.getItem(key))
            displayImage(imageSrc, imageExt)
      }
}

function storeImage(imageSrc, imageExt) {
      var timestamp = Date.now()
      localStorage.setItem(
            'image_' + timestamp,
            JSON.stringify({ imageExt, imageSrc })
      )
}

function displayImage(imageSrc, imageExt) {
      var imageItem = document.createElement('div')
      imageItem.className = 'imageItem'

      var img = document.createElement('img')
      img.src = imageSrc

      var downloadBtn = document.createElement('button')
      downloadBtn.className = 'downloadButton'
      downloadBtn.innerHTML = '&#x2193;'

      downloadBtn.addEventListener('click', function () {
            downloadImage(imageSrc, imageExt)
      })

      imageItem.appendChild(img)
      imageItem.appendChild(downloadBtn)
      imageGallery.appendChild(imageItem)
}

function downloadImage(imageSrc, imageExt) {
      var link = document.createElement('a')
      link.href = imageSrc
      link.download = 'image.' + imageExt
      link.click()
}
