import React, { use } from 'react';
import { Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.module.css';
import CardList from './Card';
import FilterList from './Filter'

const Card = (props) => {
    const { filterList } = props;
    const [filtered, setFiltered] = useState([]);
    const selectFilter = (list) => {
        console.log("list:", list)
        setFiltered(list);
    }
    console.log("index", filtered);

    return (
        <div className={styles.CardSelectPancelMain}>
            <FilterList filterList={ filterList } selectFilter={ selectFilter } filtered={ filtered }></FilterList>
            <CardList filtered={ filtered } data={props.data} SpImgS={props.SpImgS}></CardList>
        </div>
    )
}
export default Card;