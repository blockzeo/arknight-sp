// 卫戍协议·规程【序列Ⅰ】盟约图标精灵图 frames（26 格 / 160x280 / 每格 40px / 4 列）

export const covenantFrames = [
  {
    "x": 0,
    "y": 0,
    "width": 40,
    "height": 40,
    "filename": "炎.png"
  },
  {
    "x": 40,
    "y": 0,
    "width": 40,
    "height": 40,
    "filename": "萨尔贡.png"
  },
  {
    "x": 80,
    "y": 0,
    "width": 40,
    "height": 40,
    "filename": "维多利亚.png"
  },
  {
    "x": 120,
    "y": 0,
    "width": 40,
    "height": 40,
    "filename": "谢拉格.png"
  },
  {
    "x": 0,
    "y": 40,
    "width": 40,
    "height": 40,
    "filename": "阿戈尔.png"
  },
  {
    "x": 40,
    "y": 40,
    "width": 40,
    "height": 40,
    "filename": "叙拉古.png"
  },
  {
    "x": 80,
    "y": 40,
    "width": 40,
    "height": 40,
    "filename": "卡西米尔.png"
  },
  {
    "x": 120,
    "y": 40,
    "width": 40,
    "height": 40,
    "filename": "乌萨斯.png"
  },
  {
    "x": 0,
    "y": 80,
    "width": 40,
    "height": 40,
    "filename": "伊比利亚.png"
  },
  {
    "x": 40,
    "y": 80,
    "width": 40,
    "height": 40,
    "filename": "莱塔尼亚.png"
  },
  {
    "x": 80,
    "y": 80,
    "width": 40,
    "height": 40,
    "filename": "精准.png"
  },
  {
    "x": 120,
    "y": 80,
    "width": 40,
    "height": 40,
    "filename": "迅捷.png"
  },
  {
    "x": 0,
    "y": 120,
    "width": 40,
    "height": 40,
    "filename": "灵巧.png"
  },
  {
    "x": 40,
    "y": 120,
    "width": 40,
    "height": 40,
    "filename": "坚守.png"
  },
  {
    "x": 80,
    "y": 120,
    "width": 40,
    "height": 40,
    "filename": "助力.png"
  },
  {
    "x": 120,
    "y": 120,
    "width": 40,
    "height": 40,
    "filename": "远见.png"
  },
  {
    "x": 0,
    "y": 160,
    "width": 40,
    "height": 40,
    "filename": "奇迹.png"
  },
  {
    "x": 40,
    "y": 160,
    "width": 40,
    "height": 40,
    "filename": "投资人.png"
  },
  {
    "x": 80,
    "y": 160,
    "width": 40,
    "height": 40,
    "filename": "突袭.png"
  },
  {
    "x": 120,
    "y": 160,
    "width": 40,
    "height": 40,
    "filename": "不屈.png"
  },
  {
    "x": 0,
    "y": 200,
    "width": 40,
    "height": 40,
    "filename": "调和.png"
  },
  {
    "x": 40,
    "y": 200,
    "width": 40,
    "height": 40,
    "filename": "协防干员.png"
  },
  {
    "x": 80,
    "y": 200,
    "width": 40,
    "height": 40,
    "filename": "独行.png"
  },
  {
    "x": 120,
    "y": 200,
    "width": 40,
    "height": 40,
    "filename": "绝技.png"
  },
  {
    "x": 0,
    "y": 240,
    "width": 40,
    "height": 40,
    "filename": "聚合.png"
  },
  {
    "x": 40,
    "y": 240,
    "width": 40,
    "height": 40,
    "filename": "奥术.png"
  }
];

export const covenantFrameByName = covenantFrames.reduce((m, f) => {
  m[f.filename.replace('', '').replace('.png', '')] = f;
  return m;
}, {});

export const covenantAtlas = { file: 'atlas40.png', width: 160, height: 280, cell: 40, columns: 4, rows: 7 };

export const covenantSpriteCss = (name) => {
  const f = covenantFrameByName[name];
  if (!f) return null;
  return { backgroundPosition: `-${f.x}px -${f.y}px`, backgroundSize: '160px 280px' };
};

export default covenantFrames;
