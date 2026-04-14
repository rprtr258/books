/**
 * Common JavaScript functionality
 * «Исследование о природе и причинах богатства народов»
 */

// ===========================================
// 1. EXPANDABLE SECTIONS
// ===========================================

const ExpandableSections = {
  init() {
    document.querySelectorAll('.expandable-header, .reason-header').forEach(header => {
      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', !isExpanded);
        
        const content = header.nextElementSibling;
        if (content) {
          content.setAttribute('aria-hidden', isExpanded);
        }
      });
    });
  }
};

// ===========================================
// 2. INTERACTIVE DIAGRAMS
// ===========================================

const InteractiveDiagrams = {
  init() {
    // Pin factory stages
    document.querySelectorAll('.diagram-stage').forEach(stage => {
      stage.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.diagram-stage').forEach(s => {
          s.classList.remove('active');
        });
        // Add active to clicked
        stage.classList.add('active');
        
        // Show description if exists
        const stageId = stage.dataset.stage;
        const description = document.querySelector(`.stage-description[data-stage="${stageId}"]`);
        if (description) {
          document.querySelectorAll('.stage-description').forEach(d => {
            d.classList.add('hidden');
          });
          description.classList.remove('hidden');
        }
      });
    });
  }
};

// ===========================================
// 3. FILTERS
// ===========================================

const FilterSystem = {
  init() {
    document.querySelectorAll('.chain-filters').forEach(filterContainer => {
      const buttons = filterContainer.querySelectorAll('.filter-btn');
      const targetSelector = filterContainer.dataset.filterTarget;
      const target = targetSelector ? document.querySelector(targetSelector) : null;
      
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Filter items
          if (target) {
            const filterValue = btn.dataset.filter;
            const items = target.querySelectorAll('[data-filter-group]');
            
            items.forEach(item => {
              if (filterValue === 'all' || item.dataset.filterGroup === filterValue) {
                item.classList.remove('hidden');
              } else {
                item.classList.add('hidden');
              }
            });
          }
        });
      });
    });
  }
};

// ===========================================
// 4. QUIZ SYSTEM
// ===========================================

const QuizSystem = {
  init() {
    document.querySelectorAll('.quiz-container').forEach(quiz => {
      const options = quiz.querySelectorAll('.quiz-option');
      const correctAnswer = quiz.dataset.correct;
      
      options.forEach(option => {
        option.addEventListener('click', () => {
          // Prevent multiple selections
          if (quiz.classList.contains('answered')) return;
          quiz.classList.add('answered');
          
          const selected = option.dataset.option;
          const isCorrect = selected === correctAnswer;
          
          // Mark option
          option.classList.add('selected');
          if (isCorrect) {
            option.classList.add('correct');
          } else {
            option.classList.add('incorrect');
            // Show correct answer
            options.forEach(opt => {
              if (opt.dataset.option === correctAnswer) {
                opt.classList.add('correct');
              }
            });
          }
          
          // Show feedback
          const feedback = quiz.querySelector('.quiz-feedback');
          if (feedback) {
            feedback.classList.remove('hidden');
            feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
            feedback.textContent = isCorrect 
              ? '✓ Правильно!' 
              : '✗ Неверно. Правильный ответ выделен.';
          }
        });
      });
    });
  }
};

// ===========================================
// 5. FADE ON SCROLL
// ===========================================

const FadeOnScroll = {
  init() {
    const elements = document.querySelectorAll('.fade-on-scroll');
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
  }
};

// ===========================================
// 6. STICKY NAVIGATION
// ===========================================

const StickyNavigation = {
  init() {
    const nav = document.querySelector('.chapter-nav-sticky');
    if (!nav) return;
    
    const header = document.querySelector('.chapter-header');
    if (!header) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          nav.classList.add('sticky');
        } else {
          nav.classList.remove('sticky');
        }
      });
    }, {
      rootMargin: '-100px 0px 0px 0px'
    });
    
    observer.observe(header);
  }
};

// ===========================================
// 7. KEYBOARD NAVIGATION
// ===========================================

const KeyboardNavigation = {
  init() {
    document.addEventListener('keydown', (e) => {
      // Next/Previous chapter with arrow keys
      if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey) {
        const nextLink = document.querySelector('.nav-next');
        if (nextLink && !e.target.matches('input, textarea')) {
          nextLink.click();
        }
      }
      if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey) {
        const prevLink = document.querySelector('.nav-prev');
        if (prevLink && !e.target.matches('input, textarea')) {
          prevLink.click();
        }
      }
      
      // Home - go to table of contents
      if (e.key === 'Home' && !e.metaKey && !e.ctrlKey) {
        if (!e.target.matches('input, textarea')) {
          window.location.href = '/index.html';
        }
      }
    });
  }
};

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  ExpandableSections.init();
  InteractiveDiagrams.init();
  FilterSystem.init();
  QuizSystem.init();
  FadeOnScroll.init();
  StickyNavigation.init();
  KeyboardNavigation.init();
  
  console.log('📚 Адам Смит: «Богатство народов» — интерактивный сайт инициализирован');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ExpandableSections,
    InteractiveDiagrams,
    FilterSystem,
    QuizSystem
  };
}
