/**
 * 3D 粒子背景动画
 * 使用 Three.js 实现
 * 适用于科技感博客
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否支持 WebGL
  if (!detectWebGL()) {
    console.warn('当前浏览器不支持 WebGL，粒子效果将被禁用');
    return;
  }

  // 创建粒子容器
  const container = document.createElement('div');
  container.id = 'particles-bg';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.3;
  `;
  document.body.appendChild(container);

  // 初始化 Three.js 场景
  initThreeJS(container);
});

/**
 * 检测 WebGL 支持
 */
function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * 初始化 Three.js 场景
 */
function initThreeJS(container) {
  // 场景
  const scene = new THREE.Scene();

  // 相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  // 渲染器
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // 创建粒子
  const particles = createParticles();
  scene.add(particles);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // 添加方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 添加几何体（可选）
  const geometry = createGeometry();
  scene.add(geometry);

  // 鼠标交互
  const mouse = new THREE.Vector2();
  const target = new THREE.Vector2();
  
  window.addEventListener('mousemove', function(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    
    // 粒子旋转
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
    
    // 几何体旋转
    if (geometry) {
      geometry.rotation.x += 0.001;
      geometry.rotation.y += 0.002;
    }
    
    // 鼠标交互影响
    target.x += (mouse.x - target.x) * 0.02;
    target.y += (mouse.y - target.y) * 0.02;
    
    particles.rotation.x += target.y * 0.0005;
    particles.rotation.y += target.x * 0.0005;
    
    renderer.render(scene, camera);
  }

  animate();

  // 处理窗口大小变化
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * 创建粒子系统
 */
function createParticles() {
  const particlesCount = 3000;
  const particlesGeometry = new THREE.BufferGeometry();
  
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  
  const colorPrimary = new THREE.Color(0x007bff);
  const colorSecondary = new THREE.Color(0x667eea);
  const colorAccent = new THREE.Color(0xff6b9d);
  
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    
    // 位置
    positions[i3] = (Math.random() - 0.5) * 100;
    positions[i3 + 1] = (Math.random() - 0.5) * 100;
    positions[i3 + 2] = (Math.random() - 0.5) * 100;
    
    // 颜色
    const colorChoice = Math.random();
    let color;
    if (colorChoice < 0.33) {
      color = colorPrimary;
    } else if (colorChoice < 0.66) {
      color = colorSecondary;
    } else {
      color = colorAccent;
    }
    
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  particlesGeometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeometry.setAttribute(
    'color', 
    new THREE.BufferAttribute(colors, 3)
  );
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  return new THREE.Points(particlesGeometry, particlesMaterial);
}

/**
 * 创建几何体（可选的装饰元素）
 */
function createGeometry() {
  const group = new THREE.Group();
  
  // 创建一些简单的几何体
  const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(15, 10, -20);
  group.add(cube);
  
  const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x007bff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(-15, -10, -20);
  group.add(sphere);
  
  const torusGeometry = new THREE.TorusGeometry(4, 1, 16, 100);
  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6b9d,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.set(0, 0, -30);
  group.add(torus);
  
  return group;
}

// 从 CDN 加载 Three.js
function loadThreeJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 如果 Three.js 还没有加载，则动态加载
if (typeof THREE === 'undefined') {
  loadThreeJS().then(() => {
    // Three.js 加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
      if (detectWebGL()) {
        const container = document.getElementById('particles-bg') || 
                         createContainer();
        initThreeJS(container);
      }
    });
  }).catch(() => {
    console.error('无法加载 Three.js');
  });
} else {
  // Three.js 已经加载
  document.addEventListener('DOMContentLoaded', function() {
    if (detectWebGL()) {
      const container = document.getElementById('particles-bg') || 
                       createContainer();
      initThreeJS(container);
    }
  });
}

function createContainer() {
  const container = document.createElement('div');
  container.id = 'particles-bg';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.3;
  `;
  document.body.appendChild(container);
  return container;
}
