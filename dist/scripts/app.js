$(document).ready(function () {

    const body = $('body');
    /**
     * Для кликов вне элемента, обрабатывается массив объектов
     * обрабатывается массив объектов где первый элемент - целевой div
     * второй элесмент - класс для удаления
     */

    $(document).click(function (e) {
        const divs = [
            {
                div: $('.head-logo__search'),
                class: 'head-logo__search_visible'
            },
            {
                div: $('.tooltips'),
                class: 'visible'
            }
        ];

        divs.forEach(el => {
            if (!el.div.is(e.target) && el.div.has(e.target).length === 0) {
                el.div.removeClass(el.class);
            }
        });
    });


    /**
     *  Обработка формы количества
     */

    $('.form__counter i').click(function () {
        const parent = $(this).parent();
        const input = parent.find('input');
        let value = Number(input.val());
        const direction = $(this).data('direction');

        if (direction === 'up') {
            value++;
        } else {
            value--;
            value = value <= 0 ? 1 : value;
        }

        input.val(value);
    });


    /**
     * Обработка клика по кнопке поиска
     */

    const searchBlock = $('.head-logo__search');
    const searchInput = $('#search__input');

    $('#search__btn').click(function (e) {
        e.preventDefault();
        searchBlock.toggleClass('head-logo__search_visible');
        searchInput.focus();
    });


    /**
     * Обработка клика открытия tooltip
     */

    const tooltipBtn = $('.open-tooltip');

    tooltipBtn.click(function (e) {
        if (window.innerWidth < 768) {
            return true;
        }

        e.preventDefault();
        e.stopPropagation();

        const idTooltip = $(this).data('tooltip');
        const tooltipElement = $(idTooltip);

        console.log(tooltipElement);

        tooltipElement.toggleClass('visible');
    });


    /**
     *  Прокрутка и появление верхнего меню
     */
    const head = $('.head');

    $(window).scroll(function (e) {
        let scroll = $(window).scrollTop();

        if (scroll > 70) {
            head.addClass('head__sticky');
        } else {
            head.removeClass('head__sticky');
        }
    })


    /**
     *  Мобильное меню
     */

    const mobileMenu = $('.head-menu__mobile');
    const mobileMenuItem = $('.head-menu__mobile a');
    const mobileMenuBtn = $('.head-logo__mobile-btn a');

    mobileMenuItem.click(function (e) {
        const parent = $(this).parent('li');

        if (!parent.find('ul')) {
            return true;
        }

        e.preventDefault();
        parent.find('>ul').toggleClass('visible__submenu');
    });

    mobileMenuBtn.click(function (e) {
        e.preventDefault();

        mobileMenu.toggleClass('head-menu__mobile_visible');

        if (mobileMenu.hasClass('head-menu__mobile_visible')) {
            $(this).html('<i class="las la-times"></i>');
            body.addClass('open-modal');
        } else {
            $(this).html('<i class="las la-bars"></i>');
            body.removeClass('open-modal');
        }
    });


    /**
     *  Слайдер на главной
     */

    $('.home-slider ul').slick({
        slidesToShow: 1,
        infinity: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<i class="las la-angle-left"></i>',
        nextArrow: '<i class="las la-angle-right"></i>',
        customPaging: function() {
            return '<span class="slider__dot slider__dot_home"></span>';
        },
    });


    /**
     *  Карусель отзывов
     */

    $('.reviews__body').slick({
        slidesToShow: 2,
        infinity: true,
        arrows: false,
        dots: true,
        customPaging: function() {
            return '<span class="slider__dot slider__dot_reviews"></span>';
        },
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


    /**
     *  Карусель товаров
     */

    $('.catalog__carousel').slick({
        slidesToShow: 5,
        prevArrow: '<i class="las la-angle-left"></i>',
        nextArrow: '<i class="las la-angle-right"></i>',
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]

    });

    $('.catalog__item-carousel').slick({
        slidesToShow: 1,
        prevArrow: '<i class="las la-angle-left"></i>',
        nextArrow: '<i class="las la-angle-right"></i>',
    });


    /**
     *  Табы контактов
     */

    const contactTabs = $('.contact__tabs-item');

    contactTabs.click(function(e) {
        e.preventDefault();

        let activeTab = $('.contact__tabs .active');
        let activeTabContent = $(this).attr('href');

        activeTab.removeClass('active');
        $(this).addClass('active');

        $('.contact__tab_visible').removeClass('contact__tab_visible');
        $('[data-tab="' + activeTabContent + '"').addClass('contact__tab_visible');
    });


    /**
     *  Валидация формы
     */

    const formBtn = $('.form-submit__btn');

    formBtn.click(function (e) {
        e.preventDefault();

        let errorsElement = [];
        const form = $(this).parents('.form_valid');

        let formRequired = form.find('.form-required');

        formRequired.each(function() {
            let val = $(this).val();

            if (!val) {
                errorsElement.push($(this));
                let parent = $(this).parents('.form__item');

                parent.addClass('form__item_error');
            }
        });

        if (!errorsElement.length) {
            form.submit();
        }
    });

    $('.form-required').on('input', function() {
        const parent = $(this).parents('.form__item_error');
        parent.removeClass('form__item_error');
    });


    /**
     *  Аккардион
     */

    let currentAccordionItem = null;

    $('.accordion__header').click(function() {

        const parent = $(this).parents('.accordion__item');
        const body = parent.find('.accordion__body');

        if (currentAccordionItem && !currentAccordionItem.is(parent)) {
            currentAccordionItem.removeClass('accordion__item_active');
            currentAccordionItem.find('.accordion__body').css('max-height', 0);
        }

        if (parent.hasClass('accordion__item_active')) {
            parent.removeClass('accordion__item_active');
            body.css('max-height', 0);

            currentAccordionItem = null;
        } else {
            parent.addClass('accordion__item_active');
            body.css('max-height', body.prop('scrollHeight'));

            currentAccordionItem = parent;
        }

    });


    /**
     *  Аккардион категорий каталог
     */

    $('.catalog__menu a').click(function (e) {
        const parent = $(this).parent();
        const list = parent.find('ul').first();

        if (!list.length) {
            return true;
        }

        e.preventDefault();

        if (parent.hasClass('catalog__menu_active')) {
            parent.find('ul').slideUp(300);
            parent.find('li').removeClass('catalog__menu_active');
            parent.removeClass('catalog__menu_active');
        } else {
            list.slideDown(300);
            parent.addClass('catalog__menu_active');
        }

    });


    /**
     *  Переключение стилей (список/сетка) кататлога
     */

    const catalogList = $('.catalog__list');
    catalogStyleRefresh();

    $('.catalog__sort a').click(function (e) {
        e.preventDefault();

        let type = $(this).data('type');

        if (type === 'list') {
            localStorage.setItem('catalog-type', 'list');
        } else {
            localStorage.setItem('catalog-type', 'grid');
        }

        catalogStyleRefresh();
    });

    function catalogStyleRefresh() {
        const type = localStorage.getItem('catalog-type');

        $('.catalog__sort_active').removeClass('catalog__sort_active');

        if (type === 'list') {
            catalogList.addClass('catalog__list_flat');
            $('[data-type="list"]').addClass('catalog__sort_active');
        } else {
            catalogList.removeClass('catalog__list_flat');
            $('[data-type="grid"]').addClass('catalog__sort_active');
        }
    }


    /**
     *  Галлерея продукта
     */

    const galleryZoom = $('.gallery__zoom');

    // Вертикальный слайдер

    $('.gallery__nav').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        infinity: false,
        prevArrow: '<i class="las la-angle-up"></i>',
        nextArrow: '<i class="las la-angle-down"></i>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                }
            }
        ]
    });

    // Переключение слайдов в основном окне

    $('.gallery__nav a').click(function (e) {
        e.preventDefault();

        $('.gallery__nav_active').removeClass('gallery__nav_active');
        $(this).addClass('gallery__nav_active');

        const selectImg = $(this).find('img');
        const currentImg = galleryZoom.find('img');
        const currentLink = galleryZoom.find('a');

        currentImg.attr('src', selectImg.attr('src'));
        currentLink.attr('href', selectImg.attr('src'));

        refreshFsLightbox();
    })

    // Зумирование изображения

    galleryZoom.mousemove(function (e) {

        let mouseX = e.pageX - $(this).offset().left;
        let mouseY = e.pageY - $(this).offset().top;

        let thumbnailWidth = $(this).width();
        let thumbnailHeight = $(this).height();

        const img = $(this).find('img');
        let imgW = img.width() * 2.5;
        let imgH = img.height() * 2.5;

        let posX = -(Math.round((mouseX/thumbnailWidth)*100)/100 - 0.5) * (imgW - thumbnailWidth);
        let posY = -(Math.round((mouseY/thumbnailHeight)*100)/100 - 0.5) * (imgH - thumbnailHeight);

        img.css('transform', `translate(${posX}px, ${posY}px) scale(2.5)`);
    });

    galleryZoom.mouseleave(function () {
        const img = $(this).find('img');
        img.css('transform', `translate(0, 0) scale(1)`);
    });


    /**
     *  Табы продукта
     */

    $('.tabs__link a').click(function (e) {
        e.preventDefault();
        const tab = $(this).parent();
        const tabLink = $(this).attr('href');

        $('.tabs__link_active').removeClass('tabs__link_active');
        tab.addClass('tabs__link_active');

        $('.tabs__item_active').removeClass('tabs__item_active');
        $(tabLink).addClass('tabs__item_active');
    });


    /**
     *  Отзывы о продукте
     */

    $('.progress__wrapper').each(function () {

        const progress = $(this).find('.progress__value')

        const maxValue = Number ($(this).data('max'));
        const value = Number ($(this).data('value'));
        const ratio = (value/maxValue).toFixed(2);

        const width = $(this).width();

        console.log(value);

        progress.width(width * ratio);
    });

    $('.product-reviews__tabs a').click(function (e) {
        e.preventDefault();

        const tabLink = $(this).attr('href');

        $('.product-reviews__tabs_active')
            .removeClass('product-reviews__tabs_active');
        $(this)
            .addClass('product-reviews__tabs_active');

        $('.product-reviews__items_active')
            .removeClass('product-reviews__items_active');
        $(tabLink)
            .addClass('product-reviews__items_active');
    })

    /**
     *  Аккардион карты
     */

    $('.order__item-head a, .order__item-btn a').click(function (e) {
        e.preventDefault();

        const link = $(this).attr('href');

        $('.hide').slideUp(300);
        $(link).slideDown(300);

    });
});