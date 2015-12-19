var historyGift = [];
var historyStep = 0;
var curScale = 1.0;

(function($) {

    $(document).ready(function() {

        $('.header-menu-clear').click(function(e) {
            $('.welcome').removeClass('active');
            $('.success').removeClass('active');
            $('.send').removeClass('active');
            $('.submenu').removeClass('active');
            $('.menu li').removeClass('active');
            $('.menu li').addClass('disable');
            $('.container').addClass('active');
            $('.container').html('<div class="content"></div>');
            historyGift = [];
            historyStep = 0;
            $('.menu li:first').removeClass('disable');
            e.preventDefault();
        });

        $('.header-menu-back').click(function(e) {
            historyStep--;
            if (historyStep > 1) {
                $('.container').html(historyGift[historyStep - 1]);
            } else {
                $('.container').html('<div class="content"></div>');
                historyStep = 0;
            }
            $('.content .auto').draggable({
                containment:    'parent',
                stop:           function(event, ui) {
                    historyGift.push($('.container').html());
                    historyStep = historyGift.length;
                }
            });
            $('.content .auto img').resizable({
                containment:    '.content',
                aspectRatio:    true,
                stop:           function(event, ui) {
                    historyGift.push($('.container').html());
                    historyStep = historyGift.length;
                }
            });
            $('.content .text').draggable({
                containment:    'parent',
                stop:           function(event, ui) {
                    historyGift.push($('.container').html());
                    historyStep = historyGift.length;
                }
            });
            $('.content .text img').resizable({
                containment:    '.content',
                aspectRatio:    true,
                stop:           function(event, ui) {
                    historyGift.push($('.container').html());
                    historyStep = historyGift.length;
                }
            });
            e.preventDefault();
        });

        $('.header-menu-inc').click(function(e) {
            curScale += 0.1;
            if (curScale > 1.5) {
                curScale = 1.5;
            }
            $('.content').css({'transform': 'scale(' + curScale + ')'});
            e.preventDefault();
        });

        $('.header-menu-dec').click(function(e) {
            curScale -= 0.1;
            if (curScale < 0.5) {
                curScale = 0.5;
            }
            $('.content').css({'transform': 'scale(' + curScale + ')'});
            e.preventDefault();
        });

        $('.header-menu-help').click(function(e) {
            $('.hint').show();
            e.preventDefault();
        });

        $('.hint').click(function() {
            $('.hint').hide();
        });

        $('body').bind('keyup', function keyUpBody(e) {
            if (e.keyCode == 27) {
                $('.hint').hide();
            }
        });

        $('.header-menu-next').click(function(e) {
            historyStep++;
            if (historyStep <= historyGift.length) {
                $('.container').html(historyGift[historyStep - 1]);
                $('.content .auto').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
                $('.content .auto img').resizable({
                    containment:    '.content',
                    aspectRatio:    true,
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
                $('.content .text').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
                $('.content .text img').resizable({
                    containment:    '.content',
                    aspectRatio:    true,
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
            } else {
                historyStep = historyGift.length;
            }
            e.preventDefault();
        });

        $('.menu a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('disable')) {
                $('.menu li.active').removeClass('active');
                curLi.addClass('active');
                var curIndex = $('.menu li').index(curLi)
                if ($('.submenu-content').eq(curIndex).length == 1) {
                    $('.submenu').addClass('active');
                    $('.submenu-content').removeClass('active');
                    $('.submenu-content').eq(curIndex).addClass('active');
                } else {
                    $('.submenu').removeClass('active');
                }

                if (curLi.find('a').hasClass('menu-send')) {
                    $('.container').removeClass('active');
                    $('.send').addClass('active');
                } else {
                    $('.container').addClass('active');
                    $('.send').removeClass('active');
                }
            }

            e.preventDefault();
        });

        $('.submenu-list').jScrollPane({
            autoReinitialise: true,
            showArrows: true
        });

        $('.submenu-bg a').click(function(e) {
            $('.menu-auto').parent().removeClass('disable');
            $('.content').css({'background-image' : 'url(' + $(this).attr('href') + ')'});
            historyGift.push($('.container').html());
            historyStep = historyGift.length;
            e.preventDefault();
        });

        $('.submenu-auto a').click(function(e) {
            $('.menu-text').parent().removeClass('disable');
            $('.content .auto').remove();
            $('.content').append('<div class="auto"><img src="' + $(this).attr('href') + '" alt="" /></div>');
            $('.content .auto img').load(function() {
                $('.content .auto').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
                $('.content .auto img').resizable({
                    containment:    '.content',
                    aspectRatio:    true,
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
            });
            historyGift.push($('.container').html());
            historyStep = historyGift.length;
            e.preventDefault();
        });

        $('.submenu-text a').click(function(e) {
            $('.menu-send').parent().removeClass('disable');
            var curIndex = $('.submenu-text li').index($(this).parent());
            $('.content .text').remove();
            if (curIndex == 0) {
                $('.content').append('<div class="text text-message-wrap"><textarea name="textmessage" class="text-message" cols="5" rows="10" placeholder="Введите текст поздравления"></textarea></div>');
                $('.content .text').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                    }
                });
            } else if (curIndex == 1) {
                $('.content').append('<div class="text"><img src="' + $(this).attr('href') + '" alt="" /><input type="text" name="texttitle" class="text-title" value="" /></div>');
                $('.content .text img').load(function() {
                    $('.content .text').draggable({
                        containment:    'parent',
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                        }
                    });
                });
            } else {
                $('.content').append('<div class="text"><img src="' + $(this).attr('href') + '" alt="" /></div>');
                $('.content .text img').load(function() {
                    $('.content .text').draggable({
                        containment:    'parent',
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                        }
                    });
                    $('.content .text img').resizable({
                        containment:    '.content',
                        aspectRatio:    true,
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                        }
                    });
                });
            }
            historyGift.push($('.container').html());
            historyStep = historyGift.length;
            e.preventDefault();
        });

        $('.welcome-link').click(function(e) {
            $('.welcome').removeClass('active');
            $('.container').addClass('active');
            $('.menu li:first').removeClass('disable');
            e.preventDefault();
        });

        $('.send form').validate({
            submitHandler: function(form) {
                $('.send').removeClass('active');
                $('.menu li').removeClass('active');
                $('.menu li').addClass('disable');
                $('.success').addClass('active');
            }
        });

        $('.send-address-add').click(function(e) {
            var curBlock = $(this).parents().filter('.send-row');
            if (curBlock.data('curIndex')) {
                var curIndex = curBlock.data('curIndex') + 1;
            } else {
                curBlock.data('curIndex', 1);
            }
            curBlock.before('<div class="send-row">' +
                                '<div class="send-col">' +
                                    '<div class="send-input"><input type="text" name="emailTo[' + curIndex + ']" value="" class="required email" placeholder="Электронный адрес" /></div>' +
                                '</div>' +
                                '<div class="send-col">' +
                                    '<div class="send-input"><input type="text" name="appeal[' + curIndex + ']" value="" class="required" placeholder="Обращение" /></div>' +
                                '</div>' +
                                '<div class="send-col">' +
                                    '<div class="send-input"><input type="text" name="name[' + curIndex + ']" value="" class="required" placeholder="имя" /></div>' +
                                '</div>' +
                            '</div>');
            e.preventDefault();
        });

        $('.success-link').click(function(e) {
            $('.success').removeClass('active');
            $('.container').addClass('active');
            $('.container').html('<div class="content"></div>');
            historyGift = [];
            historyStep = 0;
            $('.menu li:first').removeClass('disable');
            e.preventDefault();
        });

    });

    $(window).bind('load resize', function() {
        var curHeight = $('.wrapper').height() - 80;
        $('.menu, .submenu-list').height(curHeight);
    });

})(jQuery);