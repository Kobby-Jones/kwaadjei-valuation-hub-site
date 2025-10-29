(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	// WOW JS
	$(window).on ('load', function (){
        if ($(".wow").length) { 
            var wow = new WOW ({
                boxClass:     'wow',      // Animated element css class (default is wow)
                animateClass: 'animated', // Animation css class (default is animated)
                offset:       20,         // Distance to the element when triggering the animation (default is 0)
                mobile:       true,       // Trigger animations on mobile devices (default is true)
                live:         true,       // Act on asynchronously loaded content (default is true)
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
          })
        });

        var $grid = $(".grid").isotope({
          	itemSelector: ".all",
          	percentPosition: true,
          	masonry: {
            columnWidth: ".all"
        }
    })

	$(document).on("click", ".naccs .menu div", function() {
		var numberIndex = $(this).index();
	
		if (!$(this).is("active")) {
			$(".naccs .menu div").removeClass("active");
			$(".naccs ul li").removeClass("active");
	
			$(this).addClass("active");
			$(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");
	
			var listItemHeight = $(".naccs ul")
				.find("li:eq(" + numberIndex + ")")
				.innerHeight();
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
			  0:{
				  items:1
			  },
			  800:{
				  items:2
			  },
			  1000:{
				  items:4
			}
		}
	})

	$('.owl-weekly-offers').owlCarousel({
		items:3,
		loop:true,
		dots: false,
		nav: true,
		autoplay: true,
		margin:15,
		responsive:{
			  0:{
				  items:1
			  },
			  800:{
				  items:2
			  },
			  1000:{
				  items:3
			}
		}
	})

	$('.owl-banner').owlCarousel({
		items:1,
		loop:true,
		dots: false,
		nav: true,
		autoplay: true,
		margin:30,
		responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:1
			  },
			  1000:{
				  items:1
			}
		}
	})

	
	
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
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
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
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
	        }
	        else{
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
//   DYNAMIC CONTENT SCRIPT FOR  HOMEPAGE BANNER SWITCHER
//   ==================================================================

    function bannerSwitcher() {
      next = $('.sec-1-input').filter(':checked').next('.sec-1-input');
      if (next.length) next.prop('checked', true);
      else $('.sec-1-input').first().prop('checked', true);
    }

    var bannerTimer = setInterval(bannerSwitcher, 5000);

    $('nav .controls label').click(function() {
      clearInterval(bannerTimer);
      bannerTimer = setInterval(bannerSwitcher, 5000)
    });



//   ==================================================================
//   DYNAMIC CONTENT SCRIPT FOR AGENT PROFILE PAGE
//   ==================================================================

    document.addEventListener('DOMContentLoaded', function() {
      
      // --- 1. AGENT DATABASE ---
      // This object holds all the profile data.
      const agentData = {
        'jonas-adjei': {
          name: "Surv. Jonas Kwame Adjei",
          title: "MGhIS, MSc, BSc",
          role: "Lead Valuer & Estate Surveyor",
          image: "assets/images/team-member-01.jpg",
          bio: "As the founder and Lead Valuer, Surv. Jonas Kwame Adjei is the driving force behind our firm's technical excellence. He is a full member of the Ghana Institution of Surveyors (MGhIS) and leads our team in upholding the highest standards of professionalism, accuracy, and integrity in every report. He is a certified Valuation and Estate Surveyor (Diploma Number: VES 1508).",
          expertise: ["Valuation & Appraisal", "Estate Surveying", "Professional Standards", "Team Leadership"],
          phone: "0209023083",
          email: "jadjeikwame@ymail.com"
        },
        'valuers': {
          name: "Valuation Specialists",
          title: "Valuation & Appraisal Division",
          role: "Certified Valuers",
          image: "assets/images/team-member-02.jpg",
          bio: "Our team of certified valuers forms the core of our appraisal services. They are experts in providing accurate, defensible valuation reports for all asset types, including landed property, plant, and machinery. They are trained in various methodologies to support mortgage, compensation, insurance, and financial reporting purposes.",
          expertise: ["Property Valuation", "Plant & Machinery", "Compensation Assessment", "Mortgage Valuation"],
          phone: "0209023083",
          email: "kwaadjeivaluationhub@gmail.com"
        },
        'estate-managers': {
          name: "Estate Management Team",
          title: "Property & Facility Management",
          role: "Estate & Facility Managers",
          image: "assets/images/team-member-03.jpg",
          bio: "Our dedicated estate managers protect your investments and maximize asset returns. This team handles all day-to-day operations, including rent negotiations, preparation of tenancy agreements, collection of rent, and managing proactive repairs and maintenance, ensuring your property is profitable and well-maintained.",
          expertise: ["Facility Management", "Property Management", "Tenant Relations", "Rent Negotiation"],
          phone: "0209023083",
          email: "kwaadjeivaluationhub@gmail.com"
        },
        'land-economists': {
          name: "Land Economists",
          title: "Land Use & Advisory",
          role: "Professional Land Economists",
          image: "assets/images/team-member-04.jpg",
          bio: "Our experts in land economics provide critical analysis for development projects. They specialize in land use policy, market analysis, and comprehensive feasibility studies to ensure the highest and best use of your property, guiding strategic investment decisions.",
          expertise: ["Land Use Policy", "Feasibility Studies", "Market Analysis", "Development Advisory"],
          phone: "0209023083",
          email: "kwaadjeivaluationhub@gmail.com"
        },
        'rating-professionals': {
          name: "Rating Professionals",
          title: "Property Rate Administration",
          role: "Rating & Taxation Specialists",
          image: "assets/images/team-member-05.jpg",
          bio: "This specialized team assists local government authorities with property rate administration. Their work includes mass rating valuation, development of efficient revenue collection systems, and creating comprehensive property databases to support public-sector financial management.",
          expertise: ["Property Rate Administration", "Mass Rating Valuation", "Revenue Collection Systems", "Database Management"],
          phone: "0209023083",
          email: "kwaadjeivaluationhub@gmail.com"
        },
        'consultants': {
          name: "Business Consultants",
          title: "Strategic Advisory",
          role: "Project & Business Consultants",
          image: "assets/images/team-member-06.jpg",
          bio: "Our business consultants provide strategic advisory services that complement our technical expertise. They assist clients with project feasibility, investment appraisals, business planning, and navigating the financial aspects of development projects, ensuring a holistic approach to success.",
          expertise: ["Strategic Business Planning", "Investment Appraisals", "Project Feasibility", "Development Finance"],
          phone: "0209023083",
          email: "kwaadjeivaluationhub@gmail.com"
        }
      };

      // --- 2. GET AGENT ID FROM URL ---
      const urlParams = new URLSearchParams(window.location.search);
      const agentId = urlParams.get('id');

      // --- 3. SELECT AGENT DATA (Default to 'jonas-adjei' if ID is invalid or missing) ---
      const data = agentData[agentId] || agentData['jonas-adjei'];

      // --- 4. POPULATE THE PAGE ---
      if (data) {
        // Set Page Title
        document.title = data.name + ' - KWAADJEI VALUATION HUB';

        // Populate Banner
        document.getElementById('agent-name-banner').textContent = data.name;
        document.getElementById('agent-role-banner').textContent = data.role;

        // Populate Profile Section
        document.getElementById('agent-image').src = data.image;
        document.getElementById('agent-image').alt = data.name;
        document.getElementById('agent-name-main').textContent = data.name;
        document.getElementById('agent-title').textContent = data.title;
        document.getElementById('agent-role-main').textContent = data.role;
        document.getElementById('agent-bio').textContent = data.bio;

        // Populate Expertise
        document.getElementById('exp-1').textContent = data.expertise[0];
        document.getElementById('exp-2').textContent = data.expertise[1];
        document.getElementById('exp-3').textContent = data.expertise[2];
        document.getElementById('exp-4').textContent = data.expertise[3];

        // Populate Contact Info
        const phoneLink = document.getElementById('agent-phone');
        phoneLink.textContent = data.phone;
        phoneLink.href = 'tel:' + data.phone.replace(/ /g, ''); // Format for tel: link

        const emailLink = document.getElementById('agent-email');
        emailLink.textContent = data.email;
        emailLink.href = 'mailto:' + data.email;
      }

    });

	// ==================================================================
	// DYNAMIC CONTENT SCRIPT FOR BLOG POST PAGE
	// ==================================================================

	  document.addEventListener('DOMContentLoaded', function() {
		
		// --- 1. BLOG POST DATABASE ---
		// This object holds all the post data.
		const postData = {
		  'post1': {
			title: "The Top 5 Factors Influencing Property Value in Sunyani",
			author: "Surv. J.K. Adjei",
			date: "28 Oct 2025",
			category: "Valuation",
			image: "assets/images/property_valuation_1.jpg",
			tags: ["Valuation", "Sunyani", "Market Trends"],
			body: `
			  <p>When determining the value of a property, especially in a growing city like Sunyani, a valuer doesn't just look at the building itself. A wide range of factors are analyzed to provide an
			  accurate and defensible market value. As accredited valuers based right here in the Bono Region, we understand the local market intimately.</p>
			  <p>Here are the top 5 factors that are currently influencing property values in and around Sunyani:</p>
			  
			  <h3>1. Location and Accessibility</h3>
			  <p>This is the timeless rule of real estate. Proximity to the town center, main roads (like the N6 or N12), commercial hubs, schools, and hospitals heavily impacts value. Properties in well-planned residential areas like SSNIT 'New Road' or Fiapre often command higher prices than those in less accessible or flood-prone areas.</p>
			  
			  <h3>2. Land Documentation and Title</h3>
			  <p>In Ghana, the security of your land title is paramount. A property with a registered, undisputed Land Title Certificate or a clear Indenture from a recognized stool/family is significantly
			  more valuable than one with incomplete or contested documentation. Part of our job is to assess the quality of the title, as it directly impacts marketability and, therefore, value.</p>
			  
			  <blockquote>"A property with a clear and registered title is not just a building; it's a secure and bankable asset. This is a critical factor in our valuation process."</blockquote>
			  
			  <h3>3. Infrastructure and Amenities</h3>
			  <p>The availability of reliable utilities is a major value driver. This includes access to Ghana Water Company Limited (GWCL) mains, connection to the national electricity grid, and good road networks.
			  Areas with tarred roads and covered drains will always be valued higher than areas with poor access and erosion problems.</p>
			  
			  <h3>4. Building Quality and Condition</h3>
			  <p>This is the most obvious factor. We assess the quality of construction materials, the structural integrity of the building, the age, and the overall state of repair. A well-maintained property
			  built with high-quality materials will, of course, have a higher value. This is also where our <strong>48-hour report delivery</strong> becomes critical for mortgage lenders who need to verify the
			  collateral's condition quickly.</p>
			  
			  <h3>5. Market Demand and Economic Trends</h3>
			  <p>Sunyani is an administrative and educational hub. The presence of universities, government offices, and financial institutions creates a stable demand for rental and residential properties.
			  We analyze current market trends—what are similar properties selling for? How long are they on the market? This 'Comparable Market Analysis' is a cornerstone of our valuation reports, ensuring
			  the value we provide reflects the true, current market conditions.</p>
			  
			  <p>Understanding your property's value is the first step in making any informed financial decision. If you need a professional valuation for a mortgage, sale, or any other purpose, 
			  <a href="contact.html">contact our team today</a>.</p>
			`
		  },
		  'post2': {
			title: "Why a Professional Valuation is Crucial for Your Mortgage",
			author: "KVH Team",
			date: "22 Oct 2025",
			category: "Advisory",
			image: "assets/images/property_valuation_2.jpg",
			tags: ["Mortgage", "Advisory", "Banks"],
			body: `
			  <p>When you apply for a mortgage, the bank or financial institution is taking a calculated risk. They are lending you a significant amount of money, and the property you're buying is their
			  collateral—their security in case you can't repay the loan. How do they know the property is worth what you say it is?</p>
			  <p>That's where we come in. A professional, independent valuation is a mandatory step in almost every mortgage application process, and here’s why it’s so critical:</p>
			  
			  <h3>1. It Protects the Lender</h3>
			  <p>The bank needs to ensure that the loan-to-value (LTV) ratio is accurate. If they lend you GHS 300,000 for a property that is only worth GHS 250,000, they are immediately at a GHS 50,000
			  loss on their collateral. Our valuation reports provide an accurate, unbiased Market Value, giving lenders like Sinapi Aba Savings and Loans or OmniBSIC Bank the confidence they need to approve
			  your loan.</p>
			  
			  <h3>2. It Protects You, the Borrower</h3>
			  <p>Imagine overpaying for a property by GHS 50,000. That's a significant loss of your personal capital from day one. A professional valuation acts as a crucial due diligence step, confirming
			  that the price you’ve agreed to pay is fair and supported by market data. It can prevent you from making a costly financial mistake.</p>
			  
			  <h3>3. It's an Objective, Defensible Assessment</h3>
			  <p>An estate agent's "valuation" is often a marketing estimate designed to get a listing. A seller's price is based on what they *hope* to get. A professional valuer, accredited by the
			  Ghana Institution of Surveyors (GhIS), has a legal and ethical duty to be impartial. Our valuation is not a guess; it's a defensible report based on established methodologies, data, and a
			  physical inspection of the property.</p>
			  
			  <blockquote>"Our reports are trusted by Ghana's leading financial institutions because they are accurate, independent, and delivered fast—within 48 hours of referencing."</blockquote>
			  
			  <p>Never skip this crucial step. A professional valuation isn't just a "formality" for the bank; it's a vital part of a secure and sound property investment.</p>
			`
		  },
		  
		  // Post 3 detailed content 
		'post3': {
			title: "The Complete Checklist for Land Title Registration in Ghana (2025 Update)",
			author: "Kwaadjei Valuation Hub Team",
			date: "15 Oct 2025",
			category: "Land Management",
			image: "assets/images/property_valuation_3.jpg", // Replace with a more relevant image if available
			tags: ["Land Registration", "Ghana", "Lands Commission", "Property Ownership"],
			body: `
			<p>Owning land in Ghana is a significant investment, but true ownership isn't complete until your title is properly registered. The process can seem complex, involving various steps and institutions. Failing to register correctly can lead to disputes, difficulties in securing loans, and uncertainty about your rights.</p>
			<p>As experts in Land Documentation & Registration based in Sunyani, Kwaadjei Valuation Hub helps clients navigate this process daily. This checklist provides a comprehensive overview of the key steps involved in registering your land title in Ghana as of late 2025.</p>
			
			<h3>Phase 1: Prerequisites – Before You Begin Registration</h3>
			<p>Ensure you have the following sorted out before initiating the formal registration process:</p>
			<ul>
		<li><i class="fa fa-check-circle" style="color:var(--brand-color)"></i> <strong>Proof of Ownership/Acquisition:</strong> This is typically an Indenture, Deed of Assignment, Gift Deed, or Vesting Assent. Ensure it's duly executed (signed, witnessed, and stamped).</li>
		<li><i class="fa fa-check-circle" style="color:var(--brand-color)"></i> <strong>Site Plan:</strong> A current, accurate site plan prepared by a licensed surveyor is mandatory. It must clearly show the boundaries, dimensions, and location of the land.</li>
		<li><i class="fa fa-check-circle" style="color:var(--brand-color)"></i> <strong>Clearance/Consent (If Applicable):</strong> Depending on the land type (e.g., Stool Land), you may need consent or concurrence from the relevant traditional authority or the Office of the Administrator of Stool Lands (OASL).</li>
		<li><i class="fa fa-check-circle" style="color:var(--brand-color)"></i> <strong>Identification:</strong> Valid national ID (Ghana Card) of the applicant(s).</li>
		<li><i class="fa fa-check-circle" style="color:var(--brand-color)"></i> <strong>Tax Identification Number (TIN):</strong> Required for processing.</li>
	  </ul>
  
	  <h3>Phase 2: The Registration Checklist – Step-by-Step</h3>
	  <p>Once you have the prerequisites, follow these steps, primarily involving the Lands Commission:</p>
	  <ol>
		<li><strong>Submission of Application:</strong> Lodge your application documents (Indenture, Site Plan, ID, TIN, relevant consents) at the Client Service Access Unit (CSAU) of the Lands Commission in the region where the land is located. Pay the required processing fees.</li>
		<li><strong>Plotting and Verification:</strong> The submitted Site Plan is plotted into the Lands Commission's records to check for overlaps or conflicts with existing registered properties or government acquisitions.</li>
		<li><strong>Publication (For Title Registration Areas):</strong> In areas designated for Title Registration (like parts of Accra, Kumasi, Tema), the application details are published in newspapers (e.g., Daily Graphic) or the Gazette to allow anyone with an adverse claim to object within a specific period (usually 21 days).</li>
		<li><strong>Field Inspection & Report (Sometimes Required):</strong> In some cases, officials may conduct a physical inspection of the land to verify boundaries and usage.</li>
		<li><strong>Processing and Examination:</strong> The documents are thoroughly examined by legal and technical teams at the Lands Commission to ensure compliance with all laws and regulations.</li>
		<li><strong>Issuance of Land Title Certificate / Recorded Deed:</strong>
			<ul>
				<li>In Title Registration areas, upon successful processing and no valid objections, a Land Title Certificate is issued. This is the highest form of secure title in Ghana.</li>
				<li>In other areas (Deeds Registration), the Indenture is officially recorded and stamped by the Lands Commission, providing evidence of the transaction but not the absolute guarantee of a Title Certificate.</li>
			</ul>
		</li>
		<li><strong>Collection:</strong> You will be notified when your Land Title Certificate or Recorded Deed is ready for collection.</li>
	  </ol>
	  
	  <h3>Key Institutions Involved</h3>
	  <ul>
		  <li><i class="fa fa-landmark" style="color:var(--brand-color)"></i> <strong>Lands Commission:</strong> The primary government agency responsible for land registration, records management, and valuation services.</li>
		  <li><i class="fa fa-landmark" style="color:var(--brand-color)"></i> <strong>Office of the Administrator of Stool Lands (OASL):</strong> Manages Stool Lands on behalf of the relevant stools/skins and provides concurrence for transactions involving these lands.</li>
		  <li><i class="fa fa-landmark" style="color:var(--brand-color)"></i> <strong>Licensed Surveyors:</strong> Private professionals crucial for preparing accurate site plans.</li>
		  <li><i class="fa fa-landmark" style="color:var(--brand-color)"></i> <strong>Lawyers:</strong> Often involved in drafting and reviewing indentures and providing legal advice.</li>
	  </ul>
  
	  <blockquote>"Navigating the intricacies of Ghana's land tenure system requires diligence and expertise. Proper registration is not just paperwork; it's securing your legacy and investment." - Surv. Jonas Kwame Adjei, Lead Valuer, Kwaadjei Valuation Hub</blockquote>
  
	  <h3>Common Pitfalls & Expert Tips</h3>
	  <ul>
		<li><i class="fa fa-exclamation-triangle" style="color:var(--brand-color)"></i> <strong>Inaccurate Site Plans:</strong> Ensure your surveyor is licensed and the plan is recent and precise. Boundary disputes often start here.</li>
		<li><i class="fa fa-exclamation-triangle" style="color:var(--brand-color)"></i> <strong>Missing Consents:</strong> Failure to get necessary consents (e.g., from OASL for Stool Lands) will halt the process.</li>
		<li><i class="fa fa-exclamation-triangle" style="color:var(--brand-color)"></i> <strong>Dealing with Unregistered Land:</strong> The process can be more complex if the person selling to you doesn't have a registered title themselves. Extra due diligence is required.</li>
		<li><i class="fa fa-thumbs-up" style="color:var(--brand-color)"></i> <strong>Engage Professionals Early:</strong> Consulting with firms like Kwaadjei Valuation Hub from the beginning can save time, prevent errors, and ensure a smooth process. We assist from acquisition through to final registration.</li>
		<li><i class="fa fa-thumbs-up" style="color:var(--brand-color)"></i> <strong>Keep Copies:</strong> Always retain certified true copies of all submitted documents.</li>
	  </ul>
  
	  <p>Securing your land title is one of the most important steps you can take as a property owner in Ghana. While this checklist provides a guide, each parcel of land can have unique circumstances. For personalized assistance with your land documentation and registration needs in Sunyani or anywhere in Ghana, <a href="contact.html">contact Kwaadjei Valuation Hub today</a>.</p>
	`
  },


		  'post4': { title: "Beyond the Walls: The Importance of Plant & Machinery Valuation", author: "Surv. J.K. Adjei", date: "10 Oct 2025", category: "Valuation", image: "assets/images/property_valuation_4.jpg", tags: ["Valuation", "Machinery", "Business"], body: "<p>Content for this post is coming soon. For businesses, assets go beyond buildings. Learn why valuing your equipment is critical.</p>" },
		  'post5': { title: "Bono Region Real Estate Trends: What to Expect in 2026", author: "KVH Team", date: "05 Oct 2025", category: "Market Trends", image: "assets/images/cities-01.jpg", tags: ["Market Trends", "Bono Region", "Investment"], body: "<p>Content for this post is coming soon. Our expert analysis on the market trends and investment opportunities in the Bono Region.</p>" },
		  'post6': { title: "Compensation vs. Resettlement: Know Your Rights", author: "KVH Team", date: "01 Oct 2025", category: "Land Management", image: "assets/images/cities-02.jpg", tags: ["Compensation", "Resettlement", "Advisory"], body: "<p>Content for this post is coming soon. A clear guide for communities and individuals impacted by large-scale development projects.</p>" }
		};
  
		// --- 2. GET POST ID FROM URL ---
		const urlParams = new URLSearchParams(window.location.search);
		const postId = urlParams.get('id');
  
		// --- 3. SELECT POST DATA (Default to 'post1' if ID is invalid or missing) ---
		const data = postData[postId] || postData['post1'];
  
		// --- 4. POPULATE THE PAGE ---
		if (data) {
		  // Set Page Title
		  document.title = data.title + ' - KWAADJEI VALUATION HUB';
  
		  // Populate Banner
		  document.getElementById('post-title-banner').textContent = data.title;
  
		  // Populate Main Post Area
		  document.getElementById('post-image').src = data.image;
		  document.getElementById('post-image').alt = data.title;
		  document.getElementById('post-author').textContent = data.author;
		  document.getElementById('post-date').textContent = data.date;
		  document.getElementById('post-category').textContent = data.category;
		  document.getElementById('post-title-main').textContent = data.title;
		  document.getElementById('post-body').innerHTML = data.body;
		  
		  // Populate Tags
		  document.getElementById('tag-1').textContent = data.tags[0];
		  document.getElementById('tag-2').textContent = data.tags[1];
		  document.getElementById('tag-3').textContent = data.tags[2];
		}
  
	  });