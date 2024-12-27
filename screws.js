// 英制螺纹标准数据库
const SCREW_DATABASE = {
    // UNC (粗牙)系列
    UNC: [
        { size: "#1", diameter: 1.854, tpi: 64, pitch: 0.397, series: "UNC" },
        { size: "#2", diameter: 2.184, tpi: 56, pitch: 0.453, series: "UNC" },
        { size: "#3", diameter: 2.515, tpi: 48, pitch: 0.529, series: "UNC" },
        { size: "#4", diameter: 2.845, tpi: 40, pitch: 0.635, series: "UNC" },
        { size: "#5", diameter: 3.175, tpi: 40, pitch: 0.635, series: "UNC" },
        { size: "#6", diameter: 3.505, tpi: 32, pitch: 0.794, series: "UNC" },
        { size: "#8", diameter: 4.166, tpi: 32, pitch: 0.794, series: "UNC" },
        { size: "#10", diameter: 4.826, tpi: 24, pitch: 1.058, series: "UNC" },
        { size: "1/4", diameter: 6.350, tpi: 20, pitch: 1.270, series: "UNC" },
        { size: "5/16", diameter: 7.938, tpi: 18, pitch: 1.411, series: "UNC" },
        { size: "3/8", diameter: 9.525, tpi: 16, pitch: 1.588, series: "UNC" },
        { size: "7/16", diameter: 11.113, tpi: 14, pitch: 1.814, series: "UNC" },
        { size: "1/2", diameter: 12.700, tpi: 13, pitch: 1.954, series: "UNC" },
        { size: "9/16", diameter: 14.288, tpi: 12, pitch: 2.117, series: "UNC" },
        { size: "5/8", diameter: 15.875, tpi: 11, pitch: 2.309, series: "UNC" },
        { size: "3/4", diameter: 19.050, tpi: 10, pitch: 2.540, series: "UNC" },
        { size: "7/8", diameter: 22.225, tpi: 9, pitch: 2.822, series: "UNC" },
        { size: "1", diameter: 25.400, tpi: 8, pitch: 3.175, series: "UNC" },
        { size: "1-1/8", diameter: 28.575, tpi: 7, pitch: 3.629, series: "UNC" },
        { size: "1-1/4", diameter: 31.750, tpi: 7, pitch: 3.629, series: "UNC" },
        { size: "1-3/8", diameter: 34.925, tpi: 6, pitch: 4.233, series: "UNC" },
        { size: "1-1/2", diameter: 38.100, tpi: 6, pitch: 4.233, series: "UNC" },
        { size: "1-3/4", diameter: 44.450, tpi: 5, pitch: 5.080, series: "UNC" },
        { size: "2", diameter: 50.800, tpi: 4.5, pitch: 5.644, series: "UNC" }
    ],
    
    // UNF (细牙)系列
    UNF: [
        { size: "#4", diameter: 2.845, tpi: 48, pitch: 0.529, series: "UNF" },
        { size: "#5", diameter: 3.175, tpi: 44, pitch: 0.577, series: "UNF" },
        { size: "#6", diameter: 3.505, tpi: 40, pitch: 0.635, series: "UNF" },
        { size: "#8", diameter: 4.166, tpi: 36, pitch: 0.706, series: "UNF" },
        { size: "#10", diameter: 4.826, tpi: 32, pitch: 0.794, series: "UNF" },
        { size: "1/4", diameter: 6.350, tpi: 28, pitch: 0.907, series: "UNF" },
        { size: "5/16", diameter: 7.938, tpi: 24, pitch: 1.058, series: "UNF" },
        { size: "3/8", diameter: 9.525, tpi: 24, pitch: 1.058, series: "UNF" },
        { size: "7/16", diameter: 11.113, tpi: 20, pitch: 1.270, series: "UNF" },
        { size: "1/2", diameter: 12.700, tpi: 20, pitch: 1.270, series: "UNF" },
        { size: "9/16", diameter: 14.288, tpi: 18, pitch: 1.411, series: "UNF" },
        { size: "5/8", diameter: 15.875, tpi: 18, pitch: 1.411, series: "UNF" },
        { size: "3/4", diameter: 19.050, tpi: 16, pitch: 1.588, series: "UNF" },
        { size: "7/8", diameter: 22.225, tpi: 14, pitch: 1.814, series: "UNF" },
        { size: "1", diameter: 25.400, tpi: 12, pitch: 2.117, series: "UNF" },
        { size: "1-1/8", diameter: 28.575, tpi: 12, pitch: 2.117, series: "UNF" },
        { size: "1-1/4", diameter: 31.750, tpi: 12, pitch: 2.117, series: "UNF" },
        { size: "1-3/8", diameter: 34.925, tpi: 12, pitch: 2.117, series: "UNF" },
        { size: "1-1/2", diameter: 38.100, tpi: 12, pitch: 2.117, series: "UNF" },
        { size: "1-3/4", diameter: 44.450, tpi: 12, pitch: 2.117, series: "UNF" },
        { size: "2", diameter: 50.800, tpi: 12, pitch: 2.117, series: "UNF" }
    ]
};

