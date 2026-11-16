import React, { useEffect } from 'react';
import { Button, Select } from 'antd';
import styles from './index.module.css';



const Card = (props) => {
    const { data, SpImgS, filtered } = props;
    const [selectOne, setSelectOne] = React.useState({});
    const [selectList, setSelectList] = React.useState(data);
    useEffect(() => {
        let selectList = data.filter((item) => {
            return filtered.every((tag) => {
                if(item.filterTag.includes(tag)){
                    return true;
                }
            });
        });
        setSelectList(selectList);
    }, [filtered, data]);
    
    let operatorShow = true;
    const selectOther= () => {

    }
    const selectOneS= (item) => {
        setSelectOne(item);
    }
    console.log("card", selectList);
    return (
        <div className={styles.CardShow}>
            <div className={styles.CardLeft}>
                <div className={styles.Cardlist + " custom-scrollbar"}>
                    { selectList.map((item, i) => {
                        return <div  key={"select-" + i} className={"operator-one " + (selectOne.name === item.name ? "operator-one-select " : "") + "border-level-" + item.level} onClick={(e) => {e.stopPropagation(); selectOneS(item)}}>
                            <SpImgS name={item.name} className="operator-img"/>
                            <div>{item.name}</div>    
                        </div>
                    })}
                    <div className="operator-one none">
                        <div></div>
                        <div></div>    
                    </div>
                </div>
            </div>
            <div className={styles.CardRight}>
                <div className={"selct-one-detail border-level-" + (selectOne.level || 0)}>
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        <img alt={selectOne.name} src={process.env.PUBLIC_URL +"/images/头像/头像_" + selectOne.name + ".png"}/>
                        <h2>{selectOne.name}</h2>
                        <p>阶数：{selectOne.level}</p>
                        <p>盟约：{selectOne.my ? (selectOne.my.map(item => (item + " ")) + " ") : ""}</p>
                        <p>特质类型：{selectOne.traitType}</p>
                        <p>特质描述：{selectOne.traitDesc}</p>
                    </div>  
                    }
                </div>    
            </div>
            { operatorShow === "show" && <div className='operator-right mobile'>
                <div className='operator-hide' onClick={() => selectOther()}></div>
                <div className={"selct-one-detail border-level-" + (selectOne.level || 0)} onClick={() => selectOther()}>
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        <img alt={selectOne.name} src={process.env.PUBLIC_URL +"/images/头像/头像_" + selectOne.name + ".png"}/>
                        <h2>{selectOne.name}</h2>
                        <p>阶数：{selectOne.level}</p>
                        <p>盟约：{selectOne.my ? (selectOne.my.map(item => (item + " ")) + " ") : ""}</p>
                        <p>特质类型：{selectOne.traitType}</p>
                        <p>特质描述：{selectOne.traitDesc}</p>
                    </div>  
                    }
                </div>    
            </div>}
        </div>
    )
}
export default Card;