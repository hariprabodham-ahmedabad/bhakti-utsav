$(window).on("load", function () {

  $('[name=tab]').each(function (i, d) {
    var p = $(this).prop('checked');
    if (p) {
      $('.mainFrame').eq(i)
        .addClass('on');        
    }
  });

  $('[name=tab]').on('change', function () {
    var p = $(this).prop('checked');
    // $('.zone-selection').css('display','none');
    var i = $('[name=tab]').index(this);

    $('.mainFrame').removeClass('on');
    $('.mainFrame').eq(i).addClass('on');
  });

  var $image = $("#placeholder"),
    cropBoxData,
    canvasData;

  /* cropper initialized */
  function cropFunction() {
    $image.cropper({
      aspectRatio: aspX / aspY,
    });
  }

  var cropedImageData;
  $("#crop-save").on("click", function () {
    cropedImageData = $image.cropper("getCroppedCanvas").toDataURL();
    //console.log(cropedImageData);

    // Generate Image After Crop
    generateImg(cropedImageData);
  });

  $("#crop-modal")
    .on("shown.bs.modal", function () {
      $(".imgInp").trigger("click");
      cropFunction();
    })
    .on("hidden.bs.modal", function () {
      cropBoxData = $image.cropper("getCropBoxData");
      canvasData = $image.cropper("getCanvasData");
      $image.cropper("destroy");
    });

  /* Upload Img */
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        //console.log(e.target.result);
        $image.attr("src", e.target.result);

        cropFunction();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".imgInp").change(function () {
    $image.cropper("destroy");
    readURL(this);
  });
  /* // Upload Img */

  var downloadImgDataUrl;
  var generateImg = function (cropedImageData) {
    $(".cropped").attr("src", cropedImageData);
    $(".button--download").attr("disabled", false);

    setTimeout(() => {
      window.scrollTo(0, 0);
      html2canvas(document.getElementById("capture"), {
        logging: true,
        letterRendering: 1,
        allowTaint: false,
        useCORS: true,
      }).then((canvas) => {
        downloadImgDataUrl = canvas.toDataURL("image/jpeg", 1);
        //console.log(downloadImgDataUrl);
        $(".finalCut").attr("src", downloadImgDataUrl);
      });
    }, 1);
  };

  $(".button--download").on("click", function () {
    var link = document.createElement("a");
    link.download = "download.jpg";
    link.href = downloadImgDataUrl;

    link.click();
  });

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "UA-161453786-1");
});
