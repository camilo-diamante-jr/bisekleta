export function initNavbar() {
  $("#navbar-content").load("./src/pages/components/navbar.html", () => {
    setupNavbarToggle();
    setupNavClicks();

    const saved = localStorage.getItem("activePage");
    const initialPath = saved || window.location.pathname;

    showPage(initialPath);
    window.history.replaceState({}, "", initialPath);

    window.onpopstate = () => showPage(window.location.pathname);
  });
}

/* ---------------- NAVBAR BURGER (MOBILE) ---------------- */
function setupNavbarToggle() {
  const $burger = $(".navbar-burger");
  const $menu = $(".navbar-menu");

  $burger.on("click", () => {
    $burger.toggleClass("is-active");
    $menu.toggleClass("is-active");
  });
}

function setupNavClicks() {
  $(".nav-item").on("click", function (e) {
    e.preventDefault();
    const link = $(this).attr("href");
    const target = $(this).data("target");

    if (!target) {
      bulmaAlert("Navigation Error", "This link has no data-target assigned.");
      return;
    }

    if ($(target).length === 0) {
      bulmaAlert(
        "404 Not Found",
        `The target section "${target}" does not exist.`
      );
      return;
    }

    window.history.pushState({}, "", link);
    localStorage.setItem("activePage", link);

    showPage(link);
  });
}

function cleanPath(path) {
  return path.replace(/\/$/, "").replace(/\.html$/, "");
}

export function showPage(path) {
  const cleanedPath = cleanPath(path);

  let found = false;

  $(".nav-item").each(function () {
    const link = cleanPath($(this).attr("href"));
    const target = $(this).data("target");

    if (cleanedPath === link) {
      found = true;

      if (!target || $(target).length === 0) {
        bulmaAlert("404 Not Found", "The page container could not be loaded.");
        return;
      }

      $(target).removeClass("is-hidden");
    } else {
      $(target)?.addClass("is-hidden");
    }
  });

  if (!found) {
    bulmaAlert("404", "The page you're trying to open does not exist.");
  }

  localStorage.setItem("activePage", path);
}

function bulmaAlert(title, message) {
  $(".notification.is-danger").remove();

  const alertHTML = `
    <div class="notification is-danger has-text-weight-semibold" style="position:fixed; top:20px; right:20px; z-index:9999; min-width:250px;">
      <button class="delete"></button>
      <strong>${title}</strong><br>
      <span>${message}</span>
    </div>
  `;

  $("body").append(alertHTML);

  $(".notification .delete").on("click", function () {
    $(this)
      .parent()
      .fadeOut(200, () => $(this).remove());
  });

  setTimeout(() => {
    $(".notification.is-danger").fadeOut(300, function () {
      $(this).remove();
    });
  }, 3000);
}
