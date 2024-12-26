export default function getAnimalImage(imgName) {
  return  useRuntimeConfig().public.animalImgURL +imgName;
}