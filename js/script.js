(function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Dark mode toggle */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    if(themeToggle) themeToggle.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    try{ localStorage.setItem('theme', theme); }catch(e){}
  }
  var savedTheme = null;
  try{ savedTheme = localStorage.getItem('theme'); }catch(e){}
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* Mobile drawer */
  var menuBtn = document.getElementById('menuBtn');
  var drawer = document.getElementById('mobileDrawer');
  if(menuBtn){
    menuBtn.addEventListener('click', function(){
      var open = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ drawer.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); });
    });
  }

  /* Active nav highlighting */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('a[data-nav]'));
  var byId = {};
  navLinks.forEach(function(a){ byId[a.getAttribute('href').slice(1)] = a; });
  var sections = navLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var navObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        navLinks.forEach(function(l){ l.classList.remove('active'); });
        var link = byId[entry.target.id];
        if(link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function(s){ navObserver.observe(s); });

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if(reduceMotion){
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  } else {
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  }

  /* Skill bars */
  var bars = document.querySelectorAll('.bar-fill');
  var barObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.style.width = entry.target.getAttribute('data-w') + '%'; barObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  bars.forEach(function(b){ barObserver.observe(b); });

  /* Count-up stats */
  var counts = document.querySelectorAll('.count');
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    function fmt(v){ return prefix + v.toFixed(decimals) + suffix; }
    if(reduceMotion){ el.textContent = fmt(target); return; }
    var duration = 1200, startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var v = progress * target;
      el.textContent = fmt(decimals ? v : Math.floor(v));
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  var countObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ animateCount(entry.target); countObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counts.forEach(function(c){ countObserver.observe(c); });

  /* Contact form -> mailto */
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var subject = encodeURIComponent('Portfolio inquiry from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:sagarinoemmanuel08@gmail.com?subject=' + subject + '&body=' + body;
      success.classList.add('show');
    });
  }
})();
