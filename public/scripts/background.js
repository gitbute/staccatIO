var counter = 0;
function changeBG() {
  var imgs = [
    "url(https://images.unsplash.com/photo-1453906971074-ce568cccbc63?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/uploads/1411606977489000af84a/3ae98ccd?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/photo-1444824775686-4185f172c44b?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/photo-1439394735740-bd8a4ccd0d0e?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/photo-1445985543470-41fba5c3144a?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/photo-1457523054379-8d03ab9fc2aa?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/photo-1502205403960-618401e1ad98?dpr=1&auto=compress)",
    "url(https://images.unsplash.com/photo-1499442711659-a9566695faed?dpr=1&auto=compress)"
  ]

  if (counter === imgs.length) counter = 0;
  $("body").css("background-image", imgs[counter]);

  counter++;
}

setInterval(changeBG, 2000);