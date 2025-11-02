(function ($) {
    
    "use strict";

    // Page loading animation
    $(window).on('load', function() {
        $('#js-preloader').addClass('loaded');
    });

    // WOW JS
    $(window).on('load', function (){
        if ($(".wow").length) { 
            var wow = new WOW ({
                boxClass: 'wow',        // Animated element css class (default is wow)
                animateClass: 'animated', // Animation css class (default is animated)
                offset: 20,             // Distance to the element when triggering the animation (default is 0)
                mobile: true,           // Trigger animations on mobile devices (default is true)
                live: true,             // Act on asynchronously loaded content (default is true)
            });
            wow.init();
        }
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });
    
    $('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
        
        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        });
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".all"
        }
    });

    $(document).on("click", ".naccs .menu div", function() {
        var numberIndex = $(this).index();
    
        if (!$(this).hasClass("active")) {
            $(".naccs .menu div").removeClass("active");
            $(".naccs ul li").removeClass("active");
    
            $(this).addClass("active");
            $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");
    
            var listItemHeight = $(".naccs ul").find("li:eq(" + numberIndex + ")").innerHeight();
            $(".naccs ul").height(listItemHeight + "px");
        }
    });

    $('.owl-cites-town').owlCarousel({
        items:4,
        loop:true,
        dots: false,
        nav: true,
        autoplay: true,
        margin:30,
        responsive:{
            0:{ items:1 },
            800:{ items:2 },
            1000:{ items:4 }
        }
    });

    $('.owl-weekly-offers').owlCarousel({
        items:3,
        loop:true,
        dots: false,
        nav: true,
        autoplay: true,
        margin:15,
        responsive:{
            0:{ items:1 },
            800:{ items:2 },
            1000:{ items:3 }
        }
    });

    $('.owl-banner').owlCarousel({
        items:1,
        loop:true,
        dots: false,
        nav: true,
        autoplay: true,
        margin:30,
        responsive:{
            0:{ items:1 },
            600:{ items:1 },
            1000:{ items:1 }
        }
    });

    // Menu Dropdown Toggle
    if($('.menu-trigger').length){
        $(".menu-trigger").on('click', function() { 
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }

    // Menu elevator animation
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            && location.hostname == this.hostname) {
            
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var width = $(window).width();
                if(width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);    
                }                
                $('html,body').animate({
                    scrollTop: (target.offset().top) - 80
                }, 700);
                return false;
            }
        }
    });

    $(document).ready(function () {
        $(document).on("scroll", onScroll);
        
        //smoothscroll
        $('.scroll-to-section a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
            
            $('.scroll-to-section a').removeClass('active');
            $(this).addClass('active');
          
            var target = $(this.hash);
            $('html, body').stop().animate({
                scrollTop: (target.offset().top) - 79
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    }

    // Page loading animation
    $(window).on('load', function() {
        if($('.cover').length){
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });

    const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

})(window.jQuery);

//   ==================================================================
//   DYNAMIC CONTENT SCRIPT FOR AGENT PROFILE PAGE
//   ==================================================================

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. AGENT DATABASE ---
    const agentData = {
      'jonas-adjei': {
        name: "Surv. Jonas Kwame Adjei",
        title: "MGhIS, MSc, BSc",
        role: "Lead Valuer & Estate Surveyor",
        image: "/assets/images/team-member-01.jpg",
        bio: "Surv. Jonas Kwame Adjei, a dedicated and results-oriented professional with extensive expertise in property valuation, compensation assessment, land management, real estate brokerage, and impact assessment. Over the course of his career, he has developed a strong reputation for delivering accurate, transparent, and ethically sound professional services that balance the interests of clients, communities, and regulatory authorities. His work as a valuer and compensation assessment expert involved determining fair and equitable compensation for land acquisition, resettlement, and development projects. He brings a deep understanding of land tenure systems, customary rights, and statutory frameworks, ensuring that all assessments are compliant with national laws and international best practices. In addition, his experience as a land management and real estate professional has equipped him with practical knowledge of property markets, spatial planning, and land administration processes. He has successfully facilitated real estate transactions and brokerage services that uphold integrity and efficiency, while fostering sustainable land use and investment decisions. As an impact assessment and mining compensation consultant, He has contributed to several multidisciplinary projects assessing environmental, social, and economic impacts of development initiatives. He specializes in conducting field investigations, stakeholder consultations, and valuation of affected assets, ensuring that mitigation and compensation measures are just, inclusive, and sustainable. Driven by a passion for professional excellence, He continuously seek to expand his technical capacity through research, collaboration, and innovation. He is committed to applying his expertise to support equitable development, sustainable land management, and responsible resource use that enhances livelihoods and community resilience. Surv. Jonas Kwame Adjei is a professional member of the Ghana Institution of Surveyors. He holds a BSc. Land Economy from Kwame Nkrumah University of Science and Technology,MSc Real Estate also from Kwame Nkrumah University of Science and Technology and currently pursuing MSc. Sustainable Mining from the University of Energy and Natural Resources, Sunyani And the Managing Director and founder of KWAADAJEI VALUATION HUB which has been in operation for over a decade now.",
        expertise: ["Valuation & Appraisal", "Estate Surveying", "Professional Standards", "Team Leadership"],
        phone: "0209023083",
        email: "kwaadjeivaluationhub@gmail.com"
      },
      'john': {
        name: "Surv. Afrane Boateng John",
        title: "MPhil, BSc, MGhIS",
        role: "Valuer and Investment Analyst",
        image: "/assets/images/john.png",
        bio: "Surv. Afrane Boateng John is a seasoned real estate and education management professional with a strong track record in leadership, development, and institutional governance. He joined the Ghana Institution of Surveyors as a Professional Member of the Valuation and Estate Surveying Division in 2020. He holds a Bachelor of Science degree in Real Estate from the Kwame Nkrumah University of Science and Technology (KNUST) and an MPhil in Educational Administration and Management from Catholic University, Ghana. Surv. A.B John has served as a Valuer and Investment Analyst at Kwaadjei Valuation Hub since 2020. He brings a deep understanding of real estate development, investment appraisal methods, market feasibility research and property/asset management. His work as a valuer and acquisition expert has involved determining fair and equitable values for property acquisitions, judicial settlement, negotiation, development, and investment projects. He has successfully spearheaded real estate development projects and acquisitions across the country, ensuring value for money for investors and other stakeholders. Surv. A.B John brings both technical expertise and strategic insight into the real estate and education sectors. Driven by a passion to be an effective steward of resources and spreading innovative goodness, he serves as the Director of JL Hubs, a forward-thinking Startup Hub and Co-working space, and also serves Lawrence Senior High School - Sunyani as Deputy Director, assisting in its academic and administrative advancement. He is also the founder of Knowhouse Ltd., an investment management and development company. Surv. A.B John is passionate about youth development, capacity building, and transforming spaces, both physical and intellectual, into opportunities for growth.",
        expertise: ["Property Valuation", "Plant & Machinery", "Compensation Assessment", "Mortgage Valuation"],
        phone: "0545856793",
        email: "johnlawrencegh@gmail.com"
      },
      'mandy': {
        name: "Miss. Mandy Obiri Yeboah",
        title: "BSc",
        role: "Assistant Valuer & Research Analyst",
        image: "/assets/images/mandy.png",
        bio: "Mandy Obiri Yeboah is an Assistant Valuer at Kwaadjei Valuation Hub, where she contributes to the firm’s operations through data collection and analysis, property inspections, valuation report preparation and client engagement. She supports the delivery of professional services in property valuation, land administration assistance and real estate advisory. Ensuring accuracy, transparency and efficiency in all assignments. She holds a Bachelor’s degree in Land Economy and is currently pursuing an MPhil in Development Studies at the Kwame Nkrumah University of Science and Technology (KNUST). Her research interests span sustainable urban planning, gender, climate, and real estate development, reflecting her commitment to promoting inclusive and sustainable practices within the built environment. With a keen interest in real estate, valuation and sustainability, she is actively engaged in research and professional development to enhance her expertise and contribution to the field. Mandy is a student trainee of the Ghana Institution of Surveyors (GhIS), where she continues to build her professional capacity in valuation and real estate management. She aims to advance sustainable practices in the built environment and contribute to development-oriented research and policy discourse that foster equitable growth and environmental resilience.",
        expertise: ["Data Analysis", "Property Inspection", "Valuation Reporting", "Client Relations"],
        phone: "0268282850",
        email: "kwaadjeivaluationhub@gmail.com"
      },
      'bernice': {
        name: "Miss. Bernice Asare",
        title: "HND",
        role: "Secretarial & Administrative Support",
        image: "/assets/images/bernice.png",
        bio: "Miss. Bernice Asare serves as the Secretary of Kwaadjei Valuation Hub, where she provides administrative, organizational and clerical support to ensure the smooth and efficient running of the firm’s operations. She holds a Diploma in a Secretarial Program from the Standard Institute of Business & Computing (SIBCO), Sunyani. With strong skills in office management, correspondence, client relations and office software. Bernice is recognized for her professionalism, attention to detail and commitment to excellence in service delivery. Her proactive approach and organizational skills contribute significantly to the firm’s productivity and client satisfaction. She has a keen interest in office administration, business communication and organizational development. She aspires to advance her career in corporate administration and management, where she can continue to support institutional growth and operational excellence.",
        expertise: ["Office Management", "Client Communication", "Scheduling & Coordination", "Document Preparation"],
        phone: "0209023083",
        email: "kwaadjeivaluationhub@gmail.com"
      },
      'kusi': {
        name: "Kusi Mamphela Ramphele",
        title: "BSc",
        role: "Assistant Valuer & Land Administration Support",
        image: "/assets/images/kusi.png",
        bio: "Kusi Mamphela Ramphele holds a Bachelor’s degree in Land Economy from the Kwame Nkrumah University of Science and Technology (KNUST). She is a disciplined, analytical and goal-driven professional with a strong passion for property valuation, real estate development and law. She has developed solid expertise in property inspection, valuation reporting, market analysis, cost estimation and construction assessment, effectively combining theoretical knowledge with practical experience. Her work demonstrates technical precision, analytical depth and a commitment to professionalism, accuracy and ethical standards in valuation practice. Mamphela aspires to advance her career as a professional valuer and legal practitioner, contributing meaningfully to Ghana’s real estate and legal sectors through continuous learning, excellence and integrity.",
        expertise: ["Property Inspection", "Valuation Reporting", "Market Analysis", "Construction Assessment"],
        phone: "0552305977",
        email: "kwaadjeivaluationhub@gmail.com"
      }
    };
  
    // --- 2. GET AGENT ID FROM URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');
  
    // --- 3. SELECT AGENT DATA (Fallback if missing/invalid) ---
    const data = agentData[agentId] || agentData['jonas-adjei'];
  
    // --- 4. POPULATE PAGE ---
    if (data) {
      document.title = `${data.name} - KWAADJEI VALUATION HUB`;
  
      const safeSet = (id, content) => {
        const el = document.getElementById(id);
        if (el) el.textContent = content;
      };
  
      safeSet('agent-name-banner', data.name);
      safeSet('agent-role-banner', data.role);
      safeSet('agent-name-main', data.name);
      safeSet('agent-title', data.title);
      safeSet('agent-role-main', data.role);
      safeSet('agent-bio', data.bio);
  
      const img = document.getElementById('agent-image');
      if (img) {
        img.src = data.image;
        img.alt = data.name;
        img.classList.add('fade-in');
      }
  
      data.expertise.forEach((exp, i) => safeSet(`exp-${i + 1}`, exp));
  
      const phone = document.getElementById('agent-phone');
      if (phone) {
        phone.textContent = data.phone;
        phone.href = 'tel:' + data.phone.replace(/\s+/g, '');
      }
  
      const email = document.getElementById('agent-email');
      if (email) {
        email.textContent = data.email;
        email.href = 'mailto:' + data.email;
      }
  
      // --- Optional: SEO Meta Update ---
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Profile of ${data.name}, ${data.role} at Kwaadjei Valuation Hub. Learn about qualifications, expertise, and contact details.`
        );
      }
    }
  
  });
  