import { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import data from './data';
import Sprite from '../../components/Sprite';
import spriteS from './data-sp';
import './index.css';

const rank = ["I","II","III","IV","V","VI"];

const filterRank = [];
const filterGxmy = [];
const filterMy = [];
const filterType = [];
const filterZd = [];

function App() {
    const [originList, setOriginList] = useState([]); // 原始数据列表
    const [selectList, setSelectList] = useState([]); // 筛选后列表
    const [selectOne, setSelectOne] = useState({}); //选择干员
    const [activeFilter, setActiveFilter] = useState([]); //筛选项
    const [operatorShow, setOperatorShow] = useState([]); //设置手机端干员详情隐藏

    const spSrc = process.env.PUBLIC_URL + "/images/头像/头像_atlas50.png";
    const oneSpSrc = process.env.PUBLIC_URL +"/images/头像/";
    const selectOneS = (item) => {
        setSelectOne(item)
        setOperatorShow("show")
        document.body.style.overflow = 'hidden';
    }
    const selectOther = () => {
        setOperatorShow("hide");
        document.body.style.overflow = 'unset';
    }

    const handleFilterChange = (filterTag, type) => {
        let tags = [];
        switch(type){
            case 0:
                tags = filterRank;
                break;
            case 1:
                tags = filterGxmy;
                break;
            case 2:
                tags = filterMy;
                break;
            case 3:
                tags = filterType;
                break;
            case 4:
                tags = filterZd;
                break;
            default:
                tags = rank;
                break;
        }
        let newFilter = [...activeFilter];
        if(filterTag === "all") {
            newFilter = newFilter.filter(item => !tags.includes(item));
        } else if(newFilter.includes(filterTag) ){
            newFilter = newFilter.filter(item => item !== filterTag);
        } else {
            newFilter = newFilter.filter(item => !tags.includes(item));
            newFilter.push(filterTag)
        }
        setActiveFilter(newFilter);
    }

    useEffect(() => {
        const processList = data.map((item, index) => {
            const filterTag = [];

            const my = [];
            let ceng = false;
            Object.keys(item).forEach((key) => {
                const value = item[key];
                switch(key) {
                    case "阶数":
                        filterTag.push(value)
                        if(!filterRank.includes(value)) filterRank.push(value);
                        break;
                    case "核心盟约":
                        my.push(...value)
                        value.forEach(element => {
                            filterTag.push(...value)
                            if(!filterGxmy.includes(element)) filterGxmy.push(element);
                        });
                        break;
                    case "附加盟约":
                        my.push(...value)
                        filterTag.push(...value)
                        value.forEach(element => {
                            if(!filterMy.includes(element)) filterMy.push(element);
                        });
                        break;
                    case "特质类型":
                        filterTag.push(value);
                        console.log(value)
                        if(value === "单次叠加" || value === "持续叠加") ceng = true;
                        if(!filterType.includes(value)) filterType.push(value);
                        break;
                    case "字段":
                        filterTag.push(value)
                        if(value.includes("、")){
                            const values = value.split("、");
                            filterTag.push(...values)
                            values.forEach(element => {
                                if(!filterZd.includes(element)) filterZd.push(element);
                            });
                        } else {
                            if(!filterZd.includes(value)) filterZd.push(value);
                        }
                        break;
                    default:
                    break;
                }
            });

            return {
                key: index,
                level: item["阶数"],
                name: item["干员名"],
                coreCovenant: item["核心盟约"],
                covenant: item["附加盟约"],
                traitType: item["特质类型"],
                traitDesc: item["特质描述"],
                filterTag,
                my,
                ceng
            }
        });
        setOriginList(processList);
        setSelectList(processList);
    }, []);

    useEffect(() => {
        if(activeFilter.length === 0){
            setSelectList(originList);
            return;
        }
        let selectList = originList.filter((item) => {
            return activeFilter.every((tag) => {
                if(item.filterTag.includes(tag)){
                    return true;
                }
            });
        });
        setSelectList(selectList)
        setSelectOne(selectList[0] || {})
    }, [originList, activeFilter]);
    const setOption = (list) => {
        const options = [];
        list.forEach(element => {
            options.push({
                value: element,
                label: element
            })
        });
        return options;
    }
    const SpImgS = ({name, className = ""}) => {
        return <Sprite className={className} src={spSrc} map={spriteS} name={"头像_" + name +".png"}/>
    }
    return (
    <div id="wx-excel-page">
        {/* <Table dataSource={data} columns={columns} /> */}
        <div className="filter-container">
            {/* 电脑显示 */}
            <div className="desktop">
                <div className="filter-list">{ filterRank.map((item) => {
                    return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 0)}>{item}</Button>
                }) }</div>
                <div className="filter-list">{ filterGxmy.map((item) => {
                    return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 1)}>{item}</Button>
                }) }</div>
                <div className="filter-list">{ filterMy.map((item) => {
                    return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 2)} >{item}</Button>
                }) }</div>
                <div className="filter-list">{ filterType.map((item) => {
                    return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 3)} >{item}</Button>
                }) }</div>
                <div className="filter-list">{ filterZd.map((item) => {
                    return <Button key={"filter-" + item } className={"filter-one " + (activeFilter.includes(item) ? "filter-one-select" : "")} onClick={() => handleFilterChange(item, 4)} >{item}</Button>
                }) }
                    <Button className="filter-one" onClick={() => setActiveFilter([])} >清除</Button>
                </div>
            </div>
            {/* 手机显示 */}
            <div className="mobile">
                <Select className="filter-select" onChange={item => handleFilterChange(item, 0)} options={setOption(["all", ...filterRank])} defaultValue="all"></Select>
                <Select className="filter-select" onChange={item => handleFilterChange(item, 1)} options={setOption(["all", ...filterGxmy])} defaultValue="all"></Select>
                <Select className="filter-select" onChange={item => handleFilterChange(item, 2)} options={setOption(["all", ...filterMy])} defaultValue="all"></Select>
                <Select className="filter-select" onChange={item => handleFilterChange(item, 3)} options={setOption(["all", ...filterType])} defaultValue="all"></Select>
                <Select className="filter-select" onChange={item => handleFilterChange(item, 4)} options={setOption(["all", ...filterZd])} defaultValue="all"></Select>
                <Button className="filter-one" onClick={() => setActiveFilter([])} >清除</Button>
            </div>
        </div>
        <div className='operator-show'>
            <div className='operator-left'>
                <div className="operator-list custom-scrollbar">
                    { selectList.map((item, i) => {
                        console.log(item)
                        return <div  key={"select-" + i} className={"operator-one " + (item.ceng? "ceng ": "") + (selectOne.name === item.name ? "operator-one-select " : "") + "border-level-" + item.level} onClick={(e) => {e.stopPropagation(); selectOneS(item)}}>
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
            <div className='operator-right desktop'>
                <div className={"selct-one-detail border-level-" + (selectOne.level || 0)}>
                    {/*干员描述*/}
                    {selectOne.name && <div>
                        <img alt={selectOne.name} src={oneSpSrc + selectOne.name + ".png"}/>
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
                        <img alt={selectOne.name} src={oneSpSrc + selectOne.name + ".png"}/>
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
        
    </div>
  );
}

export default App;
 