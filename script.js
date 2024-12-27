function formatResults(results) {
    return results.map(result => {
        const lengthFraction = decimalToFraction(result.lengthInch);
        
        // 先创建结果表格
        const tableHtml = `
            <div class="result-table">
                ${result.warning ? 
                    `<div class="warning-message">${result.warning}</div>` : ''}
                <div class="table-header">
                    <div class="header-cell">螺纹直径:</div>
                    <div class="header-cell">牙距:</div>
                    <div class="header-cell">螺纹长度:</div>
                    <div class="header-cell">螺距:</div>
                    <div class="header-cell">系列:</div>
                </div>
                <div class="table-row">
                    <div class="table-cell">${result.size}" (≈${formatNumber(result.diameter)}mm)</div>
                    <div class="table-cell">${result.tpi} TPI</div>
                    <div class="table-cell">${lengthFraction}" (≈${formatNumber(result.length)}mm)</div>
                    <div class="table-cell">${formatNumber(result.pitch)}</div>
                    <div class="table-cell">${result.series}(${result.series === 'UNC' ? '粗牙' : '细牙'})</div>
                </div>
                <div class="standard-length-row">
                    <span class="length-label">推荐标准长度:</span>
                    ${result.standardLengths.map(length => 
                        `<span class="length-value">${decimalToFraction(length.inch)}" (${length.mm}mm)</span>`
                    ).join(' 或 ')}
                </div>
            </div>
        `;

        return `
            <div class="result-container">
                ${tableHtml}
            </div>
        `;
    }).join('');
}

function validateInput(value, min, max, fieldName) {
    if (isNaN(value)) {
        throw new Error(`${fieldName}必须是有效的数字`);
    }
    if (value < min || value > max) {
        throw new Error(`${fieldName}必须在 ${min}mm 到 ${max}mm 之间`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('screwForm');
    const diameterInput = document.getElementById('diameter');
    const pitchSelect = document.getElementById('pitch');
    const lengthInput = document.getElementById('length');
    const resultContent = document.getElementById('resultContent');
    const pitchInfo = document.querySelector('.pitch-info');

    // 监听直径输入
    diameterInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (value > 52) {
            showError(diameterInput, '螺纹直径不能超过52mm');
            e.target.value = ''; // 清空输入
        } else if (value < 1) {
            showError(diameterInput, '螺纹直径不能小于1mm');
            e.target.value = ''; // 清空输入
        } else if (value && value > 0) {
            updatePitchOptions(value);
        } else {
            pitchSelect.disabled = true;
            pitchSelect.innerHTML = '<option value="">请先输入直径</option>';
            pitchInfo.innerHTML = '';
        }
    });

    // 更新螺距选项
    function updatePitchOptions(diameter) {
        // 找到最接近的两个UNC规格
        const uncScrews = SCREW_DATABASE.UNC
            .map(screw => ({
                ...screw,
                difference: Math.abs(screw.diameter - diameter)
            }))
            .sort((a, b) => a.difference - b.difference)
            .slice(0, 2);

        // 找到最接近的两个UNF规格
        const unfScrews = SCREW_DATABASE.UNF
            .map(screw => ({
                ...screw,
                difference: Math.abs(screw.diameter - diameter)
            }))
            .sort((a, b) => a.difference - b.difference)
            .slice(0, 2);

        pitchSelect.disabled = false;
        pitchSelect.style.display = 'none';
        pitchSelect.innerHTML = '<option value="">请选择螺距</option>';

        // 更新螺距信息显示
        let infoHtml = '<div class="pitch-options-container">';
        
        // 显示UNC选项
        if (uncScrews[0] && uncScrews[0].difference <= 2) {
            infoHtml += '<div class="pitch-group"><div class="group-label">UNC (粗牙)</div><div class="pitch-options">';
            uncScrews.forEach(screw => {
                pitchSelect.innerHTML += `<option value="${screw.pitch}">${screw.pitch}</option>`;
                
                infoHtml += `
                    <div class="pitch-option unc-option" data-pitch="${screw.pitch}">
                        <div class="size-info">${screw.size}" (∅${screw.diameter.toFixed(2)}mm)</div>
                        <div class="pitch-info">螺距 ${screw.pitch.toFixed(2)}mm</div>
                    </div>
                `;
            });
            infoHtml += '</div></div>';
        }
        
        // 显示UNF选项
        if (unfScrews[0] && unfScrews[0].difference <= 2) {
            infoHtml += '<div class="pitch-group"><div class="group-label">UNF (细牙)</div><div class="pitch-options">';
            unfScrews.forEach(screw => {
                pitchSelect.innerHTML += `<option value="${screw.pitch}">${screw.pitch}</option>`;
                
                infoHtml += `
                    <div class="pitch-option unf-option" data-pitch="${screw.pitch}">
                        <div class="size-info">${screw.size}" (∅${screw.diameter.toFixed(2)}mm)</div>
                        <div class="pitch-info">螺距 ${screw.pitch.toFixed(2)}mm</div>
                    </div>
                `;
            });
            infoHtml += '</div></div>';
        }

        infoHtml += '</div>';
        pitchInfo.innerHTML = infoHtml;

        // 添加点击事件处理
        const pitchOptions = pitchInfo.querySelectorAll('.pitch-option');
        pitchOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedPitch = this.dataset.pitch;
                
                // 移除其他选项的选中状态
                pitchOptions.forEach(opt => opt.classList.remove('selected'));
                // 添加当前选项的选中状态
                this.classList.add('selected');
                
                // 更新隐藏的select值
                pitchSelect.value = selectedPitch;
                
                // 手动设置select的选中项
                const options = pitchSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === selectedPitch) {
                        options[i].selected = true;
                        break;
                    }
                }
                
                // 触发change事件
                const event = new Event('change', { bubbles: true });
                pitchSelect.dispatchEvent(event);
            });
        });

        // 如果没有找到合适的规格
        if (pitchOptions.length === 0) {
            pitchInfo.innerHTML = '<span class="error-info">输入直径不在标准范围内</span>';
        }
    }

    // 表单提交处理
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const diameter = parseFloat(diameterInput.value);
        const pitch = parseFloat(pitchSelect.value);
        const length = parseFloat(lengthInput.value);
        
        try {
            validateInput(diameter, 0.1, 100, '直径');
            if (!pitch) {
                throw new Error('请选择螺距');
            }
            validateInput(length, 1, 1000, '长度');

            // 显示加载状态
            resultContent.innerHTML = '<div class="loading">正在识别...</div>';
            
            // 模拟异步操作
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const results = identifyScrew(diameter, pitch, length);
            
            // 显示结果
            resultContent.innerHTML = formatResults(results);
            
            // 添加动画效果并滚动到结果
            resultContent.style.opacity = 0;
            resultContent.style.display = 'block';
            
            // 平滑滚动到结果区域
            resultContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'  // 将结果区域滚动到屏幕中央
            });
            
            // 淡入显示结果
            setTimeout(() => {
                resultContent.style.opacity = 1;
            }, 10);
            
        } catch (error) {
            showError(form, error.message);
        }
    });

    // 添加长度输入验证
    lengthInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (value > 200) {
            showError(lengthInput, '螺纹长度不能超过200mm');
            e.target.value = ''; // 清空输入
        } else if (value < 1) {
            showError(lengthInput, '螺纹长度不能小于1mm');
            e.target.value = ''; // 清空输入
        }
    });
});

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const parent = element.parentElement;
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        parent.removeChild(existingError);
    }
    
    // 添加错误状态样式
    element.classList.add('input-error');
    parent.appendChild(errorDiv);
    
    // 3秒后移除错误提示
    setTimeout(() => {
        parent.removeChild(errorDiv);
        element.classList.remove('input-error');
    }, 3000);
}

// 方案2：使用英制长度查找表
const LENGTH_LOOKUP = {
    25: "1",
    30: "1-1/4",
    35: "1-3/8",
    40: "1-1/2",
    45: "1-3/4",
    50: "2",
    60: "2-3/8",
    70: "2-3/4",
    80: "3-1/8",
    90: "3-1/2",
    100: "4"
};

function decimalToFraction(decimal) {
    // 如果是标准长度，直接返回整数部分
    if (decimal === 1 || decimal === 2 || decimal === 3 || decimal === 4) {
        return `${decimal}`;
    }
    
    const wholePart = Math.floor(decimal);
    let fractionalPart = decimal - wholePart;
    
    // 常用分数对照表
    const fractions = [
        { decimal: 0.875, fraction: "7/8" },
        { decimal: 0.75, fraction: "3/4" },
        { decimal: 0.625, fraction: "5/8" },
        { decimal: 0.5, fraction: "1/2" },
        { decimal: 0.375, fraction: "3/8" },
        { decimal: 0.25, fraction: "1/4" },
        { decimal: 0.125, fraction: "1/8" }
    ];
    
    let fractionStr = "";
    for (let fraction of fractions) {
        if (Math.abs(fractionalPart - fraction.decimal) < 0.0625) {
            fractionStr = fraction.fraction;
            break;
        }
    }
    
    // 修改返回逻辑
    if (wholePart === 0 && fractionStr) {
        return fractionStr;
    } else if (fractionStr) {
        return `${wholePart}-${fractionStr}`;
    } else {
        return `${wholePart}`; // 对于整数，直接返回数字
    }
}

function formatNumber(num) {
    return Number(num.toFixed(3));
} 