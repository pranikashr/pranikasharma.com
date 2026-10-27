      (function () {
        "use strict";
        var toast = function (m) {
          var t = document.getElementById("toast");
          t.textContent = m;
          t.classList.add("show");
          setTimeout(function () {
            t.classList.remove("show");
          }, 2400);
        };

        // ----- Photo Reel (auto-scrolling filmstrip) -----
        // Add more entries here any time — just drop the file in /photos first.
        var REEL_PHOTOS = [
          { img: "photos/festival.jpg", pos: "center 20%", title: "Festival Days" },
          { img: "photos/family-time.jpg", pos: "center 25%", title: "Family Time" },
          { img: "photos/music-time.jpg", pos: "center 22%", title: "Music & Me" },
          { img: "photos/pranika-hero.jpg", pos: "center 15%", title: "Pranika" },
          { img: "photos/pranika-about.jpg", pos: "center 15%", title: "Pranika" },
          { img: "photos/pranika-avatar.jpg", pos: "center", title: "Pranika" },
        ];
        function fillReelRow(trackId, photos) {
          var track = document.getElementById(trackId);
          if (!track || !photos.length) return;
          // render the list twice back-to-back so the CSS animation
          // (translate -50%) loops seamlessly, however many photos there are
          for (var pass = 0; pass < 2; pass++) {
            photos.forEach(function (p) {
              var b = document.createElement("button");
              b.className = "reel-item";
              b.innerHTML =
                '<img src="' +
                p.img +
                '" alt="' +
                p.title +
                '" loading="lazy" style="object-position:' +
                (p.pos || "center") +
                '">';
              b.addEventListener("click", function () {
                openLb("", "", p.title, "from the photo reel 📸", p.img);
              });
              track.appendChild(b);
            });
          }
        }
        // split into two rows (odd/even) so each scrolls independently
        fillReelRow(
          "reelTrack1",
          REEL_PHOTOS.filter(function (_, i) {
            return i % 2 === 0;
          }),
        );
        fillReelRow(
          "reelTrack2",
          REEL_PHOTOS.filter(function (_, i) {
            return i % 2 === 1;
          }),
        );
        // pause the auto-scroll while a finger is touching the reel —
        // ":hover" (desktop pause) has no equivalent on touchscreens
        var reelEl = document.getElementById("reel");
        if (reelEl) {
          reelEl.addEventListener(
            "touchstart",
            function () {
              reelEl.classList.add("touch-pause");
            },
            { passive: true },
          );
          ["touchend", "touchcancel"].forEach(function (evt) {
            reelEl.addEventListener(evt, function () {
              reelEl.classList.remove("touch-pause");
            });
          });
        }

        // ----- Albums (Photo Adventures) -----
        var ALBUMS = [
          {
            img: "photos/festival.jpg",
            pos: "center 20%",
            emoji: "\u2728",
            bg: "linear-gradient(135deg,#f6a8bb,#ec8398)",
            title: "Festival Days!",
            sub: "all dressed up",
          },
          {
            img: "photos/family-time.jpg",
            pos: "center 25%",
            emoji: "\uD83D\uDC9B",
            bg: "linear-gradient(135deg,#ffd98a,#f2984d)",
            title: "Family Time!",
            sub: "with my favourite people",
          },
          {
            img: "photos/music-time.jpg",
            pos: "center 22%",
            emoji: "\uD83C\uDFB6",
            bg: "linear-gradient(135deg,#b8a9ef,#6d5fc7)",
            title: "Music &amp; Me!",
            sub: "headphones on, world off",
          },
          {
            emoji: "\uD83D\uDEDD",
            bg: "linear-gradient(135deg,#a7d8f0,#54b0e6)",
            title: "Playpark Fun!",
            sub: "swings &amp; slides",
          },
          {
            emoji: "\uD83E\uDD81",
            bg: "linear-gradient(135deg,#b6e8c9,#54c489)",
            title: "Zoo Day!",
            sub: "animals everywhere",
          },
          {
            emoji: "\uD83C\uDF82",
            bg: "linear-gradient(135deg,#ffc2d6,#ff8cb0)",
            title: "Birthday Bash!",
            sub: "turning three",
          },
        ];
        var albumsEl = document.getElementById("albums");
        ALBUMS.forEach(function (a) {
          var b = document.createElement("button");
          b.className = "album";
          // real <img> so the browser can lazy-load it
          var inner = a.img
            ? '<div class="bg"><img src="' +
              a.img +
              '" alt="' +
              a.title +
              '" loading="lazy" style="object-position:' +
              (a.pos || "center") +
              '"></div>'
            : '<div class="bg" style="background:' + a.bg + '">' + a.emoji + "</div>";
          b.innerHTML =
            inner +
            (a.count ? '<span class="count">📷 ' + a.count + "</span>" : "") +
            '<div class="lbl"><b>' +
            a.title +
            "</b><span>" +
            a.sub +
            "</span></div>";
          b.addEventListener("click", function () {
            openLb(
              a.emoji,
              a.bg,
              a.title,
              a.count ? a.sub + " · " + a.count + " photos" : a.sub,
              a.img,
            );
          });
          albumsEl.appendChild(b);
        });

        // ----- Art -----
        var ART = [
          {
            emoji: "🖐️",
            bg: "linear-gradient(135deg,#ffd0de,#ff8cb0)",
            cap: "Handprint · Age 2",
            pin: "📌",
          },
          {
            emoji: "🎨",
            bg: "linear-gradient(135deg,#a7d8f0,#54b0e6)",
            cap: "Finger paint · Mar 2024",
            pin: "📍",
          },
          {
            emoji: "🌈",
            bg: "linear-gradient(135deg,#ffe08a,#f4c53f)",
            cap: "Rainbow · 2024",
            pin: "📌",
          },
          {
            emoji: "🖍️",
            bg: "linear-gradient(135deg,#b6e8c9,#54c489)",
            cap: "Crayon scribbles",
            pin: "📍",
          },
          {
            emoji: "☀️",
            bg: "linear-gradient(135deg,#d6c6f2,#9a7ce4)",
            cap: "My sunshine",
            pin: "📌",
          },
          {
            emoji: "🦋",
            bg: "linear-gradient(135deg,#ffd0b0,#ff9866)",
            cap: "Butterfly · 2025",
            pin: "📍",
          },
        ];
        var boardEl = document.getElementById("board");
        ART.forEach(function (a) {
          var d = document.createElement("div");
          d.className = "art";
          d.innerHTML =
            '<span class="pin">' +
            a.pin +
            '</span><div class="canvas" style="background:' +
            a.bg +
            '">' +
            (a.img ? "" : a.emoji) +
            '</div><div class="cap">' +
            a.cap +
            "</div>";
          if (a.img) {
            d.querySelector(".canvas").style.background =
              'center/cover no-repeat url("' + a.img + '")';
          }
          d.addEventListener("click", function () {
            openLb(a.emoji, a.bg, a.cap, "a Pranika original 🎨", a.img);
          });
          boardEl.appendChild(d);
        });

        // ----- Lightbox -----
        var lb = document.getElementById("lb"),
          big = document.getElementById("lbBig");
        function openLb(emoji, bg, t, s, img) {
          if (img) {
            // "contain" so the whole photo is visible, not cropped
            big.style.background =
              '#f4f2fb center/contain no-repeat url("' + img + '")';
            big.textContent = "";
          } else {
            big.style.background = bg;
            big.textContent = emoji;
          }
          document.getElementById("lbT").textContent = t;
          document.getElementById("lbS").textContent = s;
          lb.classList.add("open");
        }
        function closeLb() {
          lb.classList.remove("open");
        }
        document.getElementById("lbClose").addEventListener("click", closeLb);
        lb.addEventListener("click", function (e) {
          if (e.target === lb) closeLb();
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") closeLb();
        });

        // ----- Little Voices -----
        var audios = {};
        document.querySelectorAll(".voice").forEach(function (v) {
          var btn = v.querySelector(".playbtn");
          btn.addEventListener("click", function () {
            var src = v.getAttribute("data-audio");
            // stop others
            document.querySelectorAll(".voice.playing").forEach(function (o) {
              if (o !== v) {
                o.classList.remove("playing");
                o.querySelector(".playbtn").textContent = "▶";
                if (audios[o._i]) {
                  audios[o._i].pause();
                }
              }
            });
            if (!src) {
              var on = v.classList.toggle("playing");
              btn.textContent = on ? "⏸" : "▶";
              if (on) {
                toast("🎵 Add a recording to hear this one!");
                setTimeout(function () {
                  v.classList.remove("playing");
                  btn.textContent = "▶";
                }, 2600);
              }
              return;
            }
            if (!v._i) {
              v._i = "a" + Math.random().toString(36).slice(2);
              audios[v._i] = new Audio(src);
              audios[v._i].onended = function () {
                v.classList.remove("playing");
                btn.textContent = "▶";
              };
            }
            var a = audios[v._i];
            if (a.paused) {
              a.play();
              v.classList.add("playing");
              btn.textContent = "⏸";
            } else {
              a.pause();
              v.classList.remove("playing");
              btn.textContent = "▶";
            }
          });
        });

        // ----- Guestbook -----
        // To make wishes SHARED (everyone sees them) + get an EMAIL for each new wish,
        // paste your Google Apps Script Web App URL between the quotes below.
        // Leave it "" to keep wishes saved on this device only. Setup steps are in guestbook-backend.gs.
        var GUESTBOOK_ENDPOINT =
          "https://script.google.com/macros/s/AKfycbx4I0GkCsEcydLj3hg1hDzfGhyLjgO0S3V30zk1417YZBsaTjixbh9Irg2kYPz79AnJ/exec";

        var SEED = [
          { msg: "Love you to the moon, Pranika!", from: "Grandma 💗" },
          { msg: "You're getting SO big!", from: "Uncle Joe" },
          { msg: "Keep singing, little star!", from: "Auntie Ria" },
          { msg: "So proud of you, sweetheart.", from: "Grandpa" },
        ];
        var notesEl = document.getElementById("notes");
        var gNote = document.getElementById("gNote");

        function makeNote(n) {
          var d = document.createElement("div");
          d.className = "note";
          var m = document.createElement("div");
          m.className = "msg";
          m.textContent = "“" + n.msg + "”";
          var f = document.createElement("div");
          f.className = "from";
          f.textContent = "— " + n.from;
          d.appendChild(m);
          d.appendChild(f);
          return d;
        }
        function renderNotes(list) {
          notesEl.innerHTML = "";
          (list || []).forEach(function (n) {
            notesEl.appendChild(makeNote(n));
          });
        }
        function localNotes() {
          var extra = [];
          try {
            extra = JSON.parse(
              localStorage.getItem("pranika_guestbook") || "[]",
            );
          } catch (e) {
            extra = [];
          }
          return SEED.concat(extra);
        }
        function saveLocal(n) {
          try {
            var a = JSON.parse(
              localStorage.getItem("pranika_guestbook") || "[]",
            );
            a.push(n);
            localStorage.setItem("pranika_guestbook", JSON.stringify(a));
          } catch (e) {}
        }
        function loadNotes() {
          if (GUESTBOOK_ENDPOINT) {
            if (gNote) {
              gNote.textContent =
                "Approved wishes appear here for everyone. New wishes are checked before they show up.";
            }
            fetch(GUESTBOOK_ENDPOINT, { method: "GET" })
              .then(function (r) {
                return r.json();
              })
              .then(function (data) {
                renderNotes(SEED.concat(data.notes || []));
              })
              .catch(function () {
                renderNotes(SEED);
              }); // network hiccup: show welcome notes
          } else {
            renderNotes(localNotes());
          }
        }
        loadNotes();

        document.getElementById("gSend").addEventListener("click", function () {
          var name = document.getElementById("gName").value.trim();
          var msg = document.getElementById("gMsg").value.trim();
          var hp = document.getElementById("gWebsite").value; // honeypot
          if (hp) {
            toast("Thank you! 💛");
            return;
          } // silently ignore bots
          if (!name || !msg) {
            toast("Please add your name and a note 🙂");
            return;
          }
          var btn = this;

          if (GUESTBOOK_ENDPOINT) {
            btn.disabled = true;
            // text/plain avoids a CORS preflight to Apps Script
            fetch(GUESTBOOK_ENDPOINT, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify({ name: name, message: msg, website: hp }),
            })
              .then(function (r) {
                return r.json();
              })
              .then(function (res) {
                btn.disabled = false;
                if (res && res.ok) {
                  document.getElementById("gName").value = "";
                  document.getElementById("gMsg").value = "";
                  toast(
                    "Thank you! Your wish will appear once it\u2019s approved 💛",
                  );
                } else {
                  toast("Hmm, that didn\u2019t send. Please try again.");
                }
              })
              .catch(function () {
                btn.disabled = false;
                toast("Couldn\u2019t reach the guestbook. Please try again.");
              });
          } else {
            var n = { msg: msg, from: name };
            saveLocal(n);
            renderNotes(localNotes());
            document.getElementById("gName").value = "";
            document.getElementById("gMsg").value = "";
            toast("Thank you! Your note is on the board 💛");
            if (notesEl.lastChild) {
              notesEl.lastChild.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }
        });

        // ----- Nav (scroll + active state) -----
        var btns = document.querySelectorAll(".navbtn");
        btns.forEach(function (b) {
          b.addEventListener("click", function () {
            var el = document.getElementById(b.getAttribute("data-go"));
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        });
        var secs = [
          "home",
          "milestones",
          "gallery",
          "art",
          "voices",
          "about",
          "guestbook",
        ];
        if ("IntersectionObserver" in window) {
          var obs = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (en) {
                if (en.isIntersecting) {
                  btns.forEach(function (b) {
                    b.classList.toggle(
                      "active",
                      b.getAttribute("data-go") === en.target.id,
                    );
                  });
                }
              });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
          );
          secs.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) obs.observe(el);
          });
        }
      })();


      /* ===== Apple-style scroll choreography ===== */
      (function () {
        "use strict";
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce || !("IntersectionObserver" in window)) return;

        /* which elements animate, and how they enter */
        var GROUPS = [
          [".hero-photo", "rv-scale"],
          [".profilecard", "rv-right"],
          [".sec-title", "rv-soft"],
          [".sec-sub", "rv-soft"],
          [".agebadge", "rv-scale"],
          [".nowtag", "rv-soft"],
          [".mrow.left .mcard", "rv-left"],
          [".mrow.right .mcard", "rv-right"],
          [".album", ""],
          [".art", "rv-scale"],
          [".voice", ""],
          [".about-photo", "rv-left"],
          [".about-card", "rv-right"],
          [".guest-wrap", "rv-soft"],
          [".board", "rv-soft"],
          ["footer", "rv-soft"],
        ];

        var counters = new Map(); // stagger resets per container
        GROUPS.forEach(function (g) {
          document.querySelectorAll(g[0]).forEach(function (el) {
            if (el.classList.contains("reveal")) return;
            el.classList.add("reveal");
            if (g[1]) el.classList.add(g[1]);
            var p = el.parentElement;
            var i = counters.get(p) || 0;
            counters.set(p, i + 1);
            if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 75 + "ms";
          });
        });

        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) show(e.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        /* pending = anything not yet shown. The scroll loop below is a safety
           net: if the page jumps (nav link, anchor, fast flick) an element can
           be skipped by the observer, and it must never stay invisible. */
        var pending = [].slice.call(document.querySelectorAll(".reveal"));
        pending.forEach(function (el) {
          io.observe(el);
        });

        function show(el) {
          if (el.classList.contains("is-in")) return;
          el.classList.add("is-in");
          io.unobserve(el);
          var i = pending.indexOf(el);
          if (i > -1) pending.splice(i, 1);
          setTimeout(function () {
            el.classList.add("is-done");
            el.style.transitionDelay = "";
          }, 1500);
        }

        function sweep() {
          if (!pending.length) return;
          var vh = window.innerHeight;
          for (var i = pending.length - 1; i >= 0; i--) {
            var r = pending[i].getBoundingClientRect();
            if (r.top < vh * 0.92) show(pending[i]); // in view or already passed
          }
        }

        /* progress bar + sticky nav + gentle hero recede, all in one rAF loop */
        var prog = document.getElementById("sprog");
        var nav = document.querySelector("nav.mainnav");
        var hero = document.querySelector(".hero");
        var wide = window.innerWidth > 820;
        var ticking = false;

        function frame() {
          var y = window.scrollY || 0;
          var max = document.documentElement.scrollHeight - window.innerHeight;

          sweep(); // guarantee nothing is left hidden

          if (prog) {
            prog.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
            prog.classList.toggle("on", y > 60);
          }
          if (nav) nav.classList.toggle("stuck", y > 40);

          /* hero drifts slightly slower than the page and softly recedes */
          if (hero && wide) {
            if (y < 1000) {
              hero.style.transform = "translate3d(0," + y * 0.07 + "px,0)";
              hero.style.opacity = String(1 - Math.min(y / 1300, 0.4));
            }
          }
          ticking = false;
        }

        window.addEventListener(
          "scroll",
          function () {
            if (!ticking) {
              ticking = true;
              requestAnimationFrame(frame);
            }
          },
          { passive: true }
        );
        window.addEventListener("resize", function () {
          wide = window.innerWidth > 820;
          if (!wide && hero) {
            hero.style.transform = "";
            hero.style.opacity = "";
          }
          sweep();
        });
        /* images finishing loading can shift layout — re-check afterwards */
        window.addEventListener("load", function () {
          sweep();
          setTimeout(sweep, 600);
        });
        frame();
      })();
