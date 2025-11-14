const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");
const numberIndicator = document.querySelector(".numbers");

let active = 0;
const total = items.length;
let timer;

function update(direction) {
  // Remove a classe active do item e dot atuais
  document.querySelector(".item.active").classList.remove("active");
  document.querySelector(".dot.active").classList.remove("active");

  // Atualiza o índice ativo conforme a direção
  if (direction > 0) {
    active++;
    if (active === total) active = 0;
  } else if (direction < 0) {
    active--;
    if (active < 0) active = total - 1;
  }

  // Adiciona a classe active ao novo item e dot
  items[active].classList.add("active");
  dots[active].classList.add("active");

  // Atualiza o indicador numérico
  numberIndicator.textContent = String(active + 1).padStart(2, "0");
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    update(1);
  }, 7000);
}







// Função para reiniciar o carrossel (voltar ao item 0)
function resetCarousel() {
  // Remove classes active de todos
  items.forEach(item => item.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  active = 0;
  items[active].classList.add("active");
  dots[active].classList.add("active");
  numberIndicator.textContent = String(active + 1).padStart(2, "0");

  startTimer();
}

// Inicializa o carrossel ao carregar a página
window.addEventListener("load", resetCarousel);

prevButton.addEventListener("click", () => {
  update(-1);
  startTimer();
});

nextButton.addEventListener("click", () => {
  update(1);
  startTimer();
});
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-curso');





  
  // Cria o observer
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerInstance.unobserve(entry.target); // Para não observar mais após aparecer
      }
    });
  }, {
    threshold: 0.15 // Dispara quando 15% do card estiver visível
  });

  // Observa cada card
  cards.forEach(card => {
    observer.observe(card);
  });
});

// 🔥 Observer da seção "barbearia"
const barbeariaSection = document.querySelector('#barbearia');
if (barbeariaSection) {
  let isVisible = false; // controla se a seção está visível

  const barbeariaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isVisible) {
        // A seção acabou de aparecer → reinicia o carrossel
        resetCarousel();
        isVisible = true;
      } else if (!entry.isIntersecting && isVisible) {
        // A seção saiu completamente da tela → permite nova reinicialização depois
        isVisible = false;
      }
    });
  }, {
    threshold: 0.5 // Quando 50% da seção estiver visível
  });

  barbeariaObserver.observe(barbeariaSection);
}
