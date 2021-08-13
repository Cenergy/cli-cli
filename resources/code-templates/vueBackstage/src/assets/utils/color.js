export default {
    darken(color, percent) {
        const f = color.split(',');
        const t = percent < 0 ? 0 : 255;
        const p = percent < 0 ? percent * -1 : percent;
        const R = parseInt(f[0].slice(4));
        const G = parseInt(f[1]);
        const B = parseInt(f[2]);
        return `rgb(${Math.round((t - R) * p) + R},${Math.round((t - G) * p) + G},${Math.round((t - B) * p) + B})`;
    },
    getColor(colorx, alphax = 1, defaultx = true) {
        let color = null;
        // change color hex to RGB
        if (/^[#]/.test(colorx)) {
            const c = this.hexToRgb(colorx);

            if (alphax === 1) {
                color = `rgb(${c.r},${c.g},${c.b})`;
            } else {
                color = `rgba(${c.r},${c.g},${c.b},${alphax})`;
            }
        } else if (/^rgba/.test(colorx)) {
            if (colorx.search(/.([0-9]\))$/) === -1 && !defaultx) {
                color = colorx.replace(/.?([0-9]\))$/, `${alphax})`);
            }
        } else if (/^(rgb)/.test(colorx)) {
            // change rgb and rgba
            if (alphax !== 1) {
                color = colorx.replace(/\)$/, `,${alphax})`);
            }
        }
        return color;
    },
    isColor(colorx) {
        const vscolors = ['primary', 'secondary', 'success', 'danger', 'warning', 'dark', 'light'];
        return vscolors.includes(colorx);
    },
    RandomColor() {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        return `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)})`;
    },
    rColor(colorx, opacity = 1) {
        let color = null;
        if (/^[#]/.test(colorx)) {
            const c = this.hexToRgb(colorx);
            color = `rgba(${c.r},${c.g},${c.b},${opacity})`;
        } else if (/^[rgb]/.test(colorx)) {
            let colorSplit = colorx.split(')')[0];
            if (!/^[rgba]/.test(colorx)) {
                colorSplit.replace('rgb', 'rgba');
                colorSplit += `,${opacity})`;
            } else {
                // colorSplit.replace('rgb','rgba')
                colorSplit += `)`;
            }
            color = colorSplit;
        }

        const vscolors = ['primary', 'success', 'danger', 'warning', 'dark'];
        if (color) {
            if (/[#()]/.test(color)) {
                return color;
            }
            if (vscolors.includes(color)) {
                return `rgba(var(--${color}),${opacity})`;
            }
            return `rgba(var(--primary),${opacity})`;
        }
        return `rgba(var(--primary),${opacity})`;
    },
    contrastColor(elementx) {
        let c = elementx;
        if (/[#]/g.test(elementx)) {
            const rgbx = this.hexToRgb(elementx);
            c = `rgb(${rgbx.r},${rgbx.g},${rgbx.b})`;
        }
        const rgb = c
            .replace(/^(rgb|rgba)\(/, '')
            .replace(/\)$/, '')
            .replace(/\s/g, '')
            .split(',');
        const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        if (yiq >= 128) {
            return true;
        }
        return false;
    },
    setCssVariable(propertyName, value) {
        if (typeof window !== 'undefined') {
            document.documentElement.style.setProperty(propertyName, value);
        }
    },
    hexToRgb(hex) {
        let hexVal = null;
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hexVal = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexVal);
        if (result) {
            return {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            };
        }
        return null;
    },
    getVariable(styles, propertyName) {
        return String(styles.getPropertyValue(propertyName)).trim();
    },
    changeColor(colorInicial) {
        const colores = ['primary', 'success', 'danger', 'warning', 'dark'];
        let colorx;

        if (colores.includes(colorInicial)) {
            const style = getComputedStyle(document.documentElement);
            colorx = this.getVariable(style, `--${colorInicial}`);
        } else if (/[rgb()]/g.test(colorInicial)) {
            colorx = colorInicial.replace(/[rgb()]/g, '');
        } else if (/[#]/g.test(colorInicial)) {
            const rgbx = this.hexToRgb(colorInicial);
            colorx = `${rgbx.r},${rgbx.g},${rgbx.b}`;
        } else {
            colorx = `--${colorInicial}`;
        }
        return colorx;
        // this.setCssVariable('--'+clave,colorx)
    },
};
