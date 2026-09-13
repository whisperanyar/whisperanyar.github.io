/**
 * 滚动动画和悬停效果
 * 为博客添加平滑的动画效果
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化滚动动画
  initScrollAnimations();
  
  // 初始化悬停效果
  initHoverEffects();
  
  // 初始化页面加载动画
  initPageLoadAnimation();
});

/**
 * 初始化滚动动画
 */
function initScrollAnimations() {
  // 为所有需要滚动动画的元素添加类
  const animateElements = document.querySelectorAll(
    '.post-summary, .post, .page, .site-avatar, .section-title'
  );
  
  animateElements.forEach((el, index) => {
    el.classList.add('scroll-animate');
    // 为每个元素设置不同的动画延迟
    el.style.animationDelay = `${index * 0.1}s`;
  });
  
  // 使用 Intersection Observer 检测元素是否进入视口
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // 如果是文章卡片，添加额外的动画类
        if (entry.target.classList.contains('post-summary')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        } else if (entry.target.classList.contains('post')) {
          entry.target.style.animation = 'fadeIn 0.8s ease forwards';
        } else {
          entry.target.style.animation = 'fadeIn 0.8s ease forwards';
        }
      }
    });
  }, observerOptions);
  
  // 观察所有需要动画的元素
  animateElements.forEach(el => observer.observe(el));
}

/**
 * 初始化悬停效果
 */
function initHoverEffects() {
  // 导航链接悬停效果
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    // 已经有悬停效果的 CSS，这里可以添加额外的交互
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // 文章卡片悬停效果
  const postSummaries = document.querySelectorAll('.post-summary');
  postSummaries.forEach(summary => {
    summary.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    summary.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    });
  });
  
  // 文章内容中的链接悬停效果
  const contentLinks = document.querySelectorAll('.post-content a');
  contentLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
      this.style.transition = 'all 0.2s ease';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
  
  // 按钮悬停效果
  const buttons = document.querySelectorAll('.pagination-item, .read-more');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

/**
 * 初始化页面加载动画
 */
function initPageLoadAnimation() {
  // 为整个页面添加加载动画
  const body = document.body;
  body.classList.add('page-loading');
  
  // 等待所有资源加载完成
  window.addEventListener('load', function() {
    // 延迟一下确保所有元素都已渲染
    setTimeout(() => {
      body.classList.remove('page-loading');
      body.classList.add('page-loaded');
      
      // 触发首页元素的动画
      const homeElements = document.querySelectorAll('.home-section, .posts-section');
      homeElements.forEach(el => {
        el.classList.add('loaded');
      });
    }, 100);
  });
}

/**
 * 平滑滚动到顶部
 */
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * 添加回到顶部按钮
 */
function addBackToTopButton() {
  const button = document.createElement('button');
  button.id = 'back-to-top';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
    z-index: 1000;
  `;
  
  button.addEventListener('click', smoothScrollToTop);
  document.body.appendChild(button);
  
  // 监听滚动事件
  let isVisible = false;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      if (!isVisible) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
        isVisible = true;
      }
    } else {
      if (isVisible) {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        isVisible = false;
      }
    }
  });
}

// 调用回到顶部按钮
addBackToTopButton();

/**
 * 添加进度条
 */
function addProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #007bff, #667eea, #ff6b9d);
    z-index: 1001;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / documentHeight) * 100;
    
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
}

// 调用进度条
addProgressBar();

/**
 * 优化图片加载（懒加载）
 */
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // 原生懒加载
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // 兼容方案
    const lazyLoadScript = document.createElement('script');
    lazyLoadScript.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
    lazyLoadScript.async = true;
    document.body.appendChild(lazyLoadScript);
  }
}

// 初始化懒加载
initLazyLoading();

/**
 * 添加键盘导航支持
 */
function initKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // 快捷键：回到顶部
    if (e.key === 'Home' || (e.ctrlKey && e.key === 'ArrowUp')) {
      e.preventDefault();
      smoothScrollToTop();
    }
    
    // 快捷键：滚动到底部
    if (e.key === 'End' || (e.ctrlKey && e.key === 'ArrowDown')) {
      e.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
}

// 初始化键盘导航
initKeyboardNavigation();

/**
 * 检测移动设备并优化体验
 */
function detectMobile() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.body.classList.add('mobile-device');
    
    // 在移动设备上减少动画效果以提高性能
    const style = document.createElement('style');
    style.textContent = `
      .scroll-animate {
        animation: none !important;
      }
      #particles-bg {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// 检测移动设备
detectMobile();

/**
 * 添加预加载
 */
function preloadResources() {
  // 预加载字体
  const font = new FontFace('Noto Sans SC', 'url(https://fonts.gstatic.com/s/notosanssc/v22/0nkv-C05mX4-LzP6Z5WfXg2jY.woff2) format("woff2")');
  font.load().then(() => {
    document.fonts.add(font);
  }).catch(console.error);
  
  // 预加载重要资源
  const importantResources = [
    '/assets/css/style.css',
    '/assets/js/particles.js',
    '/assets/js/animate.js'
  ];
  
  importantResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
}

// 预加载资源
preloadResources();

// 导出函数以便其他模块使用
window.smoothScrollToTop = smoothScrollToTop;
