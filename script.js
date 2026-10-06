document.addEventListener("DOMContentLoaded", function () {
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("aberto");
      toggle.setAttribute("aria-expanded", menu.classList.contains("aberto"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // gráficos da pesquisa antiga, agora funcionando em uma página html separada
  if (typeof Chart !== "undefined") {
    const common = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: function(ctx) {
          return " " + ctx.label + ": " + ctx.raw + "%";
        }}}
      },
      cutout: "68%"
    };

    function donut(id, labels, data) {
      const el = document.getElementById(id);
      if (!el) return;
      new Chart(el, {
        type: "doughnut",
        data: { labels, datasets: [{ data }] },
        options: common
      });
    }

    donut("chartSofreu", ["sim", "não"], [68.8, 31.2]);
    donut("chartDenuncia", ["sim", "não", "nunca se aplicou"], [53.1, 43.8, 3.1]);
    donut("chartEscola", ["ajudou", "não ajudou", "não sabe"], [53.1, 31.2, 15.6]);
  }
});
