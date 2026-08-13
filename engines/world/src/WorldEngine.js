import * as THREE from 'https://esm.sh/three@0.160.0';

export class WorldEngine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.particles = null;
        this.animationId = null;
    }

    mount(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`[WorldEngine] Container #${containerId} not found.`);
            return;
        }

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        this.setupDeepSpace();

        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        this.animate();
        console.log("✅ WorldEngine mounted and rendering Deep Space.");
    }

    setupDeepSpace() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        const color = new THREE.Color();
        
        // 8000 particles for an ultra-dense, premium field
        for (let i = 0; i < 8000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(4000),
                THREE.MathUtils.randFloatSpread(4000),
                THREE.MathUtils.randFloatSpread(4000)
            );
            
            // Mix of cyan, deep blue, and purple for a cyberpunk/premium OS feel
            const rand = Math.random();
            if (rand > 0.6) {
                color.setHex(0x00ffcc); // Accent cyan
            } else if (rand > 0.3) {
                color.setHex(0x0055ff); // Deep blue
            } else {
                color.setHex(0x8a2be2); // Deep purple
            }
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({ 
            size: 2.5, 
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        this.camera.position.z = 1200;
        
        // Mouse tracking for parallax
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;

        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX - window.innerWidth / 2);
            this.mouseY = (event.clientY - window.innerHeight / 2);
        });
    }

    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        
        this.targetX = this.mouseX * 0.5;
        this.targetY = this.mouseY * 0.5;

        if (this.particles) {
            this.particles.rotation.x += 0.0002;
            this.particles.rotation.y += 0.0003;
            
            // Smooth camera parallax based on mouse
            this.camera.position.x += (this.targetX - this.camera.position.x) * 0.02;
            this.camera.position.y += (-this.targetY - this.camera.position.y) * 0.02;
            this.camera.position.z = 1200 + Math.sin(Date.now() * 0.0005) * 150; 
            
            this.camera.lookAt(this.scene.position);
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
