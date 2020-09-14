import Swiper from "swiper"; //подключаем сладер
import "swiper/swiper-bundle.css"; //подключаем стили слайдера

var mySwiper; //объявляем переменную слайдера

initSwiper();

window.onresize = () => initSwiper();

//функция вызова слайдера
function initSwiper() {
  console.log("initSwiper");
  const newsContainer = document.getElementById("news-container"); //получаем элемент "news-container" , и записываем его в константу
  const newsWrapper = document.getElementById("news-wrapper"); //получаем элемент "news-wrapper",  и записываем его в константу
  const newsItems = newsWrapper.children; //получаем массив элементов внутри news-wrapper (т.е. массив будущих слайдов)
  //проверяем, есть ли у нас слайдер и проверяем размер окна (если оно меньше 768, условие выыполняется)
  if (
    newsContainer.className != "swiper-container" &&
    window.innerWidth < 768
  ) {
    newsContainer.className = "swiper-container"; //добовляем к контейнеру новостей класс swiper-container (превращаем контейнер новостей в слайдер)
    newsWrapper.className = "swiper-wrapper";
    for (var i = 0; i < newsItems.length; i++) {
      newsItems[i].className = "news-item swiper-slide"; //превращаем новостные элементы в слайды
    }
    //если слайдер уже есть, то уничтожаем его и создаем новый слайдер, с одним слайдом на экране
    if (mySwiper != undefined) {
      mySwiper.destroy();
    }
    mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      fadeEffect: {
        crossFade: true,
      },
    });
  }
  //если прошлое условие не выполнилось, идем дальше, проверем наличие слайдера и размер окна
  else if (
    newsContainer.className != "swiper-container" &&
    window.innerWidth >= 768 &&
    window.innerWidth <= 1024
  ) {
    newsContainer.className = "swiper-container";
    newsWrapper.className = "swiper-wrapper";
    for (var i = 0; i < newsItems.length; i++) {
      newsItems[i].className = "news-item swiper-slide"; //превращаем новостные элементы в слайды
    }
    //если слайдер уже есть, то уничтожаем его и создаем новый слайдер, с двумя слайдами на экране
    if (mySwiper != undefined) {
      mySwiper.destroy();
    }
    mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 2,
      spaceBetween: 20,
      fadeEffect: {
        crossFade: true,
      },
    });
  }
  //если ни одно из условий не выполнилось и экран боьше 1024пх то уничтожаем слайдер
  else if (mySwiper !== undefined) {
    mySwiper.destroy();
    newsContainer.className = "news-container";
    newsWrapper.className = "news-wrapper";
    for (var i = 0; i < newsItems.length; i++) {
      newsItems[i].className = "news-item";
    }
  }
}
