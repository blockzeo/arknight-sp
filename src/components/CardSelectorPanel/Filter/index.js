import React, { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import styles from './index.module.css';

const Card = (props) => {
    const { filterList, selectFilter } = props;
    const [activeFilter, setActiveFilter] = useState([]);
    const setOption = () => {};
    const handleFilterChange = (item, type) => {
        let tags = [];
        switch(type){
            case 0:
                tags = filterList[type];
                break;
            case 1:
                tags = filterList[type];
                break;
            case 2:
                tags = filterList[type];
                break;
            case 3:
                tags = filterList[type];
                break;
            case 4:
                tags = filterList[type];
                break;
            default:
                tags = filterList[type];
                break;
        }
        let newFilter = [...activeFilter];
        if(item === "all") {
            newFilter = newFilter.filter(item => !tags.includes(item));
        } else if(newFilter.includes(item) ){
            newFilter = newFilter.filter(item => item !== item);
        } else {
            newFilter = newFilter.filter(item => !tags.includes(item));
            newFilter.push(item)
        }
        props.selectFilter(activeFilter);
        setActiveFilter(newFilter);
    }
    console.log("activeFilter:", activeFilter);
    return (
        <div className={styles.filterMain}>
            <div className={styles.filterList}>
                <div className="desktop">
                    {
                        filterList.map((listO, i) => {
                            return <div className={styles.filterListOne}>{ 
                                listO.map((item) => {
                                    if(activeFilter.includes(item)) console.log(activeFilter, item);
                                    return <Button key={"filter-" + item } className={styles.filterOne + " " + (activeFilter.includes(item) ? styles.filterOneSelect : "")} onClick={() => handleFilterChange(item, i)}>{item}</Button>
                                })
                            }
                            {filterList.length === i + 1 && (
                                <Button className={styles.filterOne} onClick={() => setActiveFilter([])} >
                                    清除
                                </Button>
                            )}
                            </div>
                        })
                    }
                </div>
                <div className="mobile">
                    {
                        activeFilter.map(listO => {
                            <Select className="filter-select" onChange={item => handleFilterChange(item, 0)} options={setOption(["all", listO])} defaultValue="all"></Select>
                        })
                    }
                    <Button className="filter-one" onClick={() => setActiveFilter([])} >清除</Button>
                </div>
            </div>
            {props.children}
        </div>
    )
}
export default Card;