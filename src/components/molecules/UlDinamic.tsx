import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";


interface UlDinamicProps {
    classname: string;
    liClassName: string;
    itemsList?: {item: string, icon: IconDefinition}[];
    iconClassName: string;
    textClassName: string;
    setClikedLi: React.Dispatch<React.SetStateAction<string>>;
    setTypeDinamicGate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UlDinamic: React.FC<UlDinamicProps> = ({ classname, liClassName, itemsList = [], iconClassName, textClassName, setClikedLi, setTypeDinamicGate}) => {

    const clickedItemLi = (text: string) => {
        setClikedLi(text);
        setTypeDinamicGate(false);
    }

    return (
        <ul className={`${classname}`}>
            {itemsList?.map((item, index) => (
                <li key={index} className={`${liClassName}`} onClick={() => clickedItemLi(item.item)}>
                    <Icon icon={item.icon} classname={`${iconClassName}`}/>
                    <Text classname={`${textClassName}`}>{String(item.item)}</Text>
                </li>
            ))}
        </ul>
    );
}

export default UlDinamic;