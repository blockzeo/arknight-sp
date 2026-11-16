import React from 'react';
import './index.css';

/**
 * 精灵图组件
 * @param {string } src - 精灵图的路径
 * @param { object }  map - 精灵图的映射
 * @param { object }  - 精灵图中目标图像的坐标
 * @param { string } name - 单图的名字
 * <Sprite src={process.env.PUBLIC_URL + "/images/头像/头像_atlas.png"} map={spriteS} name={"头像_" + name +".png"}/>
 * 
 */

 
const SpriteIcon = ({
    src, 
    map, 
    name,
    className = ""
}) => { 
    console.log()
    if(Object.keys(map).length === 0) return "暂无图片"
    const one = map.find(item => item.filename === name);   
    const xy = one === undefined ? `` : `-${one.x}px -${one.y}px`;
    return <i alt={name} style={{background: `url(${src})`, backgroundPosition: `${xy}`}} className={`sprite ${className}`}></i>
}


export default SpriteIcon;