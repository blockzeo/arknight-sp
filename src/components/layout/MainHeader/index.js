import { useNavigate, useLocation  } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { useState } from "react";
import styles from './index.module.css';

const App = () => {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
    const navigate = useNavigate ();
    const MenuItem = [
        {
            label: '干员',
            key: '/operator',
        },{
            label: '策略',
            key: '/strategy',
        },{
            label: '盟约',
            key: '/alliance',
        // },{
        //     label: '装备',
        //     key: '/equipment',
        // },{
        //     label: '敌方',
        //     key: '/enemy',
        }
    ]
    const items = [{
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="./">
        盟约
      </a>
    ),
    }]
    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    }
    console.log(styles)
    return <div className={styles.header}>
        <Menu className={styles.left} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={MenuItem} />
        {/* <div className={styles.right}>
            <Dropdown menu={{ items }}>
                往期 
            </Dropdown> 
        </div> */}
        
    </div>
}
export default App;