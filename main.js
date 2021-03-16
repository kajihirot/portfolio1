"use strict";

$(function () {
  /* =================== */
  /*        wipein       */
  /* =================== */

  // .wipeにinクラスを追加する
  $(".wipe").addClass("in");

  /* =================== */
  /*     back-to-top     */
  /* =================== */

  // back-to-topはトップに戻る

  // 1.スクロールしたら右から出てくる
  $(window).scroll(function () {
    // 画面のスクロール量
    let scrollValue = $(window).scrollTop();
    // 画面の高さ
    let windowHeight = $(window).height();

    // もしスクロール量が、画面の高さを超えたら、back-to-topにinクラスを追加する。
    if (scrollValue > windowHeight) {
      $("#back-to-top").addClass("in");
    } else {
      // もしそうじゃなかったら、back-to-topにinクラスを削除する。
      $("#back-to-top").removeClass("in");
    }
  });

  // 2.クリックしたらトップに戻る
  $("#back-to-top").click(function () {
    //  サイトの1番上に行く(ゆっくり)
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      600
    );
  });

  /* =================== */
  /*   	  hamburger      */
  /* =================== */

  // ハンバーガーをクリックしたら、
  $("#hamburger").click(function () {
    // 1.ハンバーガーをバッテンにする=>CSSから、ハンバーガーにactiveクラスを追加すればできることがわかった。
    $("#hamburger").toggleClass("active");
    // 2.ナビゲーションを表示させる。=> .header-navのdisplayを変えることで表示・非表示ができることがわかった。
    $(".header-nav").fadeToggle();
    // 3.画面をスクロールさせなくする。 =>bodyにhiddenクラスを付け、画面外へスクロールできなくさせる。
    $("body").toggleClass("hidden");
  });

  /* =================== */
  /*    	  header       */
  /* =================== */

  /* =================== */
  /*   	  slideshow      */
  /* =================== */

  let nowPage = 0; // 現在の画像
  let nextPage = 1; // 次の画像
  const slides = $("#slideshow img");
  const slideLength = slides.length; // 4
  const fadeTime = 1500; // 1.5s
  const showTime = 3000; // 3s

  // 画像の1ループ
  const slideShow = () => {
    // (0 + 1) % 4 = 1
    // (1 + 1) % 4 = 2
    // (2 + 1) % 4 = 3
    // (3 + 1) % 4 = 0   あまりが0だから
    nextPage = (nowPage + 1) % slideLength;
    // 今の画像が1.5sでフェードアウト
    // .eq(0)
    // .eq(1)
    // .eq(2)
    // .eq(3)
    slides.eq(nowPage).fadeOut(fadeTime);
    // 次の画像が1.5sでフェードイン
    // .eq(1)
    // .eq(2)
    // .eq(3)
    // .eq(0)
    slides.eq(nextPage).fadeIn(fadeTime);
    // nowPage = 1
    // nowPage = 2
    // nowPage = 3
    // nowPage = 0
    nowPage = nextPage;
  };

  // 画像全てを display: none;
  slides.hide();
  // 1つ目の画像だけ display: block;
  slides.eq(0).show();
  // 3秒毎に slideShow関数を実行する
  setInterval(slideShow, showTime);

  /* =================== */
  /*   	   slidein       */
  /* =================== */

  // 画面をスクロールした時、slideクラスに対してinクラスを付与する。

  // $(window).scroll(function () {
  //   let trigger_point =
  //     $(".slide-trigger").offset().top - $(window).height() / 2;
  //   // console.log(trigger_point);
  //   let scrollValue = $(window).scrollTop();
  //   // console.log(scrollValue);

  //   // スクロール量が、trigger_pointを超えた時に、slideクラスに対してinクラスを付与する
  //   if (scrollValue > trigger_point) {
  //     $(".slide").addClass("in");
  //   }
  // });

  $(window).scroll(function () {
    $(".slide-trigger").each(function () {
      let trigger_point = $(this).offset().top - $(window).height() / 2;
      let scrollValue = $(window).scrollTop();

      if (scrollValue > trigger_point) {
        $(this).find(".slide").addClass("in");
      }
    });
  });

  // find と childrenの違い

  // 何を、何した時に、(もし)、何の、何が、どうなる

  // windowを、スクロールした時、(".slide-trigger")が画面の中央にきたら、slideクラスに対して、inクラスを付与する。

  /* =================== */
  /*    carousel panel   */
  /* =================== */

  const carouselWidth = $("#carousel li").width(); //370px
  const length = $(".carousel-item").length; //7
  const innerWidth = carouselWidth * length; //2590px
  const time = 400;

  const carouselinner = $("#carousel");
  const prev = $("#prev");
  const next = $("#next");

  let c = 1;

  next.click(function () {
    if (c == length) {
      carouselinner.stop().animate(
        {
          left: 0,
        },
        time
      );
      c = 1;
    } else {
      carouselinner.stop().animate(
        {
          left: -c * carouselWidth,
        },
        time
      );
      c++;
    }
  });

  prev.click(function () {
    if (c == 1) {
      carouselinner.stop().animate(
        {
          left: carouselWidth - innerWidth, // 370 - 2590
        },
        time
      );
      c = length;
    } else {
      carouselinner.stop().animate(
        {
          left: -(c - 2) * carouselWidth,
          // c = 7,
          // -5 * 370 = -1850
          // c = 6 ,
          // -4 * 370 = -1480
        },
        time
      );
      c--;
    }
  });

  /* =================== */
  /*       parallax      */
  /* =================== */
  $(window).scroll(function () {
    let value = -$(window).scrollTop() / 60; //-(スクロール量の取得)

    $(".parallax").css({
      transform: "translateY(" + value + "%)",
    });
  });
});
