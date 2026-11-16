import { useEffect, useState } from 'react';
import Sprite from '../../components/Sprite';
import data from './data';
import './index.css';
import sprite from './data-sp';

const keysMatch = {
        "策略发起人":"name",
        "我方生命值": "life",
        "使用方式": "type",
        "消耗点数": "cost",
        "效果": "effect",
        "策略": "title",
        "解锁条件": "condition",
        "关联阵营": "my",
        "修改效果": "change",
        "备注": "remark",
        "备注2": "remark2"
}

function App() {
    const [selectList, setSelectList] = useState([]); // 筛选后列表
    const [selectOne, setSelectOne] = useState({}); //选择干员
    const [strategyShow, setstrategyShow] = useState([]); //设置手机端干员详情隐藏

    const oneSpSrc = process.env.PUBLIC_URL +"/images/策略/";
    const spSrc = oneSpSrc + "策略_atlas50.png";
    
    
    const selectOneS = (item) => {
        setSelectOne(item)
        setstrategyShow("show");
        document.body.style.overflow = 'hidden';
    }
    const selectOther = () => {
        setstrategyShow("hide");
        document.body.style.overflow = 'unset';
    }

    useEffect(() => {
        const list = [];
        data.forEach((item, index) => {
            const one = {};
            Object.keys(keysMatch).forEach((key) => {
                
                one[keysMatch[key]] = item[key]
            });
            list.push(one);
        });
        setSelectList(list);
    }, []);

    const SpImg = ({name, className = ""}) => {
        return <Sprite className={className} src={spSrc} map={sprite} name={"卫戍协议：盟约_策略发起人_" + name +".png"}/>
    }
    return (
    <div id="wx-excel-page">
        <div className='strategy-show'>
            {/* 列表框 */}
            <div className='strategy-left'>
                <div className="strategy-main custom-scrollbar">
                    <div className='strategy-card'>
                        <div className='strategy-type'>[ 泛用型策略 ]</div>
                        <div className="strategy-list">
                            { selectList.map((item, i) => {
                                if(item.my.length > 0) return false
                                return <div  key={"select-" + i} className={"strategy-one " + (selectOne.name === item.name ? "strategy-one-select " : "") + "border-level-" + item.level} onClick={(e) => {e.stopPropagation(); selectOneS(item)}}>
                                    <SpImg name={item.name} className="strategy-img"/>
                                    <div>{item.name}</div>    
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='strategy-card'>
                        <div className='strategy-type'>[ 盟约型策略 ]</div>
                        <div className="strategy-list">
                        { selectList.map((item, i) => {
                            if(item.my.length === 0) return false
                            return <div  key={"select-" + i} className={"strategy-one " + (selectOne.name === item.name ? "strategy-one-select " : "") + "border-level-" + item.level} onClick={(e) => {e.stopPropagation(); selectOneS(item)}}>
                                <SpImg name={item.name} className="strategy-img"/>
                                <div>{item.name}</div>    
                            </div>
                        })}
                        </div>

                    </div>
                    <div className="strategy-one none">
                        <div></div>
                        <div></div>    
                    </div>
                </div>
            </div>
            {/* 电脑显示 */}
            {/* 详情框 */}
            <div className='strategy-right desktop'>
                <div className={"selct-one-detail border-level-" + (selectOne.level || 0)}>
                    {/*干员描述*/}
                    {selectOne.name && <div className='strategy-detail'>
                        <img alt={selectOne.name} src={oneSpSrc + selectOne.title + ".png"}/>
                        <h2>
                            <div className='strategy-detail-title'>{selectOne.name}</div> 
                            <div className='strategy-detail-life'>初始生命值：<p>{selectOne.life}</p></div>
                            { selectOne.cost ? <div className='strategy-detail-cost'>消耗点数：<p>{selectOne.cost}</p></div>: null}
                        </h2>
                        <div className='text-left'>
                            <div>[{selectOne.title}]</div>
                            <div>{selectOne.effect}</div>
                        </div>
                        { selectOne.change ? <div className='strategy-change'>
                            {selectOne.change}
                        </div> : null}
                        <div className="strategy-condition">
                            解锁条件：{selectOne.condition}
                        </div>
                    </div>  
                    }
                </div>    
            </div>
            { strategyShow === "show" && <div className='strategy-right mobile'>
                <div className='strategy-hide' onClick={() => selectOther()}></div>
                <div className={"selct-one-detail border-level-" + (selectOne.level || 0)} onClick={() => selectOther()}>
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        <img alt={selectOne.name} src={oneSpSrc + selectOne.title + ".png"}/>
                        <h2>
                            <div className='strategy-detail-title'>{selectOne.title}</div> 
                            <div className='strategy-detail-life'>初始生命值：<p>{selectOne.life}</p></div>
                            { selectOne.cost ? <div className='strategy-detail-cost'>消耗点数：<p>{selectOne.cost}</p></div>: null}
                        </h2>
                        
                        {Object.keys(keysMatch).map((key) => {
                            const value = selectOne[keysMatch[key]];
                            if(!selectOne[keysMatch[key]]) return null;
                            switch(key){
                                case "策略":
                                case "我方生命值":
                                case "消耗点数":
                                case "使用方式":
                                    return null
                                case "关联阵营":
                                    if(value.length === 0) {
                                        return ""
                                    }
                                    break;
                                case "效果":
                                    return <div className='text-left'>
                                        <div>[{selectOne["title"]}]</div>
                                        <div>{value}</div>
                                    </div>
                                default:
                                    return <p key={key}>{key}：{value}</p>
                            }
                        })}
                    </div>  
                    }
                </div>    
            </div>}
        </div>
        
    </div>
  );
}

export default App;
 