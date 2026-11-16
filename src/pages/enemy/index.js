import { useEffect, useState } from 'react';
import Sprite from '../../components/Sprite';
import { InputNumber  } from 'antd';
import data from './data';
import sprite from './data-sp';
import spriteO from '../Operator/data-sp';

import './index.css';

const keysMatch = {
        "盟约":"name",
        "激活所需人数": "num",
        "效果1": "effect1",
        "效果公式1": "formula1",
        "效果2": "effect2",
        "效果3": "effect3",
        "所属干员": "operators",
        "类型": "type",
}
function App() {
    const [selectList, setSelectList] = useState([]); // 筛选后列表
    const [selectOne, setSelectOne] = useState({}); //选择
    const [allianceShow, setallianceShow] = useState([]); //设置手机端干员详情隐藏
    const [layers, setLayers] = useState(0); //层数
    
    const selectOneS = (item) => {
        setLayers(0);
        setSelectOne(item)
        setallianceShow("show")
        document.body.style.overflow = 'hidden';
    }
    const selectOther = () => {
        setallianceShow("hide");

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
      return <Sprite className="alliance-img" src={process.env.PUBLIC_URL + "/images/盟约/sprite.png"} map={sprite} name={name +".png"}/>
    }
    const SpImgO = ({name, className = ""}) => {
      return <Sprite className={`operator-img ${className}`} src={process.env.PUBLIC_URL + "/images/头像/sprite-s.png"} map={spriteO} name={"头像_" + name +".png"}/>
    }
    return (
    <div id="wx-excel-page">
        <div className='alliance-show'>
            <div className='alliance-left'>
                <div className="alliance-list custom-scrollbar">
                  <div className="alliance-list-hx">
                      { selectList.map((item, i) => {
                        if(item.type === "核心"){
                        return <div  key={"select-" + i} className={"alliance-one " + (selectOne.name === item.name ? "alliance-one-select " : "")} onClick={(e) => {e.stopPropagation(); selectOneS(item)}}>
                            <div  className="alliance-img-div">
                              <SpImg name={item.name}/>
                            </div>
                            <div>{item.name}</div>    
                        </div>
                        }
                      })}
                  </div>
                  <div className="alliance-list-fj">
                    { selectList.map((item, i) => {
                      if(item.type === "附加"){
                        return <div  key={"select-" + i} className={"alliance-one " + (selectOne.name === item.name ? "alliance-one-select " : "")} onClick={(e) => {e.stopPropagation(); selectOneS(item)}}>
                            <div  className="alliance-img-div">
                              <SpImg name={item.name}/>
                            </div>
                            
                            <div>{item.name}</div>    
                        </div>
                      }
                    })}
                  </div>
                    
                    <div className="alliance-one none">
                        <div></div>
                        <div></div>    
                    </div>
                </div>
            </div>
            <div className='alliance-right desktop'>
                <div className="selct-one-detail">
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        
                        <h2>{selectOne.name}</h2>
                        <div className="alliance-layers">
                          <InputNumber defaultValue={0} value={layers} onClick={ (e) => e.stopPropagation()}onChange={(value) => { setLayers(Number((value?value:0).toFixed(0)))}} max={999} min={0}/><div className='ml-5'>层</div>
                        </div>
                        {Object.keys(keysMatch).map((key) => {
                            if(!selectOne[keysMatch[key]]) return null;
                            let text = selectOne[keysMatch[key]];
                            switch(key){
                                case "盟约":
                                  return null;
                                case "所属干员":
                                    return <div className='operator-list-s' key={'operator-list-s-' + selectOne.name} >
                                      {text.map((operator) => {
                                        return <div key={"operator-list-s-" + operator} className='operator-item'>
                                            <SpImgO name={operator} />
                                        </div>
                                      })}
                                    </div>
                                  case "类型":
                                    return null;
                                  case "激活所需人数":
                                    return <p key={key}>{key}：{text}</p>
                                default:
                                      if(text instanceof Object){
                                        return <p className="text-left" key={key}>{key}：{text[2] ? text[0].replace("Y", Number((text[1](layers).toFixed(0)))).replace("Z", text[2](layers)) : text[0].replace("Y", Number((text[1](layers).toFixed(0))))}</p>
                                      } else {
                                        return <p className="text-left" key={key}>{key}：{text}</p>
                                      }
                                    
                            }
                        })}
                    </div>  
                    }
                </div>    
            </div>
            { allianceShow === "show" && <div className='alliance-right mobile'>
                <div className='alliance-hide' onClick={() => selectOther()}></div>
                <div className="selct-one-detail" onClick={() => selectOther()}>
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        <h2>{selectOne.name}</h2>
                      <h2><InputNumber defaultValue={0} value={layers} onClick={ (e) => e.stopPropagation()} onChange={(value) => { setLayers(Number((value?value:0).toFixed(0)))}} max={999} min={0}/><text className='ml-5'>层</text></h2>
                        {Object.keys(keysMatch).map((key) => {
                            if(!selectOne[keysMatch[key]]) return null;
                            let text = selectOne[keysMatch[key]];
                            switch(key){
                                case "盟约":
                                  return null;
                                case "所属干员":
                                    return <div className='operator-list-s' key={'operator-list-s-' + selectOne.name} >
                                      {text.map((operator) => {
                                        return <div key={"operator-list-s-" + operator} className='operator-item'>
                                            <SpImgO name={operator} />
                                        </div>
                                      })}
                                    </div>
                                  case "类型":
                                    return null;
                                  case "激活所需人数":
                                    return <p key={key}>{key}：{text}</p>
                                default:
                                      if(text instanceof Object){
                                        return <p className="text-left" key={key}>{key}：{text[2] ? text[0].replace("Y", Number((text[1](layers).toFixed(0)))).replace("Z", text[2](layers)) : text[0].replace("Y", Number((text[1](layers).toFixed(0))))}</p>
                                      } else {
                                        return <p className="text-left" key={key}>{key}：{text}</p>
                                      }
                                    
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
 