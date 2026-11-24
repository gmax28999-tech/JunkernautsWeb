// Junkernauts site behaviour: mobile menu, header shadow, quote form.

(function () {
  // Palette preview: add ?palette=orange|navy|forest|steel|hazard to the URL
  var palettes = ["hazard", "orange", "navy", "forest", "steel"];
  var wanted = new URLSearchParams(window.location.search).get("palette");
  if (wanted && palettes.indexOf(wanted) !== -1) {
    document.documentElement.setAttribute("data-palette", wanted);
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Header border once scrolled
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Quote form
  var form = document.querySelector(".quote-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");

  function say(msg, kind) {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple required-field check
    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (el) {
      var bad = !el.value.trim();
      el.classList.toggle("invalid", bad);
      el.setAttribute("aria-invalid", String(bad));
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      say("Please fill in all the fields.", "err");
      firstBad.focus();
      return;
    }

    // Form service not set up yet (see README.md)
    if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
      say("The form isn't connected yet. Please call or text us instead.", "err");
      return;
    }

    button.disabled = true;
    say("Sending...");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Bad response");
        form.reset();
        say("Got it! We'll get back to you shortly with a price.", "ok");
      })
      .catch(function () {
        say("Something went wrong. Please call or text us instead.", "err");
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
