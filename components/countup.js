/**
 * CountUp Component - Vanilla JavaScript version
 * Animated number counting with smooth transitions
 */
class CountUp {
    constructor(options = {}) {
        this.value = options.value || 0;
        this.duration = options.duration || 4000;
        this.decimals = options.decimals || 0;
        this.prefix = options.prefix || '';
        this.suffix = options.suffix || '';
        this.easing = options.easing || 'easeOut';
        this.separator = options.separator || ',';
        this.triggerOnView = options.triggerOnView !== false;
        this.animationStyle = options.animationStyle || 'default';
        this.colorScheme = options.colorScheme || 'default';
        this.customColor = options.customColor;
        this.onAnimationComplete = options.onAnimationComplete;

        this.element = null;
        this.hasAnimated = false;
        this.observer = null;
        this.animationId = null;
    }

    // Helper function to format the number
    formatValue(val, precision, sep) {
        return val
            .toFixed(precision)
            .replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    }

    // Easing functions
    getEasingFunction() {
        const easings = {
            linear: (t) => t,
            easeIn: (t) => t * t,
            easeOut: (t) => 1 - Math.pow(1 - t, 2),
            easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
            easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
            easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
            easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
            easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
            easeOutBack: (t) => {
                const c1 = 1.70158;
                const c3 = c1 + 1;
                return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
            },
            easeOutSlow: (t) => {
                // 마지막 부분에서 더 천천히 올라가는 커스텀 easing
                return 1 - Math.pow(1 - t, 12) * (1 - t * 0.8)
            },
            easeOutVerySlow: (t) => {
                // 마지막 20%에서 매우 천천히 올라가는 easing
                if (t < 0.8) {
                    return 1 - Math.pow(1 - t / 0.8, 3);
                } else {
                    const remaining = (t - 0.8) / 0.2;
                    return 0.8 + 0.2 * (1 - Math.pow(1 - remaining, 8));
                }
            }
        };
        return easings[this.easing] || easings.easeOutSlow;
    }

    // Animation styles
    getAnimationConfig() {
        const styles = {
            default: { type: 'tween' },
            bounce: { type: 'spring', bounce: 0.25 },
            spring: { type: 'spring', stiffness: 100, damping: 10 },
            gentle: { type: 'spring', stiffness: 60, damping: 15 },
            energetic: { type: 'spring', stiffness: 300, damping: 20 }
        };
        return styles[this.animationStyle] || styles.default;
    }

    // Color schemes
    getColorClass() {
        const schemes = {
            default: 'text-foreground',
            gradient: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600',
            primary: 'text-primary',
            secondary: 'text-secondary',
            custom: ''
        };
        return schemes[this.colorScheme] || schemes.default;
    }

    // Animate the counting
    animate() {
        if (this.hasAnimated && this.triggerOnView) return;

        const startTime = performance.now();
        const startValue = 0;
        const endValue = this.value;
        const easing = this.getEasingFunction();

        const animateFrame = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const easedProgress = easing(progress);
            const currentValue = startValue + (endValue - startValue) * easedProgress;

            this.updateDisplay(currentValue);

            if (progress < 1) {
                this.animationId = requestAnimationFrame(animateFrame);
            } else {
                this.hasAnimated = true;
                if (this.onAnimationComplete) {
                    this.onAnimationComplete();
                }
            }
        };

        this.animationId = requestAnimationFrame(animateFrame);
    }

    // Update the display
    updateDisplay(value) {
        if (!this.element) return;

        const formattedValue = this.formatValue(value, this.decimals, this.separator);
        const numberElement = this.element.querySelector('.countup-number');

        if (numberElement) {
            numberElement.textContent = formattedValue;
        }
    }

    // Create the HTML structure
    createElement() {
        const container = document.createElement('div');
        container.className = 'countup-container inline-flex items-center justify-center text-4xl font-bold text-black dark:text-white';

        const content = document.createElement('div');
        content.className = `flex items-center transition-all ${this.getColorClass()}`;

        if (this.prefix) {
            const prefixSpan = document.createElement('span');
            prefixSpan.className = 'mr-1 text-foreground';
            prefixSpan.textContent = this.prefix;
            content.appendChild(prefixSpan);
        }

        const numberSpan = document.createElement('span');
        numberSpan.className = 'countup-number text-foreground';
        numberSpan.textContent = this.formatValue(0, this.decimals, this.separator);
        content.appendChild(numberSpan);

        if (this.suffix) {
            const suffixSpan = document.createElement('span');
            suffixSpan.className = 'ml-1 text-foreground';
            suffixSpan.textContent = this.suffix;
            content.appendChild(suffixSpan);
        }

        if (this.colorScheme === 'custom' && this.customColor) {
            content.style.color = this.customColor;
        }

        container.appendChild(content);
        return container;
    }

    // Initialize with intersection observer
    init(container) {
        this.element = this.createElement();
        container.appendChild(this.element);

        if (!this.triggerOnView) {
            this.animate();
            return;
        }

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animate();
                    }
                });
            },
            { threshold: 0.1 }
        );

        this.observer.observe(this.element);
    }

    // Destroy the component
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountUp;
} else {
    window.CountUp = CountUp;
}