// 方案1：使用预定义的标准长度
const STANDARD_LENGTHS = [
    { mm: 6, inch: 0.25 },     // 1/4"
    { mm: 8, inch: 0.3125 },   // 5/16"
    { mm: 10, inch: 0.375 },   // 3/8"
    { mm: 12, inch: 0.5 },     // 1/2"
    { mm: 16, inch: 0.625 },   // 5/8"
    { mm: 20, inch: 0.75 },    // 3/4"
    { mm: 22, inch: 0.875 },   // 7/8"
    { mm: 25, inch: 1 },       // 1"
    { mm: 30, inch: 1.25 },    // 1-1/4"
    { mm: 35, inch: 1.375 },   // 1-3/8"
    { mm: 40, inch: 1.5 },     // 1-1/2"
    { mm: 45, inch: 1.75 },    // 1-3/4"
    { mm: 50, inch: 2 },       // 2"
    { mm: 60, inch: 2.375 },   // 2-3/8"
    { mm: 70, inch: 2.75 },    // 2-3/4"
    { mm: 75, inch: 3 },       // 3"
    { mm: 80, inch: 3.125 },   // 3-1/8"
    { mm: 90, inch: 3.5 },     // 3-1/2"
    { mm: 100, inch: 4 },      // 4"
    { mm: 125, inch: 5 },      // 5"
    { mm: 150, inch: 6 },      // 6"
    { mm: 175, inch: 7 },      // 7"
    { mm: 200, inch: 8 }       // 8"
];

function generateStandardLengths() {
    return STANDARD_LENGTHS;
}

// 识别螺纹规格
function identifyScrew(diameter, pitch, length) {
    const standardLengths = generateStandardLengths();
    const allScrews = [...SCREW_DATABASE.UNC, ...SCREW_DATABASE.UNF];
    
    // 设置误差范围
    const EXACT_MATCH_TOLERANCE = 0.2;   // 精确匹配的误差范围
    const PITCH_TOLERANCE = 0.1;         // 螺距误差范围
    const LENGTH_TOLERANCE = 1;          // 长度误差范围

    // 首先按螺距精确匹配
    const matchedScrews = allScrews.filter(screw => 
        Math.abs(screw.pitch - pitch) <= PITCH_TOLERANCE
    ).sort((a, b) => 
        Math.abs(a.diameter - diameter) - Math.abs(b.diameter - diameter)
    );

    const selectedScrew = matchedScrews[0];

    // 找到最接近的标准长度
    let closestLengths = standardLengths
        .map(stdLength => ({
            ...stdLength,
            difference: Math.abs(stdLength.mm - length)
        }))
        .sort((a, b) => a.difference - b.difference)
        .slice(0, 2);

    // 修改长度判断逻辑
    if (length > standardLengths[standardLengths.length - 1].mm) {
        // 如果输入长度超过最大标准长度，只返回最大标准长度
        closestLengths = [standardLengths[standardLengths.length - 1]];
    } else if (closestLengths[0].difference <= LENGTH_TOLERANCE) {
        // 如果找到精确匹配，只返回一个长度
        closestLengths.length = 1;
    } else {
        // 确保两个长度一个在输入值的上方，一个在下方
        const upperLength = closestLengths.find(l => l.mm >= length);
        const lowerLength = closestLengths.find(l => l.mm <= length);
        if (upperLength && lowerLength) {
            closestLengths[0] = lowerLength;
            closestLengths[1] = upperLength;
        }
    }

    const result = {
        ...selectedScrew,
        length: closestLengths[0].mm,
        lengthInch: closestLengths[0].inch,
        standardLengths: closestLengths.map(l => ({
            mm: l.mm,
            inch: l.inch
        })),
        warning: Math.abs(selectedScrew.diameter - diameter) > EXACT_MATCH_TOLERANCE ? 
            `注意：输入直径 ${diameter}mm 接近 ${selectedScrew.size}" (直径${selectedScrew.diameter}mm)` : null
    };

    return [result];
} 