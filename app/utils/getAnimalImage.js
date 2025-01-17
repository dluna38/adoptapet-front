export default function getAnimalImage(imgName) {
  if(imgName === undefined || imgName === null){
    return '/images/404-image.png'
  }
  return useRuntimeConfig().public.animalImgURL +imgName;
}