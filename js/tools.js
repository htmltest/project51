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
            $('.gift-form input').val('');
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
            $('input[name="bgID"]').val($('.content').attr('bgID'));

            if ($('.content .auto').length == 1) {
                $('input[name="autoID"]').val($('.content .auto').attr('autoID'));
                $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                $('input[name="autoWidth"]').val($('.content .auto img').width());
                $('input[name="autoHeight"]').val($('.content .auto img').height());
                $('.content .auto').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                        $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                        $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                    }
                });
                $('.content .auto img').resizable({
                    containment:    '.content',
                    aspectRatio:    true,
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                        $('input[name="autoWidth"]').val($('.content .auto img').width());
                        $('input[name="autoHeight"]').val($('.content .auto img').height());
                    }
                });
            }

            if (Modernizr.touchevents) {
                var touchStartAutoX = 0;
                var touchStartAutoY = 0;
                var touchMoveAutoX = 0;
                var touchMoveAutoY = 0;
                var curBlock = $('.content .auto');

                curBlock.on('touchstart', function(e) {
                    if (event.targetTouches.length == 1) {
                        event.preventDefault();
                        touchStartAutoX = event.targetTouches[0].pageX;
                        touchStartAutoY = event.targetTouches[0].pageY;
                    }
                });

                curBlock.on('touchmove', function(e) {
                    touchMoveAutoX = event.targetTouches[0].pageX - touchStartAutoX;
                    touchMoveAutoY = event.targetTouches[0].pageY - touchStartAutoY;
                    curBlock.css({'margin-left': touchMoveAutoX, 'margin-top': touchMoveAutoY});
                });

                curBlock.on('touchend', function(e) {
                    curBlock.css({'left': Number($('.content .auto').css('left').replace(/px/, '')) + Number($('.content .auto').css('margin-left').replace(/px/, '')), 'top': Number($('.content .auto').css('top').replace(/px/, '')) + Number($('.content .auto').css('margin-top').replace(/px/, ''))});
                    curBlock.css({'margin-left': 0, 'margin-top': 0});
                    $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                    $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                });
            }

            if ($('.content .text').length == 1) {
                $('input[name="textID"]').val($('.content .text').attr('textID'));
                $('input[name="textLeft"]').val($('.content .text').css('left').replace(/px/, ''));
                $('input[name="textTop"]').val($('.content .text').css('top').replace(/px/, ''));
                $('input[name="textWidth"]').val($('.content .text img').width());
                $('input[name="textHeight"]').val($('.content .text img').height());
                $('.content .text').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                        $('input[name="textLeft"]').val(Number($('.content .text').css('left').replace(/px/, '')) + 26);
                        $('input[name="textTop"]').val(Number($('.content .text').css('top').replace(/px/, '')) + 26);
                    }
                });
                if ($('input[name="textID"]').val() == '1') {
                    $('.text-message').change(function() {
                        $('textarea[name="textValue"]').val($(this).val());
                    });
                } else if ($('input[name="textID"]').val() != '2') {
                    $('.text-title').change(function() {
                        $('textarea[name="textValue"]').val($(this).val());
                    });
                } else {
                    $('.content .text img').resizable({
                        containment:    '.content',
                        aspectRatio:    true,
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                            $('input[name="textWidth"]').val($('.content .text img').width());
                            $('input[name="textHeight"]').val($('.content .text img').height());
                        }
                    });
                }
            }

            if (Modernizr.touchevents) {
                var touchStartTextX = 0;
                var touchStartTextY = 0;
                var touchMoveTextX = 0;
                var touchMoveTextY = 0;
                var curBlock = $('.content .text');

                curBlock.on('touchstart', function(e) {
                    if (event.targetTouches.length == 1) {
                        event.preventDefault();
                        touchStartTextX = event.targetTouches[0].pageX;
                        touchStartTextY = event.targetTouches[0].pageY;
                    }
                });

                curBlock.on('touchmove', function(e) {
                    touchMoveTextX = event.targetTouches[0].pageX - touchStartTextX;
                    touchMoveTextY = event.targetTouches[0].pageY - touchStartTextY;
                    curBlock.css({'margin-left': touchMoveTextX, 'margin-top': touchMoveTextY});
                });

                curBlock.on('touchend', function(e) {
                    curBlock.css({'left': Number($('.content .text').css('left').replace(/px/, '')) + Number($('.content .text').css('margin-left').replace(/px/, '')), 'top': Number($('.content .text').css('top').replace(/px/, '')) + Number($('.content .text').css('margin-top').replace(/px/, ''))});
                    curBlock.css({'margin-left': 0, 'margin-top': 0});
                    $('input[name="textLeft"]').val($('.content .text').css('left').replace(/px/, ''));
                    $('input[name="textTop"]').val($('.content .text').css('top').replace(/px/, ''));
                });
            }

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
                $('input[name="bgID"]').val($('.content').attr('bgID'));

                if ($('.content .auto').length == 1) {
                    $('input[name="autoID"]').val($('.content .auto').attr('autoID'));
                    $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                    $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                    $('input[name="autoWidth"]').val($('.content .auto img').width());
                    $('input[name="autoHeight"]').val($('.content .auto img').height());
                    $('.content .auto').draggable({
                        containment:    'parent',
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                            $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                            $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                        }
                    });
                    $('.content .auto img').resizable({
                        containment:    '.content',
                        aspectRatio:    true,
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                            $('input[name="autoWidth"]').val($('.content .auto img').width());
                            $('input[name="autoHeight"]').val($('.content .auto img').height());
                        }
                    });
                }

                if (Modernizr.touchevents) {
                    var touchStartAutoX = 0;
                    var touchStartAutoY = 0;
                    var touchMoveAutoX = 0;
                    var touchMoveAutoY = 0;
                    var curBlock = $('.content .auto');

                    curBlock.on('touchstart', function(e) {
                        if (event.targetTouches.length == 1) {
                            event.preventDefault();
                            touchStartAutoX = event.targetTouches[0].pageX;
                            touchStartAutoY = event.targetTouches[0].pageY;
                        }
                    });

                    curBlock.on('touchmove', function(e) {
                        touchMoveAutoX = event.targetTouches[0].pageX - touchStartAutoX;
                        touchMoveAutoY = event.targetTouches[0].pageY - touchStartAutoY;
                        curBlock.css({'margin-left': touchMoveAutoX, 'margin-top': touchMoveAutoY});
                    });

                    curBlock.on('touchend', function(e) {
                        curBlock.css({'left': Number($('.content .auto').css('left').replace(/px/, '')) + Number($('.content .auto').css('margin-left').replace(/px/, '')), 'top': Number($('.content .auto').css('top').replace(/px/, '')) + Number($('.content .auto').css('margin-top').replace(/px/, ''))});
                        curBlock.css({'margin-left': 0, 'margin-top': 0});
                        $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                        $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                    });
                }

                if ($('.content .text').length == 1) {
                    $('input[name="textID"]').val($('.content .text').attr('textID'));
                    $('input[name="textLeft"]').val($('.content .text').css('left').replace(/px/, ''));
                    $('input[name="textTop"]').val($('.content .text').css('top').replace(/px/, ''));
                    $('input[name="textWidth"]').val($('.content .text img').width());
                    $('input[name="textHeight"]').val($('.content .text img').height());
                    $('.content .text').draggable({
                        containment:    'parent',
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                            $('input[name="textLeft"]').val(Number($('.content .text').css('left').replace(/px/, '')) + 26);
                            $('input[name="textTop"]').val(Number($('.content .text').css('top').replace(/px/, '')) + 26);
                        }
                    });
                    if ($('input[name="textID"]').val() == '1') {
                        $('.text-message').change(function() {
                            $('textarea[name="textValue"]').val($(this).val());
                        });
                    } else if ($('input[name="textID"]').val() != '2') {
                        $('.text-title').change(function() {
                            $('textarea[name="textValue"]').val($(this).val());
                        });
                    } else {
                        $('.content .text img').resizable({
                            containment:    '.content',
                            aspectRatio:    true,
                            stop:           function(event, ui) {
                                historyGift.push($('.container').html());
                                historyStep = historyGift.length;
                                $('input[name="textWidth"]').val($('.content .text img').width());
                                $('input[name="textHeight"]').val($('.content .text img').height());
                            }
                        });
                    }
                }

                if (Modernizr.touchevents) {
                    var touchStartTextX = 0;
                    var touchStartTextY = 0;
                    var touchMoveTextX = 0;
                    var touchMoveTextY = 0;
                    var curBlock = $('.content .text');

                    curBlock.on('touchstart', function(e) {
                        if (event.targetTouches.length == 1) {
                            event.preventDefault();
                            touchStartTextX = event.targetTouches[0].pageX;
                            touchStartTextY = event.targetTouches[0].pageY;
                        }
                    });

                    curBlock.on('touchmove', function(e) {
                        touchMoveTextX = event.targetTouches[0].pageX - touchStartTextX;
                        touchMoveTextY = event.targetTouches[0].pageY - touchStartTextY;
                        curBlock.css({'margin-left': touchMoveTextX, 'margin-top': touchMoveTextY});
                    });

                    curBlock.on('touchend', function(e) {
                        curBlock.css({'left': Number($('.content .text').css('left').replace(/px/, '')) + Number($('.content .text').css('margin-left').replace(/px/, '')), 'top': Number($('.content .text').css('top').replace(/px/, '')) + Number($('.content .text').css('margin-top').replace(/px/, ''))});
                        curBlock.css({'margin-left': 0, 'margin-top': 0});
                        $('input[name="textLeft"]').val($('.content .text').css('left').replace(/px/, ''));
                        $('input[name="textTop"]').val($('.content .text').css('top').replace(/px/, ''));
                    });
                }
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
                    $('.menu-mobile').addClass('with-submenu');
                    $('.submenu-content').removeClass('active');
                    $('.submenu-content').eq(curIndex).addClass('active');
                } else {
                    $('.submenu').removeClass('active');
                    $('.menu-mobile').removeClass('with-submenu');
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
            $('.content').attr('bgID', $(this).data('id'));
            $('input[name="bgID"]').val($(this).data('id'));
            historyGift.push($('.container').html());
            historyStep = historyGift.length;
            e.preventDefault();
        });

        $('.submenu-auto a').click(function(e) {
            $('.menu-text').parent().removeClass('disable');
            $('.content .auto').remove();
            $('.content').append('<div class="auto" autoID="' + $(this).data('id') + '"><img src="' + $(this).attr('href') + '" alt="" /></div>');
            $('input[name="autoID"]').val($(this).data('id'));
            $('.content .auto img').load(function() {
                $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                $('input[name="autoWidth"]').val($('.content .auto img').width());
                $('input[name="autoHeight"]').val($('.content .auto img').height());

                $('.content .auto').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                        $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                        $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                    }
                });
                $('.content .auto img').resizable({
                    containment:    '.content',
                    aspectRatio:    true,
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                        $('input[name="autoWidth"]').val($('.content .auto img').width());
                        $('input[name="autoHeight"]').val($('.content .auto img').height());
                    }
                });

                if (Modernizr.touchevents) {
                    var touchStartAutoX = 0;
                    var touchStartAutoY = 0;
                    var touchMoveAutoX = 0;
                    var touchMoveAutoY = 0;
                    var curBlock = $('.content .auto');

                    curBlock.on('touchstart', function(e) {
                        if (event.targetTouches.length == 1) {
                            event.preventDefault();
                            touchStartAutoX = event.targetTouches[0].pageX;
                            touchStartAutoY = event.targetTouches[0].pageY;
                        }
                    });

                    curBlock.on('touchmove', function(e) {
                        touchMoveAutoX = event.targetTouches[0].pageX - touchStartAutoX;
                        touchMoveAutoY = event.targetTouches[0].pageY - touchStartAutoY;
                        curBlock.css({'margin-left': touchMoveAutoX, 'margin-top': touchMoveAutoY});
                    });

                    curBlock.on('touchend', function(e) {
                        curBlock.css({'left': Number($('.content .auto').css('left').replace(/px/, '')) + Number($('.content .auto').css('margin-left').replace(/px/, '')), 'top': Number($('.content .auto').css('top').replace(/px/, '')) + Number($('.content .auto').css('margin-top').replace(/px/, ''))});
                        curBlock.css({'margin-left': 0, 'margin-top': 0});
                        $('input[name="autoLeft"]').val($('.content .auto').css('left').replace(/px/, ''));
                        $('input[name="autoTop"]').val($('.content .auto').css('top').replace(/px/, ''));
                    });
                }
            });
            historyGift.push($('.container').html());
            historyStep = historyGift.length;
            e.preventDefault();
        });

        $('.submenu-text a').click(function(e) {
            $('.menu-send').parent().removeClass('disable');
            var curIndex = $('.submenu-text li').index($(this).parent());
            $('.content .text').remove();
            $('input[name="textID"]').val($(this).data('id'));
            $('input[name="textLeft"]').val('26');
            $('input[name="textTop"]').val('26');
            if (curIndex == 0) {
                $('.content').append('<div class="text text-message-wrap" textID="' + $(this).data('id') + '"><textarea name="textmessage" class="text-message" cols="5" rows="10" placeholder="Введите текст поздравления"></textarea></div>');
                $('input[name="textWidth"]').val($('.content .text').width());
                $('input[name="textHeight"]').val($('.content .text').height());
                $('.content .text').draggable({
                    containment:    'parent',
                    stop:           function(event, ui) {
                        historyGift.push($('.container').html());
                        historyStep = historyGift.length;
                        $('input[name="textLeft"]').val(Number($('.content .text').css('left').replace(/px/, '')) + 26);
                        $('input[name="textTop"]').val(Number($('.content .text').css('top').replace(/px/, '')) + 26);
                    }
                });
                $('.text-message').change(function() {
                    $('textarea[name="textValue"]').val($(this).val());
                });
            } else if (curIndex == 1) {
                $('.content').append('<div class="text" textID="' + $(this).data('id') + '"><img src="' + $(this).attr('href') + '" alt="" /><input type="text" name="texttitle" class="text-title" value="" /></div>');
                $('.content .text img').load(function() {
                    $('input[name="textWidth"]').val($('.content .text img').width());
                    $('input[name="textHeight"]').val($('.content .text img').height());
                    $('.content .text').draggable({
                        containment:    'parent',
                        stop:           function(event, ui) {
                            historyGift.push($('.container').html());
                            historyStep = historyGift.length;
                            $('input[name="textLeft"]').val(Number($('.content .text').css('left').replace(/px/, '')) + 26);
                            $('input[name="textTop"]').val(Number($('.content .text').css('top').replace(/px/, '')) + 26);
                        }
                    });
                });
                $('.text-title').change(function() {
                    $('textarea[name="textValue"]').val($(this).val());
                });
            } else {
                $('.content').append('<div class="text" textID="' + $(this).data('id') + '"><img src="' + $(this).attr('href') + '" alt="" /></div>');
                $('.content .text img').load(function() {
                    $('input[name="textWidth"]').val($('.content .text img').width());
                    $('input[name="textHeight"]').val($('.content .text img').height());
                    $('.content .text').draggable({
                        containment:    'parent',
                        stop:           function(event, ui) {
                            $('input[name="textLeft"]').val(Number($('.content .text').css('left').replace(/px/, '')) + 26);
                            $('input[name="textTop"]').val(Number($('.content .text').css('top').replace(/px/, '')) + 26);
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
                            $('input[name="textWidth"]').val($('.content .text img').width());
                            $('input[name="textHeight"]').val($('.content .text img').height());
                        }
                    });
                });
            }

            if (Modernizr.touchevents) {
                var touchStartTextX = 0;
                var touchStartTextY = 0;
                var touchMoveTextX = 0;
                var touchMoveTextY = 0;
                var curBlock = $('.content .text');

                curBlock.on('touchstart', function(e) {
                    if (event.targetTouches.length == 1) {
                        event.preventDefault();
                        touchStartTextX = event.targetTouches[0].pageX;
                        touchStartTextY = event.targetTouches[0].pageY;
                    }
                });

                curBlock.on('touchmove', function(e) {
                    touchMoveTextX = event.targetTouches[0].pageX - touchStartTextX;
                    touchMoveTextY = event.targetTouches[0].pageY - touchStartTextY;
                    curBlock.css({'margin-left': touchMoveTextX, 'margin-top': touchMoveTextY});
                });

                curBlock.on('touchend', function(e) {
                    curBlock.css({'left': Number($('.content .text').css('left').replace(/px/, '')) + Number($('.content .text').css('margin-left').replace(/px/, '')), 'top': Number($('.content .text').css('top').replace(/px/, '')) + Number($('.content .text').css('margin-top').replace(/px/, ''))});
                    curBlock.css({'margin-left': 0, 'margin-top': 0});
                    $('input[name="textLeft"]').val($('.content .text').css('left').replace(/px/, ''));
                    $('input[name="textTop"]').val($('.content .text').css('top').replace(/px/, ''));
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
            $('.menu-mobile').addClass('active');
            $('.menu').addClass('active');
            $('header').addClass('active');
            e.preventDefault();
        });

        $('.menu-mobile').click(function(e) {
            $('body').toggleClass('menu-mobile-hidden');
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
            $('.gift-form input').val('');
            e.preventDefault();
        });

        $('.send-preview a').fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            },
            tpl: {
                closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            },
            padding: 0
        });

    });

    $(window).bind('load resize', function() {
        var curHeight = $(window).height() - 80;
        $('.menu, .submenu-list').height(curHeight);
        $('.container').height(curHeight - 160);
    });

})(jQuery);