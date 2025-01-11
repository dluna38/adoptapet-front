<script setup>
import { Menu, PawPrintIcon } from 'lucide-vue-next';

let mobileMenu = null;
let menuButton = null;

onMounted(() => {
  menuButton = document.getElementById('menu-button');
  mobileMenu = document.getElementById('mobile-menu');
  let mobileMenuItems = mobileMenu.querySelectorAll('#mobile-menu > li');
  menuButton.addEventListener('click', () => {
    toggleHidden(mobileMenu);
  });

  mobileMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
      toggleHidden(mobileMenu);
    });
  });
})

function toggleHidden(element){
  element.classList.toggle('hidden');
}
</script>

<template>
  <header class="bg-orange-100 p-4">
    <nav class="container mx-auto ">
      <div class="flex justify-between items-center">
        <NuxtLink to="/administracion" class="flex items-center text-orange-700 text-2xl font-bold">
          <PawPrintIcon class="h-8 w-8 mr-2" />
          PetAdopt
        </NuxtLink>
        <button id="menu-button" class="block sm:hidden text-orange-500 hover:text-orange-700 active:text-orange-900">
          <Menu />
        </button>
        <ul class="hidden sm:flex space-x-4" id="menu">
          <li>
            <NuxtLink to="/administracion" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">Inicio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/administracion/animales" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">
              Animales
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/administracion/config" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">
              Configuracion
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="text-orange-700 hover:text-orange-900" target="_blank" exact-active-class="text-orange-900 font-bold">
              Sitio principal
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/logout" class="text-blac-900 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">
              Cerrar sesión
            </NuxtLink>
          </li>
        </ul>
      </div>
      <ul id="mobile-menu" class="hidden sm:hidden">
        <li>
            <NuxtLink to="/administracion" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">Inicio
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/administracion/animales" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">
              Animales
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/administracion/config" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">
              Configuracion
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="text-orange-700 hover:text-orange-900" target="_blank" exact-active-class="text-orange-900 font-bold">
              Sitio principal
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/logout" class="text-orange-700 hover:text-orange-900" exact-active-class="text-orange-900 font-bold">
              Cerrar sesión
            </NuxtLink>
          </li>
      </ul>
    </nav>
  </header>
</template>